import { Expense } from "@expense-app/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of the store state
type ExpenseStore = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  updateExpense: (updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
};

// Create the store
export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [], // Initial state
      addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),
      setExpenses: (expenses: Expense[]) => set({ expenses }),
      updateExpense: (updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          ),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
      getExpenseById: (id) =>
        get().expenses.find((expense) => expense.id === id),
    }),
    {
      name: "expense-tracker-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
