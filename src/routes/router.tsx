import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import PaymentResult from "../pages/payment-result/payment-result";
import Products from "../pages/productos/products";
import Carrito from "../pages/carrito/carrito";
import Item from "../pages/item/item";
import { FiltersProvider } from "../context/FiltersContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
  { index: true, element: <Home /> },
  { path: "payment-result", element: <PaymentResult /> },
  { path: "result", element: <PaymentResult /> },
      {
        path: "products",
        element: (
          <FiltersProvider>
            <Products />
          </FiltersProvider>
        ),
      },
      { path: "carrito", element: <Carrito /> },
      { path: "products/:slug", element: <Item /> },
    ],
  },
]);
