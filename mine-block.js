import {
    getBlockchain,
    getTransactions,
    writeBlockchain,
    writeTransactions
  } from './blockchain-helpers.js';
  
  import sha256 from 'crypto-js/sha256.js';
  
  const blockchain = getBlockchain();
  const previousBlock = blockchain[blockchain.length - 1];
  const transactions = getTransactions();
  
  let nonce = 0;
  let hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
  const difficulty = 2;
  
  while (!hash.startsWith('0'.repeat(difficulty))) {
    nonce++;
    hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
  }
  
  const newBlock = {
    hash,
    nonce,
    previousHash: previousBlock.hash,
    transactions
  }
  
  blockchain.push(newBlock);
  writeBlockchain(blockchain);
  writeTransactions([]);