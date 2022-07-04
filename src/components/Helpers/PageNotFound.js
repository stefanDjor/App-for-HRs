import React from "react";
import "../helpers/Helpers.css";
import HeaderLog from "../layout/HeaderLog";

function PageNotFound() {

    return (
        <>
            <HeaderLog />
            <div className="not-found">Page not found!</div>
        </>
    )
}

export default PageNotFound