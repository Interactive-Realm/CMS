import { useAuth } from "@/contexts/auth";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { router } from "./router";

export default function App() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth);
    router.invalidate();
  }, [auth]);

  return <RouterProvider router={router} context={{ auth }} />;
}
