import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams(); // URL theke product ID dynamic fetch korbe
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Product Deep Overview 📦</h2>
      <p>Showing configuration blueprints for Item ID: {id}</p>
    </div>
  );
}
