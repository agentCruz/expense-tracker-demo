import { useUpdateExpense } from "@expense-app/features/home/hooks/use-update-expense";
import { Expense } from "@expense-app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.number().min(0, {
    message: "Amount must be greater than 0",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  date: z.string(),
});

export function useEditExpense(item: Expense) {
  const { mutate: updateExpense, isLoading } = useUpdateExpense();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: item.description,
      amount: item.amount,
      date: item.date,
      category: item.category,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const update = {
        id: item.id,
        ...values,
      };
      updateExpense(update);
      router.navigate({ to: '/' })
    } catch (error) {
      console.log("onSubmit[UPDATE] ERROR", error);
    }
  }

  return {
    form,
    onSubmit,
    isLoading: isLoading,
  };
}
