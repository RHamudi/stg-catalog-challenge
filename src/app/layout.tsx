import "./globals.css";
import { AuthContextProvider } from "@/context/authContext";
import { CartContextProvider } from "@/context/cartContext";

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
            {children}
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
