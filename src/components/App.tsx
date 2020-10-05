import React, { useEffect, useState } from "react";
import RunSettings from "./RunSettings";
import LoideNavbar from "./LoideNavbar";
import SideBar from "./Sidebar";
import EditorLayout from "./EditorLayout";
import OpenLayout from "./OpenLayout";
import { LanguagesDataStore } from "../lib/store";
import { useIsMobile } from "../hooks/useIsMobile";
import { getLanguages } from "../lib/api";
import { Slide, ToastContainer } from "react-toastify";

const App: React.FC = () => {
    const isMobile = useIsMobile();
    const [sidebarShow, setSidebarShow] = useState(true);
    const [openbarShow, setOpenbarShow] = useState(false);

    const languages = LanguagesDataStore.useState((l) => l.languages);

    useEffect(() => {
        if (isMobile) setSidebarShow(false);
    }, [isMobile]);

    useEffect(() => {
        getLanguages((output) => {
            LanguagesDataStore.update((l) => {
                l.languages = output;
            });
        });
    }, []);

    return (
        <div className="loide-body">
            <div className="loide-header mb-1">
                <LoideNavbar
                    sidebar={{ toggle: setSidebarShow, show: sidebarShow }}
                    topbar={{ toggle: setOpenbarShow, show: openbarShow }}
                />
            </div>

            <OpenLayout show={openbarShow}></OpenLayout>

            <div className="loide-content">
                <SideBar show={sidebarShow}>
                    <RunSettings languages={languages} />
                </SideBar>

                <EditorLayout />
            </div>
            <ToastContainer
                limit={5}
                transition={Slide}
                draggablePercent={50}
            />
        </div>
    );
};

export default App;
