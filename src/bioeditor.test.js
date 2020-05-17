import React from "react";
import BioEditor from "./bioeditor";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "./axios";

// automatic mock
jest.mock("./axios");

test("When no bio is passed to it, an ADD button is rendered.", () => {
    const { container } = render(<BioEditor bio="" />);
    expect(container.querySelector("button").getAttribute("id")).toBe("add");
});

test("When a bio is passed to it, an EDIT button is rendered.", () => {
    const { container } = render(
        <BioEditor bio="I don't think you can handle this" />
    );
    expect(container.querySelector("button").getAttribute("id")).toBe("edit");
});

test("Clicking either the ADD or EDIT button causes a textarea and a SAVE button to be rendered.", () => {
    const { container } = render(<BioEditor />);
    fireEvent.click(container.querySelector("button"));
    expect(container.getElementsByTagName("textarea").length).toBe(1);
    expect(container.querySelector("button").getAttribute("id")).toBe("save");
});

// test("Clicking the SAVE button causes an ajax request.", () => {
//     // const bio = "I am BIO";
//     // axios.post.mockResolvedValue({
//     //     unsavedBio: bio,
//     // });

//     const myMockOnClick = jest.fn();

//     const { container } = render(<BioEditor onClick={myMockOnClick} />);

//     fireEvent.click(container.querySelector("button"));

//     expect(myMockOnClick.mock.calls.length).toBe(1);
// });

// test("When the mock request is successful, the function that was passed as a prop to the component gets called.", () => {});
