import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins', 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: '--font-playfair',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="px-6 md:px-12 lg:px-24 mx-auto w-full max-w-480">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}