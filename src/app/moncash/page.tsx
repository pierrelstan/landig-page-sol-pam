"use client";

import { useState } from "react";

export default function CreatePayment() {
  const [loading, setLoading] = useState(false);
  const [paymentURI, setPaymentURI] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePayment = async () => {
    setLoading(true);
    setPaymentURI(null); // Clear previous response
    setError(null); // Clear previous error
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create payment.");
      }

      const data = await res.json();
      if (data.paymentURI) {
        setPaymentURI(data.paymentURI);
      } else {
        setError("Payment creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while creating the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Create Payment</h1>
      <button
        onClick={handleCreatePayment}
        disabled={loading}
        style={{
          padding: "1rem 2rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Create Payment"}
      </button>
      {paymentURI && (
        <p style={{ marginTop: "1rem", color: "green" }}>
          Payment successful! Click the link below to complete the payment:{" "}
          <br />
          <a
            href={paymentURI}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0070f3",
              textDecoration: "underline",
            }}
          >
            Complete Payment
          </a>
        </p>
      )}
      {error && <p style={{ marginTop: "1rem", color: "red" }}>{error}</p>}
    </div>
  );
}
