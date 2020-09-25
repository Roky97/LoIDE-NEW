import React from "react";

interface SidebarProps {
    show: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
    <div className={`sidebar ${props.show ? "opened" : "closed"}`}>
        {props.children}
    </div>);
};

export default Sidebar;
