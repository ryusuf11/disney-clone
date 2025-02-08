import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "./index";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: pushMock,
	}),
}));

jest.mock("@/hooks/useDebounce", () => ({
	__esModule: true,
	default: (value: string, delay: number) => value,
}));

describe("SearchInput Component", () => {
	beforeEach(() => {
		pushMock.mockClear();
	});

	test("renders with default placeholder and submit button when no initial value", () => {
		render(<SearchInput />);
		const input = screen.getByRole("textbox", { name: /search input/i });
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Search...");

		const submitButton = screen.getByRole("button", {
			name: /perform search/i,
		});
		expect(submitButton).toBeInTheDocument();
	});

	test("calls router.push when query changes", async () => {
		render(<SearchInput />);
		const input = screen.getByRole("textbox", { name: /search input/i });

		fireEvent.change(input, { target: { value: "test" } });

		await waitFor(() => {
			expect(pushMock).toHaveBeenCalledWith("/search?keyword=test");
		});
	});

	test("submits the form and calls router.push", async () => {
		render(<SearchInput />);
		const input = screen.getByRole("textbox", { name: /search input/i });

		fireEvent.change(input, { target: { value: "submitTest" } });

		const form = input.closest("form");
		if (!form) throw new Error("Form not found");
		fireEvent.submit(form);

		await waitFor(() => {
			expect(pushMock).toHaveBeenCalledWith("/search?keyword=submitTest");
		});
	});

	test("clear search button works", async () => {
		render(<SearchInput initialValue="hello" />);
		const input = screen.getByRole("textbox", { name: /search input/i });
		expect(input).toHaveValue("hello");

		const clearButton = screen.getByRole("button", { name: /clear search/i });
		expect(clearButton).toBeInTheDocument();

		fireEvent.click(clearButton);

		await waitFor(() => {
			expect(pushMock).toHaveBeenCalledWith("/search");
		});

		expect(input).toHaveValue("");
	});
});
