import React, { useState, useEffect } from "react";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const serverURL = "http://localhost:9999/transactions/";

  useEffect(() => {
    fetch(serverURL)
      .then((response) => response.json())
      .then((res) => {
        const sortedArr = res.transactions.sort((a, b) => {
          const aDate = new Date(a.transaction_Time).valueOf();
          const bDate = new Date(b.transaction_Time).valueOf();
          return aDate - bDate;
        });
        setTransactions(sortedArr);
      });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Balance (Rs)</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
