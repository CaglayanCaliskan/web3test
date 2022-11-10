import './App.css';
import logo from './logo.svg'
import { useState } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

function App() {
  // const [isConnected, SetIsConnected] = useState(false)
  // const [address, setAddress] = useState("")

  const providerOptions = {
    /* See Provider Options Section */

    //https://github.com/WalletConnect/web3modal/blob/V1/docs/providers/binancechainwallet.md
    binancechainwallet: {
      package: true
    },
    //https://github.com/WalletConnect/web3modal/blob/V1/docs/providers/walletconnect.md
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "2a3b76921352d314e321aa9f1a41d9a2"
      }
    },
  };

  const web3Modal = new Web3Modal({
    network: "rinkeby", // optional
    cacheProvider: true, // optional
    providerOptions: providerOptions, // required
    theme: 'dark' // optional
  });

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    await window.ethereum.send('eth_requestAccounts');
    let accounts = await web3.eth.getAccounts();
    console.log(accounts[0])
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>Connect</button>
      </header>
    </div>
  );
}

export default App;
