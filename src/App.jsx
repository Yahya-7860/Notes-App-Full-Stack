import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import NoteApp from "./pages/NoteApp";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/desktop",
      element: <NoteApp />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
