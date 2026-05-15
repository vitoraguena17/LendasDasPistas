import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "F1 Brasil | Lendas das Pistas",
  description: "Oito títulos mundiais e um país inteiro acelerando junto. Uma jornada interativa pela história e telemetria dos maiores heróis brasileiros da Fórmula 1.",
  keywords: ["F1", "Fórmula 1", "Brasil", "Ayrton Senna", "Nelson Piquet", "Emerson Fittipaldi", "Telemetria"],
  
  openGraph: {
    title: "F1 Brasil | Lendas das Pistas",
    description: "Conheça a trajetória épica dos pilotos que transformaram as manhãs de domingo na era de ouro do nosso automobilismo.",
    url: "https://f1brasil.pages.dev",
    siteName: "F1 Brasil",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "F1 Brasil - Lendas das Pistas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "F1 Brasil | Lendas das Pistas",
    description: "Uma imersão na história dos ícones brasileiros da F1.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          {/* Container principal com o seu layout original */}
          <div className="px-6 md:px-12 lg:px-24 mx-auto w-full max-w-480">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}