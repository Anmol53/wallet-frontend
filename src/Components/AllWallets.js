import React, { useState, useEffect } from "react";

const AllWallets = () => {
  const [wallets, setWallets] = useState([]);
  const serverURL = "http://localhost:9999/wallets/";

  useEffect(() => {
    fetch(serverURL)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.wallets);
        const sortedArr = res.wallets.sort((a, b) => {
          return a.user_id - b.user_id;
        });
        setWallets(sortedArr);
      });
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>User Id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Balance (Rs)</th>
        </tr>
        {wallets.map((wallet) => {
          return (
            <tr key={wallet._id}>
              <td>{wallet.user_id}</td>
              <td>{wallet.user_name}</td>
              <td>{wallet.phone}</td>
              <td>{wallet.balance}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AllWallets;
