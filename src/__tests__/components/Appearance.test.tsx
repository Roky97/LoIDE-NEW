/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { render, screen } from "@testing-library/react";
import Appearance from "../../components/Appearance";
import {
    ionFireEvent as fireEvent,
    ionFireEvent,
} from "@ionic/react-test-utils";

test("Appearance renders without crashing", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { baseElement } = render(<Appearance />);
    expect(baseElement).toBeDefined();
});

test("renders the header titles", async () => {
    render(<Appearance />);
    await screen.findByText("General");
    await screen.findByText("Editor");
    await screen.findByText("Output");
});

test("test dark mode item", async () => {
    render(<Appearance />);
    await screen.findByText("Dark mode");
    const toogle = await screen.findByTitle("Toogle dark mode");
    ionFireEvent.ionChange(toogle, "1");
});

test("test font size editor item", async () => {
    render(<Appearance />);

    const range = await screen.findByTitle("Font size editor range");
    const labelText = range.querySelector("ion-label")?.innerHTML.trim();
    ionFireEvent.ionChange(range, "1");

    expect(labelText).toBe("Font size");
});

test("test font size output item", async () => {
    render(<Appearance />);
    await screen.findAllByText("Font size");

    const range = await screen.findByTitle("Font size output range");
    const labelText = range.querySelector("ion-label")?.innerHTML.trim();
    ionFireEvent.ionChange(range, "1");

    expect(labelText).toBe("Font size");
});
