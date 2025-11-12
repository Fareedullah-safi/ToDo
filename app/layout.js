import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Full SEO metadata
export const metadata = {
  title: "ToDo Next.js App | Smart Daily Task Manager",
  description:
    "A powerful and elegant ToDo web app built with Next.js. Add, update, and manage your daily tasks easily. Stay organized and productive every day!",
  keywords: [
    "todo app",
    "task manager",
    "Next.js ToDo",
    "daily planner",
    "productivity app",
    "task tracker",
    "react todo app",
    "nextjs project",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbz6ftcwo/image/upload/v1762954277/list_amq62a.png",
    shortcut: "https://res.cloudinary.com/dbz6ftcwo/image/upload/v1762954277/list_amq62a.png",
    apple: "https://res.cloudinary.com/dbz6ftcwo/image/upload/v1762954277/list_amq62a.png",
  },
  authors: [{ name: "Fareedullah Safi" }],
  creator: "Fareedullah Safi",
  publisher: "Fareedullah Safi",
  openGraph: {
    title: "ToDo Next.js App | Manage Your Tasks Easily",
    description:
      "A clean and modern ToDo application built with Next.js, Tailwind CSS, and Clerk. Add your tasks, mark them as complete, and stay organized.",
    siteName: "ToDo Next.js App",
    images: [
      {
        url: "https://your-domain.com/og-image.png", // 🔁 add an OG image later
        width: 1200,
        height: 630,
        alt: "ToDo Next.js App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToDo Next.js App | Smart Task Manager",
    description: "Boost your productivity with this modern ToDo app built using Next.js and Clerk.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>{children}</ClerkProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
