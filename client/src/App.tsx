import { RouterProvider } from "react-router-dom";
import router from "./layout/AppRouter";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
