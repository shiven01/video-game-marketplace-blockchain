import {
    getAddressBalance,
    getTransactions,
    getItemPrice,
    writeTransactions
  } from './blockchain-helpers.js';
  
  import EC from 'elliptic';
  const ec = new EC.ec('p192');
  
  const buyerPrivateKey = process.argv[2];
  const itemBought = process.argv[3];
  
  const keyPair = ec.keyFromPrivate(buyerPrivateKey);
  const buyerAddress = keyPair.getPublic('hex');
  
  const balance = getAddressBalance(buyerAddress);
  const price = getItemPrice(itemBought);
  
  if (balance >= price) {
    const message = buyerAddress + price + itemBought;
    const signature = keyPair.sign(message).toDER('hex');
  
    const newTransaction = {
      buyerAddress,
      sellerAddress: null,
      price,
      itemBought,
      signature
    }
  
    const transactions = getTransactions();
    transactions.push(newTransaction);
    writeTransactions(transactions);
  }