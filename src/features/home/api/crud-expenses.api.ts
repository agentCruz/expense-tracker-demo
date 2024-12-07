import { Expense } from "@expense-app/types";
import { getExpenses } from "../helper";
import { useExpenseStore } from "@expense-app/stores";

// Simulate a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a random ID
const generateId = () => crypto.randomUUID();

// CREATE - Add a new expense
export const createExpense = async (
  newExpense: Omit<Expense, "id">
): Promise<Expense> => {
  await delay(2000); // Simulate network delay
  const expense: Expense = { ...newExpense, id: generateId() };
  const { addExpense } = useExpenseStore.getState();
  addExpense(expense);
  return expense;
};

// UPDATE - Update an existing expense
export const updateExpense = async (
  updatedExpense: Expense
): Promise<Expense> => {
  await delay(2000); // Simulate network delay
  const { updateExpense } = useExpenseStore.getState();
  updateExpense(updatedExpense);
  return updatedExpense;
};

// DELETE - Delete an expense
export const deleteExpense = async (id: string): Promise<string> => {
  await delay(2000); // Simulate network delay
  const { deleteExpense } = useExpenseStore.getState();
  deleteExpense(id);
  return id;
};

// GET - Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const { expenses: localStorageExpenses, setExpenses } =
    useExpenseStore.getState();

  if (localStorageExpenses.length > 0) {
    return localStorageExpenses;
  }

  const defaultExpenses = await getExpenses(10); // Generate 10 default expenses

  setExpenses(defaultExpenses);

  return defaultExpenses;
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
