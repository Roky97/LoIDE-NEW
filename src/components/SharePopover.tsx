import React from "react";
import { Popover } from "react-bootstrap";

const SharePopover = (props: any) => {
    return (
        <Popover {...props}>
            <Popover.Title as="h3">Share</Popover.Title>
            <Popover.Content>
                And here's some <strong>amazing</strong> content. It's very
                engaging. right?
            </Popover.Content>
        </Popover>
    );
};

export default SharePopover;
