import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import globalStyle, { theme } from './global-style'
import { AppRoutes } from './components/routing'
import store from './store'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Global styles={globalStyle} />
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  )
}

export default App
