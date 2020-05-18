import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile";
import FindPeople from "./find-people";
import Friends from "./friends";
import Chat from "./chat";
import OnlineUsers from "./online";

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
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    imageUrl: data.image_url,
                    bio: data.bio,
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

    saveBio(arg) {
        console.log("saveBio running! and the argument is: ", arg);
        this.setState({
            bio: arg,
        });
    }

    render() {
        if (!this.state.id) {
            return null;
        } else {
            return (
                <BrowserRouter>
                    <div className="app">
                        <Presentational
                            first={this.state.first}
                            last={this.state.last}
                            // id={this.state.id}
                            imageUrl={this.state.imageUrl}
                            toggleModal={() => this.toggleModal()}
                        />

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    // id={this.state.id}
                                    imageUrl={this.state.imageUrl}
                                    toggleModal={() => this.toggleModal()}
                                    bio={this.state.bio}
                                    saveBio={(arg) => this.saveBio(arg)}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/users"
                            render={() => <FindPeople />}
                        />
                        <Route
                            exact
                            path="/friends"
                            render={() => <Friends />}
                        />
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/online" component={OnlineUsers} />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={(arg) => this.methodInApp(arg)}
                                toggleModal={() => this.toggleModal()}
                            />
                        )}
                    </div>
                </BrowserRouter>
            );
        }
    }
}
