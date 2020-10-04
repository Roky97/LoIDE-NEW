import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

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

var root = document.getElementById("root");

ReactDOM.render(
    <ViewportProvider>
        <App />
    </ViewportProvider>,
    root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
