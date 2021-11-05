const express = require('express');
const Blockchain = require('./blockchain');
const {v4 : uuidv4} = require('uuid');
const axios = require('axios').default;

const currentNodeAddress = uuidv4().split('-').join('')
const bitcoin = new Blockchain();

const port = process.argv[3];

console.log('port',port)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/blockchain',(req,res)=>{

    res.send(bitcoin);
});

app.post('/transaction',(req,res)=>{
    blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.send(`Transaction will be added in block ${blockIndex}`);
});

app.get('/mine',(req,res)=>{
    // nonce, previousBlockHash, hash
    const previousBlockHash = bitcoin.getLastBlock().hash;
    const currentBlockData = {
        transaction: bitcoin.pendingTransactions,
        index: bitcoin.getLastBlock().index+1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const hash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

    bitcoin.createNewTransaction(12,'00',currentNodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);
    
    res.json({
        note: `Block is mined successfully`,
        block: newBlock
    })
});

app.post('/register-broadcast-node',async (req,res)=>{
    // registers a node and broadcats it to entire network
    // use by the node registering as it tells other nodes too that anew node has been registered and hence broadcast
    const newNodeUrl = req.body.newNodeUrl;
    const networkNodes = JSON.parse(JSON.stringify(bitcoin.networkNodes));// to avoid change when addNode function is called
    if(networkNodes.indexOf(newNodeUrl)<0 && bitcoin.currentNodeURL !== newNodeUrl){
        if(networkNodes.length>0){
            axiosList = []
            for(let nodeURL in networkNodes){
                console.log('asdasdasdasd',`${networkNodes[nodeURL]}/register-node`)
                axiosList.push(axios.post(
                    `${networkNodes[nodeURL]}/register-node`,
                    {
                        newNodeUrl
                    }
                ))
            }
            const res = axios.all(axiosList);
        }
        const networkNodeUrl = bitcoin.addNetworkNode(newNodeUrl);

        await axios({
            method: 'post',
            url: `${newNodeUrl}/register-bulk-nodes`,
            data:{
                networkNodes: [bitcoin.currentNodeURL,...networkNodes]
            }
        });
        res.json({
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
        res.json({
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
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})