import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyItem from "./index";

describe("EmptyItem Component", () => {
	test("renders default title and description", () => {
		render(<EmptyItem />);
		expect(screen.getByText("No items found")).toBeInTheDocument();
		expect(
			screen.getByText("There are currently no items to display"),
		).toBeInTheDocument();
	});

	test("renders provided title and description", () => {
		render(<EmptyItem title="Custom Title" description="Custom Description" />);
		expect(screen.getByText("Custom Title")).toBeInTheDocument();
		expect(screen.getByText("Custom Description")).toBeInTheDocument();
	});

	test("renders an icon when provided", () => {
		const Icon = () => <span data-testid="custom-icon">Icon</span>;
		render(<EmptyItem icon={<Icon />} />);
		expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
	});

	test("renders action button and calls onClick when clicked", () => {
		const onClickMock = jest.fn();
		render(<EmptyItem action={{ label: "Click Me", onClick: onClickMock }} />);
		const button = screen.getByRole("button", { name: /click me/i });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		expect(onClickMock).toHaveBeenCalled();
	});

	test("applies custom className", () => {
		const { container } = render(<EmptyItem className="custom-class" />);
		expect(container.firstChild).toHaveClass("custom-class");
	});
});
