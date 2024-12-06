import { Expense } from "@expense-app/types";

// Simulate a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate demo expenses
export const getExpenses = async (count: number): Promise<Expense[]> => {
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
  ];
  const descriptions = [
    "Grocery shopping",
    "Uber ride",
    "Movie tickets",
    "Electricity bill",
    "Doctor's appointment",
    "Clothes purchase",
  ];

  const randomDate = (start: Date, end: Date): Date => {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date;
  };

  const randomAmount = (min: number, max: number): number =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));

  const generateExpense = (): Expense => {
    const id = crypto.randomUUID();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const amount = randomAmount(5, 500); // Random amount between $5 and $500
    const date = randomDate(new Date(2023, 0, 1), new Date()); // Random date in the past year

    return {
      id,
      category,
      description,
      amount,
      date: date.toISOString(), // Use ISO string format for consistency
    };
  };

  // Simulate network delay
  await delay(2000);

  // Generate expenses
  return Array.from({ length: count }, generateExpense);
};