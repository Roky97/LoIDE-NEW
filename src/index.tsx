import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";

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
    faInfoCircle,
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
    faChevronUp,
    faInfoCircle
);

declare const module: any;

if (module.hot) {
    module.hot.accept();
}

var root = document.getElementById("root");

ReactDOM.render(
    <ViewportProvider>
        <App />
    </ViewportProvider>,
    root
);
