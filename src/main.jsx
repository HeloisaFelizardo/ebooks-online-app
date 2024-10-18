import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './styles/global.scss'
import {ChakraProvider} from "@chakra-ui/react";
import theme from './theme/theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right' } }}>
      <App/>
    </ChakraProvider>
  </StrictMode>,
)
