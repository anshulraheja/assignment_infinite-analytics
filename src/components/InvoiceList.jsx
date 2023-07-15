import React, { useState } from 'react';
import Modal from './Modal';
import InvoiceForm from './InvoiceForm';
import { v4 as uuidv4 } from 'uuid';
import mockInvoices from '../../data/mock-data';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const handleViewInvoice = (invoice) => {
    setIsModalOpen(true);
    setSelectedInvoice(invoice);
  };

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
    setSelectedInvoice(null);
  };
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredInvoice = invoices.filter(
    (invoice) =>
      filterStatus === '' || invoice.status === filterStatus
  );
  return (
    <div>
      <h2>Invoice List</h2>
      <button onClick={handleNewInvoice}>New Invoice</button>

      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <div>
          <div>
            <label htmlFor="filter">Filter by status:</label>
            <select
              name="filter"
              id="filter"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="outstanding">Outstanding</option>
              <option value="late">Late</option>
            </select>
          </div>
          <ul>
            {filteredInvoice.map((invoice) => (
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
                <button
                  onClick={() => handleDeleteInvoice(invoice.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p>Total invoices: {filteredInvoice.length}</p>

      {isModalOpen && (
        <Modal>
          <InvoiceForm
            onSave={handleSaveInvoice}
            onCancel={handleCloseModal}
            selectedInvoice={selectedInvoice}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;
