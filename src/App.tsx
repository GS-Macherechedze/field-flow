import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
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
          <Route path="/field" element={<FieldHome />} />
          <Route path="/field/new-job" element={<NewJob />} />
          <Route path="/field/new-expense" element={<NewExpense />} />
          <Route path="/field/my-jobs" element={<MyJobs />} />
          <Route path="/office" element={<OfficeDashboard />} />
          <Route path="/office/clients" element={<ClientList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
