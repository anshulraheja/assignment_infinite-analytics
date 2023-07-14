const mockInvoices = [
  {
    id: 1,
    invoiceDate: '2023-07-12',
    billTo: 'John Doe',
    paymentDueDate: '2023-07-26',
    status: 'pending',
    lineItems: [
      {
        ratePerHour: 50,
        expenses: 100,
      },
      {
        ratePerHour: 60,
        expenses: 150,
      },
    ],
    sentTo: 'john.doe@example.com',
  },
  {
    id: 2,
    invoiceDate: '2023-07-10',
    billTo: 'Jane Smith',
    paymentDueDate: '2023-07-24',
    status: 'paid',
    lineItems: [
      {
        ratePerHour: 75,
        expenses: 200,
      },
    ],
    sentTo: 'jane.smith@example.com',
  },
];

export default mockInvoices;
