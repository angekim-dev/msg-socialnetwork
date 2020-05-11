import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Hello() {
    const [first, setFirst] = useState("Andrea");
    // equivalent of:
    // this.state({
    //     first: "Andrea",
    // });
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log(`'${first}' has been rendered in useEffect!`);
    }); // acts as ComponentDidMount

    useEffect(() => {
        axios
            .get(`http://flame-egg.glitch.me/?q=${country}`)
            .then(({ data }) => {
                // console.log("data from flame egg: ", data);
                setCountries(data);
            });

        return () => {
            console.log(`about to replace ${country} with a new value`);
        };
    }, [country]); // acts as ComponentDidUpdate

    // long version:
    // function onChange(e) {
    //     setFirst(e.target.value);
    // }

    return (
        <div>
            <p>Hello {first}! We are learning hooks!</p>
            <input onChange={(e) => setFirst(e.target.value)} />
            {/* <input onChange={onChange} /> */}
            <input onChange={(e) => setCountry(e.target.value)} />
            <ul>
                {countries.map((each) => (
                    <li key={each}>{each}</li>
                ))}
            </ul>
        </div>
    );
}
