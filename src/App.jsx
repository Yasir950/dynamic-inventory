import { createBrowserRouter, RouterProvider } from "react-router-dom";

// project import
import ThemeCustomization from "themes";
import "./style.css";
import ScrollTop from "components/ScrollTop";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import LoginRoutes from "routes/LoginRoutes";
import MainRoutes from "routes/MainRoutes";
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  let token = localStorage.getItem("token");
  //  token = useSelector(state=>state.user.token)
  const router = createBrowserRouter([token ? MainRoutes : LoginRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME,
  });
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
