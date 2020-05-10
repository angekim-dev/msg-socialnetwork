import React from "react";
import Presentational from "./presentational";
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
            <Presentational
                first={first}
                last={last}
                imageUrl={imageUrl}
                toggleModal={toggleModal}
            />
            {first} {last}
            <BioEditor bio={bio} saveBio={saveBio} />
        </div>
    );
}
