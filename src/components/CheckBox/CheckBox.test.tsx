import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CheckBox } from "./index";

describe("CheckBox Component", () => {
	test("renders with defaultChecked true", () => {
		render(<CheckBox defaultChecked={true} />);
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeChecked();
	});

	test("renders with defaultChecked false", () => {
		render(<CheckBox defaultChecked={false} />);
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
	});

	test("toggles state and calls onToggle callback", () => {
		const onToggleMock = jest.fn();
		render(<CheckBox defaultChecked={false} onToggle={onToggleMock} />);
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(onToggleMock).toHaveBeenCalledWith(true);

		fireEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
		expect(onToggleMock).toHaveBeenCalledWith(false);
	});

	test("stops click propagation", () => {
		const parentClickMock = jest.fn();
		const { container } = render(
			<div onClick={parentClickMock} onKeyUp={parentClickMock}>
				<CheckBox defaultChecked={false} />
			</div>,
		);
		const checkbox = container.querySelector("input");
		if (!checkbox) throw new Error("Checkbox input not found");

		fireEvent.click(checkbox);

		expect(parentClickMock).not.toHaveBeenCalled();
	});
});
