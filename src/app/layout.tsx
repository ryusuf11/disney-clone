import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.scss";
import Link from "next/link";
import {
	LuHouse as Home,
	LuMonitor as Monitor,
	LuSearch as Search,
} from "react-icons/lu";
import Image from "next/image";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
	subsets: ["latin"],
	fallback: ["Arial", "Helvetica", "sans-serif"],
});

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Disney Hotstar",
	description: "Disney Hotstar Clone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${robotoMono.variable}`}>
				<aside className="sidebar">
					<Link href="/" title="Home">
						<Image
							src="/logo.png"
							alt="Disney Hotstar"
							width={40}
							height={40}
							className="sidebar__logo"
							quality={70}
						/>
					</Link>
					<div className="sidebar__menu">
						<Link href="/search" title="Search" className="sidebar__menu-item">
							<Search size={24} />
						</Link>
						<Link href="/" title="Home" className="sidebar__menu-item">
							<Home size={24} />
						</Link>
						<Link
							href="/watchlist"
							title="Watchlist"
							className="sidebar__menu-item"
						>
							<Monitor size={24} />
						</Link>
					</div>
				</aside>

				<main className="main main__sidebar">{children}</main>
			</body>
		</html>
	);
}
