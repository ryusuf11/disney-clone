"use client";

import { useState } from "react";

type CheckboxProps = {
	defaultChecked?: boolean;
	onToggle?: (checked: boolean) => void;
};

export const CheckBox = ({ defaultChecked, onToggle }: CheckboxProps) => {
	const [checked, setChecked] = useState(defaultChecked);

	const handleToggle = () => {
		const newChecked = !checked;
		setChecked(newChecked);

		if (onToggle) {
			onToggle(newChecked);
		}
	};

	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={handleToggle}
			onClick={(e) => e.stopPropagation()}
		/>
	);
};
