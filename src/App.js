import './App.css';
import logo from './logo.svg'
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from 'react';
import Web3 from 'web3';


import Web3Modal from 'web3modal'


function App() {
  const [connect, setConnect] = useState(false)
  const [acc, setAcc] = useState(null)
  const [signature, setSignature] = useState(null)
  const [chain, setChain] = useState(null)

  let provider = new WalletConnectProvider({
    rpc: {
      1: 'https://mainnet.infura.io/v3/',
      56: 'https://bsc-dataseed.binance.org/',
      97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    // bridge: ''
  })

  const connectWallet = async () => {
    await provider.enable()
    // provider = window.ethereum;
    // Create Web3 instance
    const web3 = new Web3(provider)
    window.w3 = web3

    let accounts = await web3.eth.getAccounts(); // get all connected accounts
    setAcc(accounts[0])
    console.log(accounts[0])
  }

  const disconnect = async () => {
    // Close provider session
    await provider.disconnect()
    setAcc(null)
    setSignature(null)
  }

  const sign = async (msg) => {
    if (window.w3) {
      setSignature(await window.w3.eth.personal.sign(msg, acc))
    } else {
      return false
    }
  }

  const sendFoo = async () => {
    await window.w3.sendTransaction({
      from: acc,
      to: acc,
      value: '1000000'
    })
  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>v1.0.1</h1>
      </header>
      <div className='page'>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <button onClick={connectWallet}>{!acc ? "Connect" : "Connected"}</button>
          {acc && <><button onClick={() => sign('test sign test')}>send sign</button> <button onClick={() => sendFoo}>send Trans Foo</button> <button onClick={disconnect}> disconnect </button>  </>}
        </div>

        <p>{acc ? 'address: ' + acc.substring(0, 3) + "..." + acc.substring(acc.length - 3) : ""}</p>
        <p>{signature ? 'signature: ' + signature.substring(0, 3) + '...' + signature.substring(signature.length - 3) : ""}</p>
        <p>{chain ? chain : ""}</p>

      </div>
    </div>
  );
}

export default App;
