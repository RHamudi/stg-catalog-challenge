import "./globals.css";
import { AuthContextProvider } from "@/context/authContext";
import { CartContextProvider } from "@/context/cartContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthContextProvider>
          <CartContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
