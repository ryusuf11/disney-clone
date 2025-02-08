"use client";

import { useState, useEffect, type KeyboardEvent } from "react";
import styles from "./Tab.module.scss";

interface TabItem {
	id: string;
	title: string;
	content: React.ReactNode | string;
}

interface TabProps {
	tabs: TabItem[];
	className?: string;
	activeColor?: string;
	orientation?: "horizontal" | "vertical";
}

const Tab: React.FC<TabProps> = ({
	tabs,
	className = "",
	activeColor = "#2196f3",
	orientation = "horizontal",
}) => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");

	useEffect(() => {
		if (tabs.length > 0 && !activeTab) {
			setActiveTab(tabs[0].id);
		}
	}, [tabs, activeTab]);

	const handleKeyDown = (e: KeyboardEvent, id: string) => {
		if (e.key === "Enter" || e.key === " ") {
			setActiveTab(id);
		} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
			const nextIndex = (currentIndex + 1) % tabs.length;
			setActiveTab(tabs[nextIndex].id);
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
			const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
			setActiveTab(tabs[prevIndex].id);
		}
	};

	if (tabs.length === 0) return null;

	return (
		<div
			className={`${styles.tabContainer} ${className} ${styles[orientation]}`}
			style={{ "--active-color": activeColor } as React.CSSProperties}
		>
			<div
				role="tablist"
				aria-orientation={orientation}
				className={styles.tabHeaders}
			>
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id}
						role="tab"
						aria-selected={activeTab === tab.id}
						aria-controls={`panel-${tab.id}`}
						id={`tab-${tab.id}`}
						className={`${styles.tabHeader} ${
							activeTab === tab.id ? styles.active : ""
						}`}
						onClick={() => setActiveTab(tab.id)}
						onKeyDown={(e) => handleKeyDown(e, tab.id)}
						tabIndex={activeTab === tab.id ? 0 : -1}
					>
						{tab.title}
					</button>
				))}
			</div>

			<div className={styles.tabContentContainer}>
				{tabs.map((tab) => (
					<div
						key={tab.id}
						role="tabpanel"
						id={`panel-${tab.id}`}
						aria-labelledby={`tab-${tab.id}`}
						className={`${styles.tabContent} ${
							activeTab === tab.id ? styles.active : ""
						}`}
						hidden={activeTab !== tab.id}
					>
						{tab.content}
					</div>
				))}
			</div>
		</div>
	);
};

export default Tab;
