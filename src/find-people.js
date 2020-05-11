import React, { useState, useEffect } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);

    // const [country, setCountry] = useState("");
    // const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log(`'${user}' has been rendered in useEffect!`);
    }); // acts as ComponentDidMount

    useEffect(() => {
        let abort;
        (async () => {
            const { data } = await axios.get(`/api/users/${user}`);
            console.log("***data: ", data);
            if (!abort) {
                setUser(data.user);
            }
        })();

        return () => {
            abort = true;
        }; // "clean up function" -> runs before every rerender
    }, [user]); // acts as ComponentDidUpdate

    // long version:
    function onChange(e) {
        setUser(e.target.value);
    }

    return (
        <div>
            <p>Hello {user}! We are learning hooks!</p>
            <input onChange={onChange} />
            <ul>
                {users.map((each) => (
                    <li key={each.id}>
                        <ProfilePic
                            first={user.first}
                            last={user.last}
                            imageUrl={user.image_url}
                        />
                        <div>
                            {user.first} {user.last}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
