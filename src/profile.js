import React from "react";
// import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({
    first,
    last,
    imageUrl,
    bio,
    toggleModal,
    saveBio,
}) {
    return (
        <div className="profile-container">
            <h1>
                Welcome to your profile {first} {last}!
            </h1>
            <div className="profile">
                <img
                    src={imageUrl}
                    alt={`${first} ${last}`}
                    onClick={toggleModal}
                />
                <BioEditor bio={bio} saveBio={saveBio} />
            </div>
            <div className="profile-name">
                {first} {last}
            </div>
        </div>
    );
}
