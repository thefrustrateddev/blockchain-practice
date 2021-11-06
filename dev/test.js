const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const chain1 =
{
    "chain": [
    {
    "index": 1,
    "timestamp": 1636204226839,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1636204238660,
    "transactions": [
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "993cbcb185b04300965fedd248ed0e5d"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "cc4081c04b79422da6422fa4eb4cbe30"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "a5f2bc36e9934166946235ba0d99fe65"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "d2286c612dcb4be4a06e79eb3ae08773"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "86767fc5256c4dd5865c84ead4c827e8"
    }
    ],
    "nonce": 17528,
    "hash": "0000e0557a30892b61b3c72dd4ee50b6b43491eb12d27276f6613306f3bc079d",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1636204239407,
    "transactions": [
    {
    "amount": 12,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "17596018815b4cfa9afe33dd9de376d2"
    }
    ],
    "nonce": 23620,
    "hash": "0000b1ec1864f0a993106a7925c79f799fddf000645ed8a301b5ed1a312a3369",
    "previousBlockHash": "0000e0557a30892b61b3c72dd4ee50b6b43491eb12d27276f6613306f3bc079d"
    },
    {
    "index": 4,
    "timestamp": 1636204240077,
    "transactions": [
    {
    "amount": 12,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "9e228ccf9747462293d3deaedc424aae"
    }
    ],
    "nonce": 18024,
    "hash": "00001a1cca58af5ea2aed9af957506a181bd6e37094f5ce060e9ff0e77496674",
    "previousBlockHash": "0000b1ec1864f0a993106a7925c79f799fddf000645ed8a301b5ed1a312a3369"
    },
    {
    "index": 5,
    "timestamp": 1636204245059,
    "transactions": [
    {
    "amount": 12,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "71dc7a0876994960b27de74f2a3e8059"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "3139c0f226f2495d81d39962683d33c3"
    },
    {
    "amount": 100,
    "sender": "AAAHHHHJKJJHJKK",
    "recipient": "123DSDAFAFASFSDFSD",
    "transactionId": "9c5624147132408a83a575433d89ab0f"
    }
    ],
    "nonce": 131640,
    "hash": "000060baddbb0b42b54f74eb69df2f09005f3e738dd503e3594312ac7678a046",
    "previousBlockHash": "00001a1cca58af5ea2aed9af957506a181bd6e37094f5ce060e9ff0e77496674"
    },
    {
    "index": 6,
    "timestamp": 1636204246228,
    "transactions": [
    {
    "amount": 12,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "9dbcb8df5cc6430f8f2d42942b40f7fa"
    }
    ],
    "nonce": 65714,
    "hash": "0000a2e1415a84e90b6bb631565d5703ed663fa63e1863f91be22052aacc1571",
    "previousBlockHash": "000060baddbb0b42b54f74eb69df2f09005f3e738dd503e3594312ac7678a046"
    },
    {
    "index": 7,
    "timestamp": 1636204248195,
    "transactions": [
    {
    "amount": 12,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "c7c97712f51d4672adc164891d752f8e"
    }
    ],
    "nonce": 158401,
    "hash": "0000f93ca0c2cfdea2d6ad22e355ebddd0892374ae76ac03c8f46b3af1f651cc",
    "previousBlockHash": "0000a2e1415a84e90b6bb631565d5703ed663fa63e1863f91be22052aacc1571"
    }
    ],
    "currentNodeURL": "http://localhost:3001",
    "networkNodes": [],
    "pendingTransactions": [
    {
    "amount": 121,
    "sender": "00",
    "recipient": "d375fa61385a48d68ad6eda46d7f40b0",
    "transactionId": "f4a57c3a0740419080311cd244a69bfd"
    }
    ]
    }
// console.log(bitcoin.proofOfWork('0',{index:1,transactions:[
//     {
//     "amount": 100,
//     "sender": "AAAHHHHJKJJHJKK",
//     "recipient": "123DSDAFAFASFSDFSD",
//     "transactionId": "d49b7157adb045abac232d674bd00571"
//     }
//     ]},81821))
// console.log(bitcoin.hashBlock('0',{
    
//     transactions:[
//         {
//         "amount": 100,
//         "sender": "AAAHHHHJKJJHJKK",
//         "recipient": "123DSDAFAFASFSDFSD",
//         "transactionId": "45c4ecc488f54b92b850823db712efae"
//         }
//         ],index:2,
// },115637))
console.log(bitcoin.chainIsValid(chain1.chain))