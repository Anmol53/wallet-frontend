import React, { useState, useEffect } from "react";

const SpendFund = () => {
  const [userId, setUserID] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [wallets, setWallets] = useState([]);
  const serverURL = "http://localhost:9999/";

  useEffect(() => {
    fetch(`${serverURL}wallets`)
      .then((response) => response.json())
      .then((res) => {
        const sortedArr = res.wallets.sort((a, b) => {
          return a.user_id - b.user_id;
        });
        setWallets(sortedArr);
      });
  }, []);

  const spendAmount = () => {
    setUserID(document.getElementById("name-inp").value);
    if (userId) {
      fetch(`${serverURL}spendFunds`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, amount }),
      })
        .then((response) => response.json())
        .then((result) => {
          setMessage(result.message);
        });
    }
  };

  return (
    <div>
      <label>Name : </label>
      <input
        type="text"
        list="name"
        id="name-inp"
        onBlur={() => setUserID(document.getElementById("name-inp").value)}
      />
      <datalist id="name">
        {wallets.map((wallet) => {
          return (
            <option key={wallet._id} value={wallet.user_id}>
              {wallet.user_name}
            </option>
          );
        })}
      </datalist>
      <br />
      <label>Amount : </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button
        type="button"
        onClick={() => {
          spendAmount();
        }}
      >
        Submit
      </button>
      <br />
      <span>{message}</span>
    </div>
  );
};

export default SpendFund;
