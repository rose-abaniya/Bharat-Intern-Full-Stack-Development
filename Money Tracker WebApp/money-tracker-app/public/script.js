document.addEventListener('DOMContentLoaded', function () {
    loadTransactions();
});

function addTransaction() {
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    if (!amount || !description) {
        alert('Please enter both amount and description.');
        return;
    }

    const transaction = { amount, type, description };

    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    })
    .then(response => response.json())
    .then(data => {
        loadTransactions();
    })
    .catch(error => console.error('Error:', error));
}

function loadTransactions() {
    fetch('/api/transactions')
    .then(response => response.json())
    .then(transactions => {
        const transactionsContainer = document.getElementById('transactions');
        transactionsContainer.innerHTML = '';

        transactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.className = 'transaction';
            transactionElement.innerHTML = `
                <span>${transaction.type.toUpperCase()}</span>
                <span>${transaction.amount}</span>
                <span>${transaction.description}</span>
            `;
            transactionsContainer.appendChild(transactionElement);
        });
    })
    .catch(error => console.error('Error:', error));
}
