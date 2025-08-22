"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAdmin = pathname.startsWith("/admin");

	const [menuOpen, setMenuOpen] = React.useState(false);
	const [menuButtonVisible, setMenuButtonVisible] = React.useState(true);
	const [hasMounted, setHasMounted] = React.useState(false);

	React.useEffect(() => {
		setHasMounted(true);
	}, []);

	return (
		<html
			lang="en"
			suppressHydrationWarning={true}
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased ${
					isAdmin ? "" : "bg-[#7d7272]"
				}`}
				style={isAdmin ? { height: "100vh", margin: 0 } : {}}
			>
				{isAdmin ? (
					// --- ADMIN LAYOUT ---
					<div style={{ height: "100%", minHeight: "100vh" }}>{children}</div>
				) : (
					// --- NORMAL SITE LAYOUT ---
					<>
						{hasMounted && (
							<>
								{/* <div
                  className="fixed top-8 right-12 z-20 w-20 h-9 bg-white bg-opacity-20 backdrop-blur-md rounded-lg border border-white border-opacity-30"
                ></div> */}
								{/* Menu Button */}
								<button
									className={`${
										menuButtonVisible ? "visible" : "hidden"
									} fixed top-8 right-12 z-30 text-white text-sm font-light tracking-wide hover:underline focus:outline-none
                  px-4 py-1 ${pathname.startsWith("/events") && "menu-text"}`}
									onClick={() => {
										console.log(pathname);
										setMenuOpen(true);
										setMenuButtonVisible(false);
									}}
									style={{ letterSpacing: "0.05em" }}
								>
									Menu
								</button>

								{/* Overlay Menu */}
								{menuOpen && (
									<div className="fixed inset-0 z-40 bg-black/85 flex flex-col items-end animate-fadeIn">
										<button
											className="m-8 text-white text-lg font-light hover:underline focus:outline-none"
											onClick={() => {
												setMenuOpen(false);
												setMenuButtonVisible(true);
											}}
										>
											Close
										</button>
										<nav className="w-full flex flex-col items-center justify-center flex-1 gap-8">
											<a
												href="/"
												className="text-white text-2xl font-light hover:underline"
											>
												Home
											</a>
											{/* <a
                        href="/about"
                        className="text-white text-2xl font-light hover:underline"
                      >
                        About
                      </a> */}
											<a
												href="/events"
												className="text-white text-2xl font-light hover:underline"
											>
												Events
											</a>
											<a
												href="/admin"
												className="text-white text-2xl font-light hover:underline"
											>
												Admin
											</a>
										</nav>
									</div>
								)}
							</>
						)}
						{children}
					</>
				)}
			</body>
		</html>
	);
}
