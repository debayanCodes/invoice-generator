import React, { useState, useEffect } from 'react';
import './App.css';
import PdfTemplate from './PDF/Template';

function App() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [createView, setCreateView] = useState(true);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  const handleCreate = () => {
    if (invoiceNumber && customerName) {
      setCreateView(false);
    } else {
      alert('Please fill all fields correctly!');
    }
  };

  return (
    <div className="container">
      {createView ? (
        <div className="form-container">
          <h2>Create Invoice</h2>
          <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <button onClick={handleCreate}>Create ➡️</button>
        </div>
      ) : (
        <PdfTemplate
          InvoiceNumber={invoiceNumber}
          date={date}
          customerName={customerName}
        />
      )}
    </div>
  );
}

export default App;