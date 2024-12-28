import { useAuth } from "@/lib/contexts/auth";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { router } from "./router";
import { ThemeProvider } from "./lib/components/utils/theme-provider";

export default function App() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth);
    router.invalidate();
  }, [auth]);
 
  return (
    <ThemeProvider>
      <RouterProvider router={router} context={{ auth }} />
    </ThemeProvider> 
  )
}
