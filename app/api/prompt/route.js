import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req) => {
    console.log("GET request to /api/prompt")

    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        // return new Response(JSON.stringify(prompts), {status: 200})

        const response = new Response(JSON.stringify(prompts), {status: 200})

        //  add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());
        return response
    } catch (error) {
        return new Response(`Failed to fetch all prompts ${error}`, {status: 500})
    }
}