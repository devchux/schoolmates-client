import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Fragment>
      <AppRoutes />
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
