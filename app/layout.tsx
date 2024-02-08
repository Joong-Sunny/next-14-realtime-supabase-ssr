import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
		<body className={inter.className}>
		<div className="flex flex-col">
			<Link href="/">
				<span className="text-2xl font-bold text-blue-500 hover:underline focus:underline focus:outline-none">
					Home
				</span>
			</Link>
			<Link href="/auth-server-action">
				<span className="text-2xl font-bold text-blue-500 hover:underline focus:underline focus:outline-none">
					Auth Server Action
				</span>
			</Link>

			<Link href="/todo">
				<span className="text-2xl font-bold text-blue-500 hover:underline focus:underline focus:outline-none">
					CRUD
				</span>
			</Link>

			<Link href="/add-user-info">
				<span className="text-2xl font-bold text-blue-500 hover:underline focus:underline focus:outline-none">
					Add User Info
				</span>
			</Link>

			<Link href="/check-all-user-info">
				<span className="text-2xl font-bold text-blue-500 hover:underline focus:underline focus:outline-none">
					See All Users Info
				</span>
			</Link>


		</div>
		{children} <Toaster />
		</body>
		</html>
	);
}
