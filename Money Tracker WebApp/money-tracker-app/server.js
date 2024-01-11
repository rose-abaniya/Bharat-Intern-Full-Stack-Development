const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/money_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a basic expense/income schema
const transactionSchema = new mongoose.Schema({
    type: String, // 'expense' or 'income'
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API routes

app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/transactions', async (req, res) => {
    const transaction = new Transaction({
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
