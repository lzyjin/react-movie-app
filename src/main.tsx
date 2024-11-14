// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {router} from "./router.tsx";
import {RouterProvider} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  // </StrictMode>,
)
