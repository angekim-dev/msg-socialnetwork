import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("/recent-users")
            .then(({ data }) => {
                console.log("data in first axios in find-people-js ", data);
                setUsers(data);
            })
            .catch((err) => {
                console.log("Error in first axios in find-people-js: ", err);
            });
    }, []); // acts as ComponentDidMount

    useEffect(() => {
        let abort;
        if (!user) {
            setUsers([]);
            return;
        }
        (async () => {
            const { data } = await axios.get("/api/users/" + user);
            console.log("***data: ", data);
            if (!abort) {
                // setUser(data.id);
                setUsers(data);
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
        <div className="find-people-container">
            <h2>Checkout who joined recently!</h2>
            <div className="find-people">
                {users.map((each) => (
                    <div key={each.id} className="people">
                        <Link to={`/user/${each.id}`}>
                            <img
                                className="mini-profile-pic"
                                src={each.image_url || "/default.png"}
                            />
                        </Link>
                        <p>
                            {each.first} {each.last}
                        </p>
                    </div>
                ))}
            </div>
            <div className="search">
                <p>Are you looking for someone in particular?</p>
                <input onChange={onChange} placeholder="Enter name" />
            </div>
        </div>
    );
}
