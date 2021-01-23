import React, { useState, useEffect } from "react";

const UserTransactions = () => {
  const [wallets, setWallets] = useState([]);
  const [userId, setUserID] = useState(undefined);
  const [transactions, setTransactions] = useState([]);
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

  useEffect(() => {
    if (userId) {
      fetch(`${serverURL}transactions/${userId}`)
        .then((response) => response.json())
        .then((res) => {
          const sortedArr = res.transactions.sort((a, b) => {
            const aDate = new Date(a.transaction_Time).valueOf();
            const bDate = new Date(b.transaction_Time).valueOf();
            return aDate - bDate;
          });
          setTransactions(sortedArr);
        });
    }
  }, [userId]);
  return (
    <div className="form">
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
        }}
      >
        Submit
      </button>
      <table>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Balance (Rs)</th>
        </tr>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction._id}>
              <td>{transaction.user_name}</td>
              <td>
                {new Date(transaction.transaction_Time).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </td>
              <td>{transaction.amount}</td>
              <td>{transaction.final_balance}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserTransactions;
