import React, { useState, useEffect } from "react";

const CheckBalance = () => {
  const [userId, setUserID] = useState(undefined);
  const [balance, setBalance] = useState(0);
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

  const checkBalance = () => {
    if (userId) {
      fetch(`${serverURL}balance/${userId}`)
        .then((response) => response.json())
        .then((res) => {
          setBalance(res.balance);
        });
    }
  };
  return (
    <div>
      <label>Name : </label>
      <input type="text" list="name" id="name-inp" />
      <datalist id="name">
        {wallets.map((wallet) => {
          return (
            <option key={wallet._id} value={wallet.user_id}>
              {wallet.user_name}
            </option>
          );
        })}
      </datalist>
      <button
        type="button"
        onClick={() => {
          setUserID(document.getElementById("name-inp").value);
          checkBalance();
        }}
      >
        Submit
      </button>
      <br />
      <label>Balance : </label>
      <span>{balance}</span>
    </div>
  );
};

export default CheckBalance;
