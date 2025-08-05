
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import * as Sentry from "@sentry/react";


import { useEffect } from "react";
import { usePathname } from "./utils/hooks";
import { isLoggedIn, openLogin, routeHome } from "./utils/auth";
import { ForgotPassword } from "./pages/account/ForgotPassword";
import { ResetPassword } from "./pages/account/ResetPassword";
import Index from "./pages/Index";
import Category from "./pages/Category";
import AppPage from "./pages/AppPage";
import NotFound from "./pages/NotFound";

import { Login } from "@/pages/account/Login";
import ErrorBoundary from "@/pages/ErrorBoundary"

const queryClient = new QueryClient();

const AppRouter = () => {
  const navigate = useNavigate();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "") {
      if (isLoggedIn()) {
        navigate("/home");
      } else {
        navigate("/login");
      }
      return;
    }
  }, [pathname, navigate]);

  return (
    <Sentry.ErrorBoundary fallback={<ErrorBoundary />}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Tooltip id="my-tooltip" className="z-40" />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route
              path="/public/reset_password"
              element={<ResetPassword />}
            />

            <Route path="/home" element={<Index />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/app/:id" element={<AppPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  )
}

export default AppRouter;
