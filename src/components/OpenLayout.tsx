import React from "react";

interface OpenLayoutProps {
    show: boolean;
}

const OpenLayout: React.FC<OpenLayoutProps> = (props) => {
    return (
        <div className={`topbar ${props.show ? "opened" : "closed"}`}>
            {props.children}
        </div>
    );
};

export default OpenLayout;
