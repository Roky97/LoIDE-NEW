import React, { useState } from "react";

const OpenLayout = (props) => {

    return (
        <div className={`upbar ${props.show ? "opened" : "closed"}`}>
            {props.children}
        </div>
    );
};

export default OpenLayout;
