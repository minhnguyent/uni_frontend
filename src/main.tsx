import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { HomeRoute } from './routes/HomeRoutes.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Test } from './components/Test.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="1029367709156-70j4mrl9ng2r86k1eik26hnpsdorcotl.apps.googleusercontent.com">

    <RouterProvider router={HomeRoute} />
</GoogleOAuthProvider>; */}
    <Test />
  </React.StrictMode>,
)
