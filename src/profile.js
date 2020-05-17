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
        <div>
            <h1>
                Welcome to your profile {first} {last}.
            </h1>
            {/* <ProfilePic
                first={first}
                last={last}
                imageUrl={imageUrl}
                toggleModal={toggleModal}
            /> */}
            <img
                className="mini-profile-pic"
                src={imageUrl}
                alt={`${first} ${last}`}
                onClick={toggleModal}
            />
            {first} {last}
            <BioEditor bio={bio} saveBio={saveBio} />
        </div>
    );
}
