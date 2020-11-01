import React from "react";
import { render, screen } from "@testing-library/react";
import TabToExecute from "../../components/TabToExecute";
import { ionFireEvent as fireEvent } from "@ionic/react-test-utils";

import { ILoideTab } from "../../lib/LoideInterfaces";

import { mockIonicReact } from "@ionic/react-test-utils";
mockIonicReact();

var tabs: Map<number, ILoideTab> = new Map<number, ILoideTab>();
tabs.set(1, {
    title: `L P 1`,
    type: "",
    value: "node(1)",
});

tabs.set(2, {
    title: `L P 2`,
    type: "",
    value: "color(2)",
});

const onCheckCurrentTab: (value: boolean) => void = jest.fn();
const onCheckTab: (idTab: number, value: boolean) => void = jest.fn();

test("renders without crashing", () => {
    const { baseElement } = render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );
    expect(baseElement).toBeDefined();
});

test("renders the header", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );

    await screen.findByText("Choose tab to execute");
});

test("renders the curent tab item", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );

    await screen.findByText("Current tab");
});

test("renders the tab items", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );

    await screen.findByText(tabs.get(1)!.title);
    await screen.findByText(tabs.get(2)!.title);
});

test("test click the current tab item", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );

    const item = await (await screen.findByText("Current tab"))
        .nextElementSibling;

    fireEvent.click(item!, "");

    expect(item).toHaveProperty("checked", true);
});

test("test click the tab items", async () => {
    render(
        <TabToExecute
            tabs={tabs}
            tabsIDToExecute={[]}
            onCheckCurrentTab={onCheckCurrentTab}
            onCheckTab={onCheckTab}
        />
    );

    const item = await (await screen.findByText(tabs.get(1)!.title))
        .nextElementSibling;

    fireEvent.click(item!, "");

    expect(item).toHaveProperty("checked", true);
});
