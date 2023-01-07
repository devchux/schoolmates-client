import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import LoginPrompt from "./components/modals/login-prompt";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Fragment>
      <AppRoutes />
      <LoginPrompt />
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
};

export default App;
