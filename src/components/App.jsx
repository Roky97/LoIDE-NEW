import React, { useEffect, useState } from "react";
import LoideNavbar from "./LoideNavbar";
import RunSettings from "./RunSettings";
import SideBar from "./Sidebar";
import EditorLayout from "./EditorLayout";
import OpenLayout from "./OpenLayout";

const configInitialState = {
    languages: [],
    solvers: [],
    executors: [],
};

const App = (props) => {
    // const socket = io.connect("http://localhost:8084");

    const data =
        '{"language":"asp","engine":"dlv2","executor":"embAspServerExecutor","program":["ciao(1..10)."],"option":[{"name":""}]}';

    const [sidebarShow, setSidebarShow] = useState(true);
    const [openbarShow, setOpenbarShow] = useState(false);

    const [configData, setConfigData] = useState(configInitialState);

    useEffect(() => {
        console.log("configData", configData);
        let data = {
            //mock
            languages: [{value: "asp", name: "ASP"}, {value: "pddl", name: "PDDL"}],
            solvers: [{value: "dlv2", name: "DLV2"}, {value: "dlv", name: "DLV"}, {value: "clingo", name: "Clingo"}],
            executors: [{value: "pythonese", name: "PythonESE"}],
        };
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
                    <RunSettings configData={configData} />
                </SideBar>
                <EditorLayout />
            </div>
        </div>
    );
};

export default App;
