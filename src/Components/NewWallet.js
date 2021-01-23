import React, { useState, useEffect } from "react";

const NewWallet = (props) => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const serverURL = "http://localhost:9999/";

  useEffect(() => {
    fetch(`${serverURL}wallets`)
      .then((response) => response.json())
      .then((res) => {
        setUserId(`usr${res.wallets.length + 1}`);
      });
  }, [message]);

  const addWallet = () => {
    fetch(`${serverURL}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        user_name: name,
        phone,
        balance: amount,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setMessage(res.message);
      });
  };

  return (
    <div>
      <label>Name : </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Phone : </label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
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
          addWallet();
        }}
      >
        Add Wallet
      </button>
      <br />
      <span>{message}</span>
    </div>
  );
};

export default NewWallet;
