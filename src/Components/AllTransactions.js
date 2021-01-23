import React, { useState, useEffect } from "react";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const serverURL = "http://localhost:9999/transactions/";

  useEffect(() => {
    fetch(serverURL)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        // const sortedArr = res.wallets.sort((a, b) => {
        //   return a.user_id - b.user_id;
        // });
        // setTransactions(sortedArr);
      });
  }, []);
  return (
    <div>
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
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.balance}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AllTransactions;
