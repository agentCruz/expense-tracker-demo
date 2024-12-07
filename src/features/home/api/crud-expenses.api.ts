import { Expense } from "@expense-app/types";
import { getExpenses } from "../helper";
import { useExpenseStore } from "@expense-app/stores";

// Simulate a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory data store to simulate a database
let expenses: Expense[] = [];

// Generate a random ID
const generateId = () => crypto.randomUUID();

// CREATE - Add a new expense
export const createExpense = async (
  newExpense: Omit<Expense, "id">
): Promise<Expense> => {
  await delay(2000); // Simulate network delay
  const expense: Expense = { ...newExpense, id: generateId() };
  expenses.push(expense);
  return expense;
};

// UPDATE - Update an existing expense
export const updateExpense = async (
  updatedExpense: Expense
): Promise<Expense> => {
  await delay(2000); // Simulate network delay
  expenses = expenses.map((expense) =>
    expense.id === updatedExpense.id ? updatedExpense : expense
  );
  return updatedExpense;
};

// DELETE - Delete an expense
export const deleteExpense = async (id: string): Promise<string> => {
  await delay(2000); // Simulate network delay
  expenses = expenses.filter((expense) => expense.id !== id);
  return id;
};

// GET - Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const { expenses: localStorageExpenses } = useExpenseStore.getState();

  if (localStorageExpenses.length > 0) {
    return (expenses = localStorageExpenses);
  }

  const defaultExpenses = await getExpenses(10); // Generate 10 default expenses
  // Return a combination of default expenses and current expenses (including newly created or updated ones)
  return [...defaultExpenses, ...expenses];
};

export const getExpenseById = (id: string) => {
  const { expenses } = useExpenseStore.getState();

  // Find the expense with the given ID
  const expense = expenses.find((expense) => expense.id === id);

  // Return the found expense or null if not found
  return expense || null;
};

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};