import {
    getAddressItems,
    getItemPrice,
    getTransactions,
    writeTransactions
  } from './blockchain-helpers.js';
  
  import EC from 'elliptic';
  const ec = new EC.ec('p192');
  
  const sellerPrivateKey = process.argv[2];
  const itemSold = process.argv[3];
  
  const keyPair = ec.keyFromPrivate(sellerPrivateKey);
  const sellerAddress = keyPair.getPublic('hex');
  
  if (getAddressItems(sellerAddress)[itemSold] > 0) {
    const price = getItemPrice(itemSold) - 5;
    const message = `${sellerAddress}${price}${itemSold}`;
    const signature = keyPair.sign(message).toDER('hex');
  
    const newTransaction = {
      buyerAddress: null,
      sellerAddress,
      price,
      itemSold,
      signature
    }
  
    const transactions = getTransactions();
    transactions.push(newTransaction);
    writeTransactions(transactions);
  }