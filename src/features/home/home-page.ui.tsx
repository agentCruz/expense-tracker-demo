import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDeleteExpense } from "./hooks/use-delete-expense";
import { useFetchExpenses } from "./hooks/use-fetch-expense";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { calculateTotalExpenses } from "./api/crud-expenses.api";

export function HomePageUi() {
    const { data: expenses, isLoading } = useFetchExpenses();
    const { mutate: deleteExpense } = useDeleteExpense();

    const handleDeleteExpense = (id: string) => {
        deleteExpense(id);
    };

    if (isLoading) return <Loader2 className="justify-center align-middle animate-spin" />;

    return (
        <div className="justify-items-center max-w-full">
            <div className="flex items-center space-x-4 mt-4 mb-4">
                <Card className="flex-grow h-full">
                    <CardHeader>
                        <CardTitle>Expense</CardTitle>
                    </CardHeader>
                    {
                        expenses && <CardContent className="pl-2">{calculateTotalExpenses(expenses)}</CardContent>
                    }
                </Card>
            </div>

            <Link to="/add-expense">
                <Button
                    className="mb-4"
                >
                    Add Expense
                </Button>
            </Link>

            <ul>
                {expenses?.map((expense) => (
                    <li key={expense.id} className="m-5">
                        {expense.description} - ${expense.amount}
                        <Link to={`/expense/${expense.id}`} className="m-5">
                            View
                        </Link>

                        <Link to={`/edit-expense/${expense.id}`} className="m-5">
                            <Button variant={'secondary'}>
                                Update
                            </Button>
                        </Link>
                        <Button onClick={() => handleDeleteExpense(expense.id)} className="m-5" variant={'destructive'}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}