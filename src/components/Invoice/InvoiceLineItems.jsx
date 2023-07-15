import React from 'react';

const InvoiceLineItems = ({
  isEditMode,
  handleAddLineItem,
  formState,
  handleLineItemChange,
  handleDeleteLineItem,
}) => {
  return (
    <>
      <div className="line-item-wrapper">
        <h3 className="line-item-header">Line Items</h3>
        {isEditMode && (
          <div>
            <button
              className="btn-add-item"
              type="button"
              onClick={handleAddLineItem}
            >
              + Add item
            </button>
          </div>
        )}
      </div>
      <div className="item-wrapper">
        {formState.lineItems.map((item, index) => (
          <div key={index} className="line-item">
            <div>
              <input
                id={`ratePerHour${index}`}
                placeholder="Rate per Hour"
                type="text"
                name="ratePerHour"
                value={item.ratePerHour}
                onChange={(e) => handleLineItemChange(e, index)}
                disabled={!isEditMode}
              />
            </div>
            <div>
              <input
                id={`expenses${index}`}
                type="number"
                name="expenses"
                min="0"
                placeholder="Expenses"
                value={item.expenses}
                onChange={(e) => handleLineItemChange(e, index)}
                disabled={!isEditMode}
              />
            </div>
            {index > 0 && isEditMode && (
              <button
                className="btn-delete-item"
                type="button"
                onClick={() => handleDeleteLineItem(index)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceLineItems;
