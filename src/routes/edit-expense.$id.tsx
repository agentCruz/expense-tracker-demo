import { UpdateExpenseUi } from '@expense-app/features'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getExpenseById } from '@expense-app/features/home/api/crud-expenses.api';
import { Expense } from '@expense-app/types';
import { z } from 'zod';

export const Route = createFileRoute('/edit-expense/$id')({
  component: UpdateExpenseUi,
  loader: async ({ params, context }) => {
    const { queryClient } = context;
    const expenseID = String(params.id);

    // Validate expense ID
    if (!z.string().uuid(expenseID)) {
      alert('Invalid Expense ID');
      throw redirect({ to: '/' });
    }

    // Preload expense info
    await queryClient.prefetchQuery({
      queryKey: ['expense', expenseID],
      queryFn: () => getExpenseById(expenseID),
    });

    // Return the data for react query
    const expenseData = queryClient.getQueryData(['expense', expenseID]) as Expense | null;

    return {
      data: expenseData
    };
  },
})