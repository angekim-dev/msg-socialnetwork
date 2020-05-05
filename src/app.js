import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Angelika",
            last: "Kim",
            // hardcoded for now, normally info coming from axios request from databank
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App mounted");

        // here make an axios request to 'get' info about logged in user (first name, last name and profilePicUrl / imageUrl)
        // an axios route '/user' is a good path for it
        // when we finally have the info from the server, you will want to add it to the state of component (i.e. with setState)
    }

    toggleModal() {
        console.log("toggleModal is running");

        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("methodInApp running! and the argument is:", arg);
        // imageUrl
    }

    render() {
        return (
            <div>
                <h1>Hello from App</h1>
                <h2 onClick={() => this.toggleModal()}>
                    Changing uploaderIsVisible state with a method!
                </h2>
                <Presentational
                    // becomes props object in Presentational with following key value pairs:
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
