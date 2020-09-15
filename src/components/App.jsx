import React, { useState } from "react";
import LoideNavbar from "./LoideNavbar";
import RunOptions from "./RunOptions";
import SideBar from "./Sidebar";
import EditorLayout from "./EditorLayout";
import OpenLayout from "./OpenLayout"

const App = (props) => {
    // const socket = io.connect("http://localhost:8084");

    const data =
        '{"language":"asp","engine":"dlv2","executor":"embAspServerExecutor","program":["ciao(1..10)."],"option":[{"name":""}]}';

    const [sidebarShow, setSidebarShow] = useState(true);
    const [openbarShow, setOpenbarShow] = useState(false);

    return (
        <div className="loide-body">
            <div className="loide-header">
                <LoideNavbar sidebar={{toggle: setSidebarShow, show: sidebarShow}} openbar={{toggle: setOpenbarShow, show: openbarShow}}/>
            </div>
            
            <OpenLayout show={openbarShow}></OpenLayout>

            <div className="loide-content">
                <SideBar show={sidebarShow}>
                    <RunOptions />
                </SideBar>
                <EditorLayout />
            </div>
        </div>
    );
};

export default App;
