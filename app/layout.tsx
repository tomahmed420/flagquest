import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./navigation";

export const metadata: Metadata = {title:"FlagQuest — Learn the World",description:"Explore countries and test your knowledge with interactive world flag quizzes."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Navigation/>{children}</body></html>}