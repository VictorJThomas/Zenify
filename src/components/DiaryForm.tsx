"use client"

import { useState } from "react"
import { DiaryContext } from "@/context/DiaryContext"

async function DiaryForm() {

    const [image, setImage] = useState("");
    const [content, setContent] = useState("");


    return (
        <form
            onSubmit={ async (e) => {
                e.preventDefault();

                setImage("");
                setContent("");
            }}
        >
            <input
                type="text"
                name="title"
                autoFocus
                placeholder="Title"
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />

            <textarea
                name="title"
                placeholder="Content"
                className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            ></textarea>
        </form>
    )
}

export default DiaryForm