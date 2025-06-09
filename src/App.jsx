import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainLayout from './components/Layout/MainLayout'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRQ from './pages/FetchRQ'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import FetchIndv from './UI/FetchIndv'
import FetchInfinite from './pages/FetchInfinite'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/trad",
        element: <FetchOld />
      },
      {
        path: "/rq",
        element: <FetchRQ />
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />
      },
      {
        path: "/infinite-scroll",
        element: <FetchInfinite />
      },
    ]
  }
])

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      
      </RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
    
    
  )
}

export default App;
