import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import FieldHome from "./pages/field/FieldHome";
import NewJob from "./pages/field/NewJob";
import NewExpense from "./pages/field/NewExpense";
import MyJobs from "./pages/field/MyJobs";
import OfficeDashboard from "./pages/office/OfficeDashboard";
import ClientList from "./pages/office/ClientList";
import NotFound from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/field" element={<RequireAuth><FieldHome /></RequireAuth>} />
          <Route path="/field/new-job" element={<RequireAuth><NewJob /></RequireAuth>} />
          <Route path="/field/new-expense" element={<RequireAuth><NewExpense /></RequireAuth>} />
          <Route path="/field/my-jobs" element={<RequireAuth><MyJobs /></RequireAuth>} />
          <Route path="/office" element={<RequireAuth><OfficeDashboard /></RequireAuth>} />
          <Route path="/office/clients" element={<RequireAuth><ClientList /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
