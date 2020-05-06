import React from "react";
import Presentational from "./presentational";
import BioEditor from "./bioeditor";

export default function Profile({ first, last, imageUrl, bio }) {
    return (
        <div>
            <h1>
                Welcome to your profile {first} {last}.
            </h1>
            <Presentational
            // first={this.state.first}
            // last={this.state.last}
            // imageUrl={this.state.imageUrl}
            // toggleModal={() => this.toggleModal()}
            />
            {/* {first} {last} */}
            <BioEditor bio={bio} />
        </div>
    );
}
