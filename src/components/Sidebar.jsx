import React from "react";
import { Navbar, Nav, Button, ButtonGroup } from "react-bootstrap";

const Sidebar = (props) => {
    return (
    <div className={`sidebar ${props.show ? "opened" : "closed"}`}>
        
        {props.children}

    </div>);
};

export default Sidebar;
