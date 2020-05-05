import React from "react";
import Logo from "./logo";

// for rendering profile pic
// doesn't need to be a class

// pass props as argument to access to the info being passed down from parent (App)
export default function Presentational({ first, last, imageUrl, toggleModal }) {
    // console.log("props in Presentational: ", props);
    imageUrl = imageUrl || "./default.png";

    return (
        <div>
            <Logo />
            <h1>
                Welcome to your profile {first} {last}.
            </h1>
            <img
                src={imageUrl}
                alt={first + " " + last}
                className="pic"
                onClick={toggleModal}
            />
        </div>
    );
}
