class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount, description) {
        if (amount <= 0) {
            return "Deposit amount must be greater than zero.";
        }

        this.transactions.push({
            type: "deposit",
            amount,
            description
        });

        this.balance += amount;
        return `Successfully deposited $${amount} for ${description}. New balance: $${this.balance}`;
    }

    withdraw(amount, description) {
        if (amount <= 0 || amount > this.balance) {
            return "Insufficient balance or invalid amount.";
        }

        this.transactions.push({
            type: "withdraw",
            amount,
            description
        });

        this.balance -= amount;
        return `Successfully withdrew $${amount} for ${description}. New balance: $${this.balance}`;
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    listAllDeposits() {
        const deposits = this.transactions
            .filter((transaction) => transaction.type === "deposit")
            .map((transaction) => `$${transaction.amount} - ${transaction.description}`);

        return deposits.length > 0 ? `Deposits:\n${deposits.join("\n")}` : "No deposits yet.";
    }

    listAllWithdrawals() {
        const withdrawals = this.transactions
            .filter((transaction) => transaction.type === "withdraw")
            .map((transaction) => `$${transaction.amount} - ${transaction.description}`);

        return withdrawals.length > 0 ? `Withdrawals:\n${withdrawals.join("\n")}` : "No withdrawals yet.";
    }

    listAllTransactions() {
        if (this.transactions.length === 0) {
            return "No transactions yet.";
        }

        return this.transactions
            .map((transaction, index) => {
                return `${index + 1}. ${transaction.type}: $${transaction.amount} - ${transaction.description}`;
            })
            .join("\n");
    }
}

const petalAccount = new BankAccount();

function updateAccount(message) {
    document.getElementById("account-message").textContent = message;
    document.getElementById("account-output").textContent =
        `${message}\n\nAll Transactions:\n${petalAccount.listAllTransactions()}`;
}

function depositRoseSale() {
    updateAccount(petalAccount.deposit(300, "rose bouquet sales"));
}

function depositTulipSale() {
    updateAccount(petalAccount.deposit(200, "tulip arrangement sales"));
}

function buySupplies() {
    updateAccount(petalAccount.withdraw(50, "soil and vase supplies"));
}

function buySeeds() {
    updateAccount(petalAccount.withdraw(75, "seasonal flower seeds"));
}

function showBalance() {
    updateAccount(petalAccount.checkBalance());
}

function showDeposits() {
    updateAccount(petalAccount.listAllDeposits());
}

function showWithdrawals() {
    updateAccount(petalAccount.listAllWithdrawals());
}

petalAccount.deposit(300, "opening rose bouquet sales");
petalAccount.deposit(200, "opening tulip arrangement sales");
petalAccount.deposit(100, "spring daisy sales");
petalAccount.withdraw(50, "soil purchase");
petalAccount.withdraw(75, "vase supplies");

document.getElementById("account-output").textContent =
    `Starting Flower Shop Account:\n${petalAccount.listAllTransactions()}\n\n${petalAccount.checkBalance()}`;