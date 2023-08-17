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
import Wishlist from "./components/Wishlist";
import AddProductForm from "./components/AddProductForm";
import Order from "./components/Order";

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
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/add-product",
        element: <AddProductForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
