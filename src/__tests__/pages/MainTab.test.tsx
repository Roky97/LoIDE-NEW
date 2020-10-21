import React from "react";
import { render, screen } from "@testing-library/react";
import MainTab from "../../pages/MainTab";

test("MainTab renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<MainTab />);
    expect(baseElement).toBeDefined();
});

test("renders the image logo on nav bar", async () => {
    render(<MainTab />);
    await screen.findByAltText("loide-logo");
});

test("renders the sidebar title", async () => {
    render(<MainTab />);
    await screen.findByText("Run settings");
});
