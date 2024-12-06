import { createLazyFileRoute } from '@tanstack/react-router'
import { HomePageUi } from '@expense-app/features'

export const Route = createLazyFileRoute('/')({
    component: HomePageUi,
})