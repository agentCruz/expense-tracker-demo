import { TanStackRouterDevtools } from '@expense-app/lib';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

export interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className='w-full h-full'>
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
        </div>
    );
}
