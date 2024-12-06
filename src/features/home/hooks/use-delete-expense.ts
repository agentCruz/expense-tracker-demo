import { useExpenseStore } from "@expense-app/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../api/crud-expenses.api";

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const deleteExpenseInStore = useExpenseStore((state) => state.deleteExpense);

  return useMutation(deleteExpense, {
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries(["expenses"]); // Refresh cache if needed
      deleteExpenseInStore(deletedId); // Sync Zustand state
    },
  });
}
