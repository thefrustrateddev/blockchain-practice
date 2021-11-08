const express = require('express');
const Blockchain = require('./blockchain');
const {v4 : uuidv4} = require('uuid');
const axios = require('axios').default;

const currentNodeAddress = uuidv4().split('-').join('')
const bitcoin = new Blockchain();

const port = process.argv[3];

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/blockchain',(req,res)=>{
    res.send(bitcoin);
});

app.post('/transaction',(req,res)=>{
    const blockIndex = bitcoin.addNewTransaction(req.body.transactionObj);
    res.send(`Transaction will be added in block ${blockIndex}`);
});

app.post('/transaction/broadcast',async (req,res)=>{
    const transactionObj = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    const blockIndex = bitcoin.addNewTransaction(transactionObj);
    let requestArray = []
    for(let node in bitcoin.networkNodes){
        requestArray.push(axios.post(`${bitcoin.networkNodes[node]}/transaction`,{
            transactionObj
        }))
    }
    const response = await axios.all(requestArray);
    res.send(`Transaction will be added in block ${blockIndex}`);
});

app.get('/mine',async (req,res)=>{
    // nonce, previousBlockHash, hash
    const previousBlockHash = bitcoin.getLastBlock().hash;
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: bitcoin.getLastBlock().index+1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const hash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

    let newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);

    let requestArray = []
    // let requestTransactionArray = []
    for(let node in bitcoin.networkNodes){
        requestArray.push(axios.post(`${bitcoin.networkNodes[node]}/block/recieve`,{
            newBlock
        }))
        // requestTransactionArray.push(axios.post(`${bitcoin.networkNodes[node]}/transaction`,{
        //     amount:12,
        //     sender:"00",
        //     recipient:currentNodeAddress
        // }))
    }
    const response = await axios.all(requestArray);
    const transactionRes = await axios.post(`${bitcoin.currentNodeURL}/transaction/broadcast`,{
        amount:12,
        sender:"00",
        recipient:currentNodeAddress
    })
    res.json({
        note: `Block is mined successfully`,
        block: newBlock
    })
});
app.post('/block/recieve',(req,res)=>{
    // need to add checks if its correct
    // hashcheck and imndexCheck
    const blockObj = req.body.newBlock;
    if(bitcoin.getLastBlock().hash == blockObj.previousBlockHash && bitcoin.getLastBlock().index+1 == blockObj.index){
        const newBlock = bitcoin.addNewBlock(blockObj)
        return res.json({
            note: `Block is mined successfully`,
            block: newBlock
        })
    }
    res.json({
        note: `couldnt add block`,
    })
    
})

app.post('/register-broadcast-node',async (req,res)=>{
    // registers a node and broadcats it to entire network
    // use by the node registering as it tells other nodes too that anew node has been registered and hence broadcast
    const newNodeUrl = req.body.newNodeUrl;
    const networkNodes = JSON.parse(JSON.stringify(bitcoin.networkNodes));// to avoid change when addNode function is called
    if(networkNodes.indexOf(newNodeUrl)<0 && bitcoin.currentNodeURL !== newNodeUrl){
        if(networkNodes.length>0){
            axiosList = []
            for(let nodeURL in networkNodes){
                axiosList.push(axios.post(
                    `${networkNodes[nodeURL]}/register-node`,
                    {
                        newNodeUrl
                    }
                ))
            }
            const response = axios.all(axiosList).catch((err)=>{
                res.send('Adding node failed');
            });
        }
        const networkNodeUrl = bitcoin.addNetworkNode(newNodeUrl);

        await axios({
            method: 'post',
            url: `${newNodeUrl}/register-bulk-nodes`,
            data:{
                networkNodes: [bitcoin.currentNodeURL,...networkNodes]
            }
        });
        return res.json({
            note: "networkNode has been added",
            networkNodeUrl
        })
    }
    else{
        res.json({
            note: 'node is already present'
        })
    }

});

app.post('/register-node',(req,res)=>{
    //registers node
    // for other nodes to register the nodes in themselves
    // stops infinite loop
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl)<0){
        const networkNodeUrl = bitcoin.addNetworkNode(newNodeUrl);
        return res.json({
            note: "networkNode has been added",
            networkNodeUrl
        })  
    }
    res.json({
        note: "networkNode already present",
    })  
      
})

app.post('/register-bulk-nodes',(req,res)=>{
    const networkNodes = req.body.networkNodes;
    bitcoin.addBulkNetworkNodes(networkNodes);
    res.json({
        note: "networkNodes has been added",
        networkNodes
    })
});

app.get('/consensus',async(req,res)=>{
    const networkNodes = bitcoin.networkNodes;
    let requestArray = [];
    for(nodes in networkNodes){
        requestArray.push(axios.get(`${networkNodes[nodes]}/blockchain`));
    }
    const blockchains = await axios.all(requestArray);
    let consentedBlockChain;
    let validBlockChains=[];
    // self check
    if(bitcoin.chainIsValid(bitcoin.chain))validBlockChains.push(bitcoin);

    blockchains.forEach((blockchain)=>{
        // check valid then check longest
        if(bitcoin.chainIsValid(blockchain.data.chain)) validBlockChains.push(blockchain.data);
    });
    sortedBlockchains = validBlockChains.sort((a,b)=>b.chain.length-a.chain.length);

    consentedBlockChain = sortedBlockchains[0];
    if(consentedBlockChain.currentNodeURL === bitcoin.currentNodeURL){
        return res.json({
            note:'current blockchian has not been replaced',
            chain: bitcoin.chain
        })
    }

    bitcoin.chain= consentedBlockChain.chain;
    bitcoin.pendingTransactions= consentedBlockChain.pendingTransactions;

    return res.json({
        note:'current blockchian has been replaced',
        chain: bitcoin.chain
    })
    
});

app.get('/block/:blockHash',(req,res)=>{
    const blockHash = req.params.blockHash;
    const block = bitcoin.getBlock(blockHash);
    console.log({block})
    res.json({
        note: block?'The block has been retrieved.':'The block doesnt exist.',
        block
    })
})

app.get('/transaction/:transactionId',(req,res)=>{
    const transactionId = req.params.transactionId;
    const transaction = bitcoin.getTransaction(transactionId);
    console.log({transaction})
    res.json({
        note: transaction?'The transaction has been retrieved.':'The transaction doesnt exist.',
        transaction
    })
})

app.get('/address/:addressId',(req,res)=>{
    const addressId = req.params.addressId;
    const addressData = bitcoin.getAddress(addressId);
    res.json({
        addressData
    })
})

app.get('/block-explorer', function(req, res) {
	res.sendFile('./block-explorer/index.html', { root: __dirname });
});

app.get('/architecture', function(req, res) {
	res.sendFile('../design/index.html', { root: __dirname });
});

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})