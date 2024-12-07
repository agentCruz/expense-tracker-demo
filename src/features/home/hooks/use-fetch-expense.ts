import { useExpenseStore } from "@expense-app/stores";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenses, getExpenseById } from "../api/crud-expenses.api";

export function useFetchExpenses() {
  const setExpenses = useExpenseStore((state) => state.setExpenses);

  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => fetchExpenses(),
    onSuccess: (data) => {
      setExpenses(data);
    },
  });
}

export function useFetchExpenseById(id: string) {
  return useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpenseById(id),
  });
}
