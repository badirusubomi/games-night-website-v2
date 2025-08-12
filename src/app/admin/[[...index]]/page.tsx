"use client";
import config from "@/sanity.config";
import { Studio } from "sanity";
import { useState, useEffect } from "react";

export default function AdminPage() {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return (
		<>
			{hasMounted && (
				<div className="h-full min-h-screen">
					<Studio config={config} />
				</div>
			)}
		</>
	);
}
