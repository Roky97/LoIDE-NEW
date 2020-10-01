import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./global.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ViewportProvider } from "./providers/ViewportProvider";
import {
    faCogs,
    faPlay,
    faInfo,
    faPaintBrush,
    faFolderOpen,
    faSave,
    faLink,
    faPlus,
    faTimes,
    faTrash,
    faDownload,
    faEraser,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faCogs,
    faPlay,
    faInfo,
    faPaintBrush,
    faFolderOpen,
    faSave,
    faLink,
    faPlus,
    faTimes,
    faTrash,
    faDownload,
    faEraser,
    faChevronDown,
    faChevronUp
);

declare const module: any;

if (module.hot) {
    module.hot.accept();
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

var root = document.getElementById("root");

ReactDOM.render(
    <ViewportProvider>
        <App />
    </ViewportProvider>,
    root
);
