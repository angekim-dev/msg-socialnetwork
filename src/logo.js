import React from "react";

export default class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                {/* <p>This is the logo component</p> */}
                <img src="/WIR.jpeg" className="logo" />
            </div>
        );
    }
}
