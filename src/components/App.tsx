import React, { useEffect, useState } from "react";
import RunSettings from "./RunSettings";
import LoideNavbar from "./LoideNavbar";
import SideBar from "./Sidebar";
import EditorLayout from "./EditorLayout";
import OpenLayout from "./OpenLayout";
import { ILanguageData } from "../lib/ts/Language";

const configInitialState: Array<ILanguageData> = new Array<ILanguageData>();

const dataMock: Array<ILanguageData> = [
    {
        "name": "ASP",
        "value": "asp",
        "solvers":
            [{
                "name": "DLV2",
                "value": "dlv2",
                "executors":
                    [{
                        "name": "PythonESE",
                        "value": "embAspServerExecutor",
                    },
                    {
                        "name": "GattaESE",
                        "value": "gattaembAspServerExecutor",
                    },],
                "options":
                    [{
                        "name": "Free choice",
                        "value": "free choice",
                        "word_argument": true,
                        "description": "Missing description"
                    }]
            },
            {
                "name": "Clingo",
                "value": "clingo",
                "executors":
                    [{
                        "name": "PythonESE",
                        "value": "embAspServerExecutor",
                    }],
                "options":
                    [{
                        "name": "Free choice",
                        "value": "free choice",
                        "word_argument": true,
                        "description": "Missing description"
                    }]
            },
            {
                "name": "DLV",
                "value": "dlv",
                "executors":
                    [{
                        "name": "PythonESE",
                        "value": "embAspServerExecutor",
                    }],
                "options":
                    [{
                        "name": "Free choice",
                        "value": "free choice",
                        "word_argument": true,
                        "description": "Missing description"
                    },
                    {
                        "name": "Filter",
                        "value": "-filter=",
                        "word_argument": true,
                        "description": "Missing description"
                    },
                    {
                        "name": "No Facts",
                        "value": "-nofacts",
                        "word_argument": false,
                        "description": "Missing description"
                    },
                    {
                        "name": "Silent",
                        "value": "-silent",
                        "word_argument": false,
                        "description": "Missing description"
                    },
                    {
                        "name": "Query",
                        "value": "-FC",
                        "word_argument": false,
                        "description": "Missing description"
                    }]
            }]

    },
    {
        "name": "PDDL",
        "value": "pddl",
        "solvers":
            [{
                "name": "PDDL-Solver",
                "value": "pddl-solver",
                "executors":
                    [{
                        "name": "pddl-executor",
                        "value": "pddl-executor",
                    }]
            }]

    }

]

const App: React.FC = () => {
    // const socket = io.connect("http://localhost:8084");

    const data =
        '{"language":"asp","engine":"dlv2","executor":"embAspServerExecutor","program":["ciao(1..10)."],"option":[{"name":""}]}';

    const [sidebarShow, setSidebarShow] = useState(true);
    const [openbarShow, setOpenbarShow] = useState(false);

    const [configData, setConfigData] = useState<Array<ILanguageData>>(configInitialState);

    useEffect(() => {
        let data =  dataMock;
        setConfigData(data);
    }, []);

    return (
        <div className="loide-body">
            <div className="loide-header">
                <LoideNavbar
                    sidebar={{ toggle: setSidebarShow, show: sidebarShow }}
                    openbar={{ toggle: setOpenbarShow, show: openbarShow }}
                />
            </div>

            <OpenLayout show={openbarShow}></OpenLayout>

            <div className="loide-content">
                <SideBar show={sidebarShow}>
                    <RunSettings languages={configData} />
                </SideBar>
                <EditorLayout />
            </div>
        </div>
    );
};

export default App;
