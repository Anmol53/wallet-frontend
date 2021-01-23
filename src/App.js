import "./App.css";
import React, { useState } from "react";
import AllWallets from "./Components/AllWallets";
import NewWallet from "./Components/NewWallet";
import CheckBalance from "./Components/CheckBalance";
import AddFunds from "./Components/AddFunds";
import SpendFunds from "./Components/SpendFunds";
import UserTransactions from "./Components/UserTransactions";
import AllTransactions from "./Components/AllTransactions";

function App() {
  const [curr, setCurr] = useState(0);

  const changeComponent = (v) => {
    setCurr(v);
  };

  const myRoute = () => {
    switch (curr) {
      case 0:
        return <AllWallets />;
      case 1:
        return <NewWallet changeComponent={changeComponent} />;
      case 2:
        return <CheckBalance />;
      case 3:
        return <AddFunds />;
      case 4:
        return <SpendFunds />;
      case 5:
        return <UserTransactions />;
      case 6:
        return <AllTransactions />;
      default:
        return <span></span>;
    }
  };

  return (
    <div className="App">
      <h1 className="header">Personal Wallet UI</h1>
      <div className="nav">
        <button
          className={`${curr === 0 && "active-btn"}`}
          onClick={(e) => setCurr(0)}
        >
          All Wallets
        </button>
        <button
          className={`${curr === 1 && "active-btn"}`}
          onClick={(e) => setCurr(1)}
        >
          New Wallet
        </button>
        <button
          className={`${curr === 2 && "active-btn"}`}
          onClick={(e) => setCurr(2)}
        >
          Check Balance
        </button>
        <button
          className={`${curr === 3 && "active-btn"}`}
          onClick={(e) => setCurr(3)}
        >
          Add Funds
        </button>
        <button
          className={`${curr === 4 && "active-btn"}`}
          onClick={(e) => setCurr(4)}
        >
          Spend Funds
        </button>
        <button
          className={`${curr === 5 && "active-btn"}`}
          onClick={(e) => setCurr(5)}
        >
          User Transactions
        </button>
        <button
          className={`${curr === 6 && "active-btn"}`}
          onClick={(e) => setCurr(6)}
        >
          All Transactions
        </button>
      </div>
      <div className="main-container">{myRoute()}</div>
    </div>
  );
}

export default App;
