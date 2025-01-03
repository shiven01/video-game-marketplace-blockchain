import {
    getTransactions,
    writeTransactions,
    getWallets,
    writeWallets
  } from './blockchain-helpers.js';
  
  import EC from 'elliptic';
  
  const ec = new EC.ec('p192');
  const keyPair = ec.genKeyPair();
  const publicKey = keyPair.getPublic('hex');
  const privateKey = keyPair.getPrivate('hex');
  const price = 40;
  
  const newWalletName = process.argv[2];
  let wallets;
  
  try {
    wallets = getWallets();
  } catch (error) {
    wallets = {};
  }
  
  let transactions;
  try {
    transactions = getTransactions();
  } catch (error) {
    transactions = [];
  }
  
  if(!wallets.hasOwnProperty(newWalletName)) {
    wallets[newWalletName] = {
      publicKey: publicKey,
      privateKey: privateKey
    };
    writeWallets(wallets);
  
    const newWalletTransaction = {
      buyerAddress: null,
      sellerAddress: publicKey,
      price: price
    }
    transactions.push(newWalletTransaction);
    writeTransactions(transactions);
  }