import { createRouter } from '@tanstack/react-router';
import { queryClient } from '../query';
import { routeTree } from '@expense-app/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});
