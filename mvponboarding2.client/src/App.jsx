import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Customer from "./pages/Customer";
import Product from "./pages/Product";
import Store from "./pages/Store";
import Sale from "./pages/Sale";
import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Customer />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/store" element={<Store />} />
      <Route path="/product" element={<Product />} />
      <Route path="/sale" element={<Sale />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
