import React from "react";

// for rendering profile pic
// doesn't need to be a class

// pass props as argument to access to the info being passed down from parent (App)
export default function Presentational({ first, last, imageUrl, toggleModal }) {
    // console.log("props in Presentational: ", props);
    imageUrl = imageUrl || "./default.png";

    return (
        <div>
            <img
                className="mini-profile-pic"
                src={imageUrl}
                alt={first + " " + last}
                onClick={toggleModal}
            />
        </div>
    );
}
