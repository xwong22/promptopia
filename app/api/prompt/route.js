import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user"
import { NextResponse } from "next/server"

// to ensure that Next.JS renders the route dynamically
export const dynamic = 'force-dynamic'
export const GET = async (req) => {
    console.log("GET request to /api/prompt")

    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        console.log("prompts", prompts)

        return new Response(JSON.stringify(prompts), {status: 200})

        // const response = new Response(JSON.stringify(prompts), {status: 200})

        // //  add a unique identifier to the URL to force a cache-busting reload
        // const url = new URL(request.url);
        // url.searchParams.set("t", Date.now());
        // response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        // response.headers.set("Pragma", "no-cache");
        // response.headers.set("Expires", "0");
        // response.headers.set("Location", url.toString());
        // return response
    } catch (error) {
        console.log(error)
        // Send a 500 response with a custom message
        // return res.status(500).json({ message: "Failed to fetch all prompts" })
        // return NextResponse.json({ message: "Failed to fetch all prompts" }, { status: 500 })
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}