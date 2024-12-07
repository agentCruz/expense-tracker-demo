import { AddExpenseUi } from '@expense-app/features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-expense')({
  component: AddExpenseUi,
})