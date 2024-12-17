
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routers/Home";
import Detail from "../routers/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:id",
    element: <Detail />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
