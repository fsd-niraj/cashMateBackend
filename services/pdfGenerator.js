const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Mock function to fetch all transactions (replace with your actual function)
async function getAllTransactions() {
  // Mock transactions data for demonstration
  const transactions = [
    {
      totalAmount: 1000,
      totalItems: 2,
      itemList: [
        { productId: 'product1', quantity: 1, totalItemPrice: 500 },
        { productId: 'product2', quantity: 1, totalItemPrice: 500 }
      ]
    },
    {
      totalAmount: 1500,
      totalItems: 3,
      itemList: [
        { productId: 'product3', quantity: 2, totalItemPrice: 1000 },
        { productId: 'product4', quantity: 1, totalItemPrice: 500 }
      ]
    }
  ];

  return transactions;
}

async function generateTransactionsPDF() {
  try {
    // Fetch all transactions
    const transactions = await getAllTransactions();

    // Create a new PDF document
    const doc = new PDFDocument();
    const outputPath = path.join(__dirname, 'transactions.pdf'); // Output path

    // Pipe the PDF output to a file
    doc.pipe(fs.createWriteStream(outputPath));

    // Write transaction details to the PDF
    doc.fontSize(12);
    doc.text('List of Transactions', { align: 'center' });
    doc.moveDown();

    transactions.forEach((transaction, index) => {
      doc.text(`Transaction ${index + 1}:`);
      doc.text(`Total Amount: $${transaction.totalAmount}`);
      doc.text(`Total Items: ${transaction.totalItems}`);
      doc.text('--- Item List ---');
      transaction.itemList.forEach(item => {
        doc.text(`Product ID: ${item.productId}`);
        doc.text(`Quantity: ${item.quantity}`);
        doc.text(`Total Item Price: $${item.totalItemPrice}`);
      });
      doc.moveDown();
    });

    // Finalize the PDF
    doc.end();

    console.log('Transactions PDF generated successfully at:', outputPath);
  } catch (err) {
    console.error('Error generating transactions PDF:', err);
  }
}

// Call the function to generate the PDF
// generateTransactionsPDF();
