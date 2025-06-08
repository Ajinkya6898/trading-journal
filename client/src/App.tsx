import { RouterProvider } from "react-router-dom";
import router from "./layout/AppRoutes";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
