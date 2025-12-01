import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./provider/theme-provider";
import { AppRouter } from "./router/AppRouter";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
