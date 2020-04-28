import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, val) => {
      return val.type === 'outcome' ? acc : acc + val.value;
    }, 0);

    const outcome = this.transactions.reduce((acc, val) => {
      return val.type === 'income' ? acc : acc + val.value;
    }, 0);

    const balance = income - outcome;

    return {
      income,
      outcome,
      total: balance,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
