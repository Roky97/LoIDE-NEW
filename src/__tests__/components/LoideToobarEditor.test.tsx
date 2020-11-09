import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoideToolbarEditor from "../../components/LoideToolbarEditor";

test("renders without crashing", () => {
    const onUndo = jest.fn();
    const onRedo = jest.fn();
    const { baseElement } = render(
        <LoideToolbarEditor onUndo={onUndo} onRedo={onRedo} />
    );
    expect(baseElement).toBeDefined();
});

test("test undo button", async () => {
    const onUndo = jest.fn();
    const onRedo = jest.fn();
    render(<LoideToolbarEditor onUndo={onUndo} onRedo={onRedo} />);

    const button = await screen.findByTitle("Undo");
    fireEvent.click(button);

    expect(onUndo).toBeCalledTimes(1);
});

test("test redo button", async () => {
    const onUndo = jest.fn();
    const onRedo = jest.fn();
    render(<LoideToolbarEditor onUndo={onUndo} onRedo={onRedo} />);

    const button = await screen.findByTitle("Redo");
    fireEvent.click(button);

    expect(onRedo).toBeCalledTimes(1);
});
