import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./navigation";
import {LanguageProvider} from "./i18n";

export const metadata: Metadata={title:"FlagQuest — বিশ্বকে জানুন, নিজেকে যাচাই করুন",description:"বিশ্বের দেশ, পতাকা ও তথ্য শিখুন এবং মজার কুইজে নিজের জ্ঞান যাচাই করুন।"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><LanguageProvider><Navigation/>{children}</LanguageProvider></body></html>}
