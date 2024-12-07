import { Button } from "@/components/ui/button";
import { deleteExpense } from "@expense-app/features/home/api/crud-expenses.api";
import { Route } from "@expense-app/routes/expense.$id";
import { Link } from "@tanstack/react-router";

export function ViewExpenseUi() {
    const { data } = Route.useLoaderData();

    console.log('ViewExpenseUi', data);

    const handleDeleteExpense = (id: string) => {
        deleteExpense(id);
    };

    return (
        <div>
            Hello "/expense/{data?.id}"!

            <div>
                <div>Description: {data?.description}</div>
                <div>Amount: {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NGN",
                }).format(data?.amount ?? 0)}</div>
                <div>Date: {data?.date}</div>
                <div>Category: {data?.category}</div>
            </div>

            <div>
                <Link to={`/edit-expense/${data?.id}`}>
                    <Button variant={'secondary'}>
                        Update
                    </Button>
                </Link>

                <Button variant={'destructive'} onClick={() => handleDeleteExpense(data?.id ?? '')}>
                    Delete
                </Button>
            </div>
        </div>
    )
}