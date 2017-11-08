// import Wallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import BigNumber from 'bignumber.js';
import Exchange from 'contracts/Exchange.json';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let exchInstance = new web3.eth.Contract(Exchange.abi, '0x5fbdac24ed1da581ee09b30b5b3d2118bf75ebd9');
let privateKey = new Buffer('010D4423A7A24AE95DBC7F39DF1A2F8B046AAF444DEF560D6020516886D4D337', 'hex');
let amt = new BigNumber(web3.utils.toWei(69, 'ether'));
let gasLim = 250000;

function performTransaction(privateKey, rawTx) {
  let tx = new Tx(rawTx);
  tx.sign(privateKey);
  let serializedTx = tx.serialize();

  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(serializedTx.toString('hex'), (err, hash) => {
      if (!err) resolve(hash);
      else reject(err);
    });
  });
}

function getTransactionData(transferTx, address) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(address).then((res) => {
      transferTx['nonce'] = '0x' + res.toString(16);
      return web3.eth.getGasPrice();
    }).then((price, err) => {
      transferTx['gasPrice'] = '0x' + price.toString(16);
      resolve(transferTx);
    });
  });
}

export const launch = () => {
  // const inst = Wallet.generate();
  // const newAddress = web3.utils.bytesToHex(inst.getAddress());

  // let transferTx = {
  //   gasLimit: '0x' + gasLim.toString(16),
  //   value: '0x' + amt.toString(16),
  //   to: newAddress,
  // };
  const exchDeposit = exchInstance.methods.deposit().encodeABI();

  let rawTx = {
    gasLimit: '0x' + gasLim.toString(16),
    value: '0x' + amt.toString(16),
    to: exchInstance.options.address,
    data: exchDeposit,
  };

  getTransactionData(rawTx, '0x372aebaed0c89eacf3bd8f7aef66bb4e5a0edfd1').then((transferTx) => {
    console.log(transferTx);
    return performTransaction(privateKey, transferTx);
  }).then((hash) => {
    web3.eth.getBalance('0x5fbdac24ed1da581ee09b30b5b3d2118bf75ebd9').then((res) => {
      console.log('contractBalance:', web3.utils.fromWei(res, 'ether'));
      return exchInstance.getPastEvents('allEvents', {fromBlock: 0}).then((res) => {
        console.log(res);
      });
    });
  });
};
