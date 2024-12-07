import { useCreateExpense } from "@expense-app/features/home/hooks/use-create-expense";
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

export function useAddExpense() {
  const { mutate: createExpense, isLoading } = useCreateExpense();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 1,
      date: new Date().toLocaleString(),
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createExpense(values);
      router.navigate({ to: '/' })
    } catch (error) {
      console.log("onSubmit[CREATE] ERROR", error);
    }
  }

  return {
    form,
    onSubmit,
    isLoading: isLoading,
  };
}
