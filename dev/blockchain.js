const sha256 = require('sha256');
// const uuid = require('uuid/v1');
const currentNodeURL = process.argv[4];

class Blockchain{
    constructor(){
        this.chain = [];
        this.currentNodeURL =currentNodeURL;
        this.networkNodes=[];
        // in future other will know what urls are network nodes
        this.pendingTransactions = [];
        this.createNewBlock(100, '0', '0');
    }
    createNewBlock(nonce, previousBlockHash, hash){
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce: nonce,
            hash: hash,
            previousBlockHash: previousBlockHash
        };
    
        this.pendingTransactions = [];
        this.chain.push(newBlock);
    
        return newBlock;
    }
    getLastBlock(){
        return this.chain[this.chain.length-1];
    }
    createNewTransaction(amount,sender,recipient){ // sender and reciepient will be addresses too
        const newTransaction ={
            amount,sender,recipient
        }
        this.pendingTransactions.push(newTransaction);

        return this.getLastBlock()['index']+1 // number of block this transaction will be added to
    }
    hashBlock(previousBlockHash, currentBlockData, nonce){
        // currentBlockData is same as pendingTranscation
        //will take a block data and in return we will get a fixed length string
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash =sha256(dataAsString);
        return hash;
    }
    proofOfWork(previousBlockHash,currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
        while(hash.substring(0,4)!='0000'){
            nonce++
            hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
        }
        return nonce;

        // returns the correct nonce to use hashBlock to create New block
        // our nonce is our proof
        
    }
    /////********* */
    addNetworkNode(newNodeUrl){
        this.networkNodes.push(newNodeUrl);
        return this.networkNodes;
    }

    addBulkNetworkNodes(networkNodes){
        this.networkNodes = networkNodes;
        return this.networkNodes;
    }
}

module.exports=Blockchain;