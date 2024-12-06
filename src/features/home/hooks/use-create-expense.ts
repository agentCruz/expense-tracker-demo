import { useExpenseStore } from "@expense-app/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../api/crud-expenses.api";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const addExpense = useExpenseStore((state) => state.addExpense);

  return useMutation(createExpense, {
    onSuccess: (newExpense) => {
      queryClient.invalidateQueries(["expenses"]); // Refresh cache if needed
      addExpense(newExpense); // Sync Zustand state
    },
  });
}
