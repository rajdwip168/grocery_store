import React from 'react';

export default function Cart() {
  return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Shopping Cart 🛒</h2>
      <p style={{ color: '#666', marginTop: '15px' }}>
        Your cart is empty. Start adding groceries from the home page!
      </p>
    </div>
  );
}