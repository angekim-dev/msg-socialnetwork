import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

// automatic mock
jest.mock("./axios");

test("App shows nothing first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "name",
            last: "sirname",
            image_url: "/default.png",
        },
    });

    const { container } = render(<App />);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});
