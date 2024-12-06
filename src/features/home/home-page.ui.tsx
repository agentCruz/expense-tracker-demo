import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useExpenseStore } from "@expense-app/stores";
import { Expense } from "@expense-app/types";
import { useState } from "react";
import { useCreateExpense } from "./hooks/use-create-expense";
import { useDeleteExpense } from "./hooks/use-delete-expense";
import { useFetchExpenses } from "./hooks/use-fetch-expense";
import { useUpdateExpense } from "./hooks/use-update-expense";
import { Loader2 } from "lucide-react";

export function HomePageUi() {
    const { data: expenses, isLoading } = useFetchExpenses();
    const { mutate: createExpense } = useCreateExpense();
    const { mutate: updateExpense } = useUpdateExpense();
    const { mutate: deleteExpense } = useDeleteExpense();
    const localExpenses = useExpenseStore((state) => state.expenses); // Zustand state

    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: 0,
        category: "Food",
        date: new Date().toISOString(),
    });

    const handleAddExpense = () => {
        createExpense(newExpense);
    };

    const handleDeleteExpense = (id: string) => {
        deleteExpense(id);
    };

    const handleUpdateExpense = (expense: Expense) => {
        const updatedExpense = { ...expense, amount: expense.amount + 10 }; // Example update
        updateExpense(updatedExpense);
    };

    if (isLoading) return <Loader2 className="justify-center align-middle animate-spin" />;

    return (
        <div className="justify-items-center max-w-full">
            <div className="flex items-center space-x-4 mt-4 mb-4">
                <Card className="flex-grow h-full">
                    <CardHeader>
                        <CardTitle>Expense</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">45,000</CardContent>
                </Card>
            </div>

            <Button
                onClick={handleAddExpense}
                className="mb-4"
            >
                Add Expense
            </Button>

            <ul>
                {localExpenses?.map((expense) => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount}
                        <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                        <button onClick={() => handleUpdateExpense(expense)}>Update</button>
                    </li>
                ))}
            </ul>

            <h2>Local (Zustand) State</h2>
            <pre>{JSON.stringify(localExpenses, null, 2)}</pre>
        </div>
    )
}