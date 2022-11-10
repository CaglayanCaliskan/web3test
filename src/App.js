import './App.css';
import logo from './logo.svg'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useState } from 'react';

function App() {
  const [connect, setConnect] = useState(false)
  const [acc, setAcc] = useState(null)
  const [chain, setChain] = useState(null)

  const connectWallet = async () => {

    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAcc(accounts[0])
      setChain(chainId)
    });
    // Check if connection is already established
    console.log(connector)
    if (!connector.connected) {
      // create new session
      connector.createSession();
      setConnect(true)
    } else {
      connector.killSession()
      setConnect(false)
      setAcc(null)
      setChain(null)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>{!connect ? "Connect" : "Disconnect"}</button>
        <p>{acc ? acc : ""}</p>
        <p>{chain ? chain : ""}</p>

      </header>
    </div>
  );
}

export default App;
