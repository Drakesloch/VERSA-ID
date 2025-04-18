import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import AboutPage from "@/pages/about-page";
import FeaturesPage from "@/pages/features-page";
import DevelopersPage from "@/pages/developers-page";
import ContactPage from "@/pages/contact-page";
import DocumentationPage from "@/pages/documentation-page";
import ApiKeyPage from "@/pages/api-key-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/developers" component={DevelopersPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/documentation" component={DocumentationPage} />
      <Route path="/api-key" component={ApiKeyPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
