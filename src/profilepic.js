import React from "react";

export default function ProfilePic({ first, last, imageUrl, toggleModal }) {
    imageUrl = imageUrl || "/default.png";

    return (
        <div className="mini-profile-pic-container">
            <img
                className="mini-profile-pic"
                src={imageUrl}
                alt={`${first} ${last}`}
                onClick={toggleModal}
            />
        </div>
    );
}
