import NavBar from "@/components/NabBar/NabBar";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"]
});

export const metadata = {
  title: "Deslocamento API",
  description: "Frontend NextJs, MaterialUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
