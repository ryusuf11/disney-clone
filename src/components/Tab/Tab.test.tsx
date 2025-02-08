import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tab from "./index";

const dummyTabs = [
	{
		id: "tab1",
		title: "Tab One",
		content: "Content One",
	},
	{
		id: "tab2",
		title: "Tab Two",
		content: "Content Two",
	},
	{
		id: "tab3",
		title: "Tab Three",
		content: "Content Three",
	},
];

describe("Tab Component", () => {
	test("renders all tab headers", () => {
		render(<Tab tabs={dummyTabs} />);
		for (const tab of dummyTabs) {
			expect(screen.getByRole("tab", { name: tab.title })).toBeInTheDocument();
		}
	});

	test("initially activates the first tab", () => {
		render(<Tab tabs={dummyTabs} />);
		const firstTab = screen.getByRole("tab", { name: "Tab One" });
		expect(firstTab).toHaveAttribute("aria-selected", "true");

		const tabPanels = screen.getAllByRole("tabpanel");
		const visiblePanels = tabPanels.filter(
			(panel) => !panel.hasAttribute("hidden"),
		);
		expect(visiblePanels).toHaveLength(1);
		expect(visiblePanels[0]).toHaveTextContent("Content One");
	});

	test("clicking a tab header activates that tab", () => {
		render(<Tab tabs={dummyTabs} />);
		const secondTab = screen.getByRole("tab", { name: "Tab Two" });

		fireEvent.click(secondTab);
		expect(secondTab).toHaveAttribute("aria-selected", "true");

		const firstTab = screen.getByRole("tab", { name: "Tab One" });
		expect(firstTab).toHaveAttribute("aria-selected", "false");

		const tabPanels = screen.getAllByRole("tabpanel");
		const visiblePanels = tabPanels.filter(
			(panel) => !panel.hasAttribute("hidden"),
		);
		expect(visiblePanels).toHaveLength(1);
		expect(visiblePanels[0]).toHaveTextContent("Content Two");
	});

	test("keyboard navigation: Enter or Space activates a tab", () => {
		render(<Tab tabs={dummyTabs} />);
		const thirdTab = screen.getByRole("tab", { name: "Tab Three" });

		fireEvent.keyDown(thirdTab, { key: "Enter", code: "Enter", charCode: 13 });
		expect(thirdTab).toHaveAttribute("aria-selected", "true");

		const firstTab = screen.getByRole("tab", { name: "Tab One" });
		fireEvent.keyDown(firstTab, { key: " ", code: "Space", charCode: 32 });
		expect(firstTab).toHaveAttribute("aria-selected", "true");
	});

	test("keyboard navigation: ArrowRight and ArrowDown move to next tab", () => {
		render(<Tab tabs={dummyTabs} />);
		const firstTab = screen.getByRole("tab", { name: "Tab One" });

		fireEvent.keyDown(firstTab, {
			key: "ArrowRight",
			code: "ArrowRight",
			charCode: 39,
		});
		const secondTab = screen.getByRole("tab", { name: "Tab Two" });
		expect(secondTab).toHaveAttribute("aria-selected", "true");

		fireEvent.keyDown(secondTab, {
			key: "ArrowDown",
			code: "ArrowDown",
			charCode: 40,
		});
		const thirdTab = screen.getByRole("tab", { name: "Tab Three" });
		expect(thirdTab).toHaveAttribute("aria-selected", "true");
	});

	test("keyboard navigation: ArrowLeft and ArrowUp move to previous tab", () => {
		render(<Tab tabs={dummyTabs} />);
		const thirdTab = screen.getByRole("tab", { name: "Tab Three" });
		fireEvent.click(thirdTab);
		expect(thirdTab).toHaveAttribute("aria-selected", "true");

		fireEvent.keyDown(thirdTab, {
			key: "ArrowLeft",
			code: "ArrowLeft",
			charCode: 37,
		});
		const secondTab = screen.getByRole("tab", { name: "Tab Two" });
		expect(secondTab).toHaveAttribute("aria-selected", "true");

		fireEvent.keyDown(secondTab, {
			key: "ArrowUp",
			code: "ArrowUp",
			charCode: 38,
		});
		const firstTab = screen.getByRole("tab", { name: "Tab One" });
		expect(firstTab).toHaveAttribute("aria-selected", "true");
	});
});
