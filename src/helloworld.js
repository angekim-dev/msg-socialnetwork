// src/helloworld.js
import React from "react";
// import axios from "axios";
import Child from "./child";

export default class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Tupoka",
            last: "Ogette",
        };
    }

    componentDidMount() {
        //componentDidMount is the React equivalent of Vue's mounted method
        // in Vue we would do the following method:
        // axios.get('/images').then(function(resp) {
        //     self.images = resp.data;
        // })
        // the way we'll dp that same thing in React is:
        // first import axios above
        // axios.get("/some-route").then((resp) => {
        //     this.setState({
        //         // this.setState used to update state in React
        //         first: resp.data.first,
        //     });
        // });
        setTimeout(() => {
            this.setState({
                first: "Steven",
            });
        }, 3000);
    }

    handleClick() {
        this.setState({
            first: "Oprah",
        });
    }

    render() {
        return (
            <div>
                Hello, {this.state.first} {this.state.last}!
                <Child surname={this.state.last} />
                <p onClick={() => this.handleClick()}>click me!</p>
            </div>
        );
    }
}

// export default function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
