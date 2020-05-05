import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("componentDidMount data: ", data);
                this.setState({
                    first: data.first,
                    last: data.last,
                    imageUrl: data.image_url,
                });
            })
            .catch((err) => {
                console.log("Error in componentDidMount in app.js: ", err);
            });
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
        this.setState({
            imageUrl: arg,
        });
    }

    render() {
        return (
            <div>
                <h1>Hello from App</h1>
                <Presentational
                    // becomes props object in Presentational with following key value pairs:
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleModal={() => this.toggleModal()}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader
                        methodInApp={(arg) => this.methodInApp(arg)}
                        toggleModal={() => this.toggleModal()}
                    />
                )}
            </div>
        );
    }
}
