const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

previousBlockHash = "00001ADHHJKHSDHJKL";

currentBlockData = [
    {
        amount: 100,
        sender: "heyM",
        reciepient: "hey2"
    },
    {
        amount: 20,
        sender: "heyM1",
        reciepient: "hey223"
    },
    {
        amount: 30,
        sender: "heyM444",
        reciepient: "hey2422"
    }
];

console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,bitcoin.proofOfWork(previousBlockHash,currentBlockData)))

