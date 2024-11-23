// app/transfert/page.tsx

"use client";

import { useState } from "react";

export default function TransferPage() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [desc, setDesc] = useState("");
  const [transaction_id, setTransaction] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/moncash-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver,
          amount,
          desc,
          transaction_id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Transfer successful");
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg  flex-1 justify-center align-middle">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Transfer Money
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="receiver"
            className="block text-sm font-medium text-gray-700"
          >
            Receiver Account Number:
          </label>
          <input
            type="number"
            id="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Transaction Id:
          </label>
          <input
            type="number"
            id="transaction"
            value={transaction_id}
            onChange={(e) => setTransaction(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
}
