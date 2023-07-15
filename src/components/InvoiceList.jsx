import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import InvoiceForm from './InvoiceForm';
import { v4 as uuidv4 } from 'uuid';
import {
  addInvoice,
  deleteInvoice,
  setFilterStatus,
} from '../redux/invoice/invoiceSlice';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const InvoiceList = () => {
  const invoices = useSelector((state) => state.invoices.invoices);
  const filterStatus = useSelector(
    (state) => state.invoices.filterStatus
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleViewInvoice = (invoice) => {
    setIsModalOpen(true);
    setSelectedInvoice(invoice);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveInvoice = (newInvoice) => {
    dispatch(addInvoice({ ...newInvoice, id: uuidv4() }));
    handleCloseModal();
  };

  const handleDeleteInvoice = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleNewInvoice = () => {
    setIsModalOpen(true);
    setSelectedInvoice(null);
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterStatus(e.target.value));
  };

  const filteredInvoice = invoices.filter(
    (invoice) =>
      filterStatus === '' || invoice.status === filterStatus
  );

  return (
    <div className="invoice-list-wrapper">
      <div className="header-wrapper">
        <div>
          <h2 className="header">Invoices</h2>
          <span className="invoice-count">
            Total invoices: {filteredInvoice.length}
          </span>
        </div>
        <div className="right-header">
          <div className="filter-wrapper">
            <label htmlFor="filter">Filter by status:</label>
            <select
              name="filter"
              id="filter"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="late">Late</option>
            </select>
          </div>
          <button
            onClick={handleNewInvoice}
            className="btn-new-invoice"
          >
            New Invoice
          </button>
        </div>
      </div>
      <div className="invoice-list">
        {invoices.length === 0 ? (
          <div>No invoices found.</div>
        ) : (
          <div>
            <ul className="all-list">
              {filteredInvoice.map((invoice) => (
                <li key={invoice.id} className="each-invoice">
                  <p className="detail">
                    <strong>Invoice Date</strong>
                    <span>{invoice.invoiceDate}</span>
                  </p>
                  <p className="detail detail-name">
                    <strong>Bill To</strong>
                    <span>{invoice.billTo}</span>
                  </p>
                  <p className="detail">
                    <strong>Due Date</strong>
                    <span>{invoice.paymentDueDate}</span>
                  </p>
                  <p className="detail">
                    <strong>Sent To</strong>
                    <span className="restrict">{invoice.sentTo}</span>
                  </p>
                  <p className="detail">
                    <strong>Status</strong>
                    <span className="status">{invoice.status}</span>
                  </p>
                  <AiFillEdit
                    className="icon"
                    onClick={() => handleViewInvoice(invoice)}
                  />
                  <AiFillDelete
                    className="icon"
                    onClick={() => handleDeleteInvoice(invoice.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
