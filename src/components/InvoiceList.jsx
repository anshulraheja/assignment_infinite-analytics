import React, { useState } from 'react';
import Modal from './Modal';
import InvoiceDetails from './InvoiceForm';
import { v4 as uuidv4 } from 'uuid';
import mockInvoices from '../../data/mock-data';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewInvoice = (invoice) => {};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveInvoice = (newInvoice) => {
    setInvoices([...invoices, { ...newInvoice, id: uuidv4() }]);
    handleCloseModal();
  };

  const handleDeleteInvoice = (invoiceId) => {
    const updatedInvoices = invoices.filter(
      (invoice) => invoice.id !== invoiceId
    );
    setInvoices(updatedInvoices);
  };

  const handleNewInvoice = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <h2>Invoice List</h2>
      <button onClick={handleNewInvoice}>New Invoice</button>

      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <p>
                <strong>Invoice Date:</strong> {invoice.invoiceDate}
              </p>
              <p>
                <strong>Bill To:</strong> {invoice.billTo}
              </p>
              <p>
                <strong>Payment Due Date:</strong>{' '}
                {invoice.paymentDueDate}
              </p>
              <p>
                <strong>Sent To:</strong> {invoice.sentTo}
              </p>
              <p>
                <strong>Status:</strong> {invoice.status}
              </p>
              <button onClick={() => handleViewInvoice(invoice)}>
                View
              </button>
              <button onClick={() => handleDeleteInvoice(invoice.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <Modal>
          <InvoiceDetails
            onSave={handleSaveInvoice}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;
