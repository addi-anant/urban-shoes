import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import SignIn from "./components/SignIn";
import Registration from "./components/Registeration";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Strip from "./components/Strip";
import Cart from "./components/Cart";

const AppOutlet = () => {
  return (
    <>
      <Strip />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppOutlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:query",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
