import React from "react";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <UrlShortenerPage />
    </SnackbarProvider>
  );
}

export default App;
