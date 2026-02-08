import "./globals.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
