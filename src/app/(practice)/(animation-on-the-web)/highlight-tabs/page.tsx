"use client";

import cn from "classnames";
import { motion } from "motion/react";
import { useState } from "react";

export default function HighlightTabsPage() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<HighlightTabs />
		</div>
	);
}

function HighlightTabs() {
	const [activeTab, setActiveTab] = useState(1);
	const updatedActiveTab = (index: number) => setActiveTab(index);

	return (
		<div className="flex gap-5">
			{TABS.map((tab) => (
				<Tab
					key={tab.id}
					id={tab.id}
					label={tab.label}
					activeTab={activeTab}
					setActiveTab={updatedActiveTab}
				/>
			))}
		</div>
	);
}

function Tab({
	id,
	label,
	activeTab,
	setActiveTab,
}: {
	id: number;
	label: string;
	activeTab: number;
	setActiveTab: (index: number) => void;
}) {
	const isActive = activeTab === id;

	return (
		<div
			className="relative cursor-pointer px-2 py-1 font-inter font-normal text-sm"
			onFocus={() => setActiveTab(id)}
			onMouseOver={() => setActiveTab(id)}
			onMouseLeave={() => setActiveTab(id)}
		>
			{isActive ? (
				<motion.div
					layoutId="tab-highlight"
					className={cn("absolute inset-0 rounded-lg bg-black/5")}
					transition={{ type: "spring", stiffness: 100, damping: 20 }}
				/>
			) : null}
			<span>{label}</span>
		</div>
	);
}

const TABS = [
	{
		id: 1,
		label: "Saved Sites",
	},
	{
		id: 2,
		label: "Collections",
	},
	{
		id: 3,
		label: "48 Following",
	},
	{
		id: 4,
		label: "32 Followers",
	},
];
