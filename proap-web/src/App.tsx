import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import globalStyle, { theme } from "./global-style";
import { AppRoutes } from "./components/routing";
import store from "./store";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Global styles={globalStyle} />
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
