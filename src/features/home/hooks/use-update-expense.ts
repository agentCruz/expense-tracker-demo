import { useExpenseStore } from "@expense-app/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "../api/crud-expenses.api";

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  const updateExpenseInStore = useExpenseStore((state) => state.updateExpense);

  return useMutation(updateExpense, {
    onSuccess: (updatedExpense) => {
      queryClient.invalidateQueries(["expenses"]); // Refresh cache if needed
      updateExpenseInStore(updatedExpense); // Sync Zustand state
    },
  });
}
