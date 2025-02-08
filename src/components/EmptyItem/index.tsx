"use client";

import type { ReactNode } from "react";
import styles from "./EmptyItem.module.scss";

interface EmptyItemProps {
	title?: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
	icon?: ReactNode;
	className?: string;
}

const EmptyItem = ({
	title = "No items found",
	description = "There are currently no items to display",
	action,
	icon,
	className = "",
}: EmptyItemProps) => {
	return (
		<div className={`${styles.emptyContainer} ${className}`}>
			<div className={styles.emptyContent}>
				{icon && <div className={styles.emptyIcon}>{icon}</div>}

				<div className={styles.emptyText}>
					<h3 className={styles.emptyTitle}>{title}</h3>
					<p className={styles.emptyDescription}>{description}</p>
				</div>

				{action && (
					<button
						type="button"
						className={styles.emptyAction}
						onClick={action.onClick}
					>
						{action.label}
					</button>
				)}
			</div>
		</div>
	);
};

export default EmptyItem;
