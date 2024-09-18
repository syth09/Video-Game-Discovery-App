# Project: Building a Video Game Discovery App:

### Setting up project:

- Using vite version 4.1.0.
- Setting git repostor at: https://github.com/syth09/Video-Game-Discovery-App.git

### Installing Chakar:

- Because we're using Vite so will install the library as guide in the chakra page:https://v2.chakra-ui.com/getting-started/vite-guide

  - 1. Installation: `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
  - 2. Provider Setup:

  ```
  import * as React from 'react'
  import { ChakraProvider } from '@chakra-ui/react'
  import * as ReactDOM from 'react-dom/client'
  import App from './App';

  const rootElement = document.getElementById('root')
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
  )
  ```
