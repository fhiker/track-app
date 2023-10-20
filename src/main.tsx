import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'urql'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import useGraphqlClient from './hooks/useGraphqlClient.tsx'

const client = useGraphqlClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
