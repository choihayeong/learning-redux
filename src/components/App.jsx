
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routers/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
