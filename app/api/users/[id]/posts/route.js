import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, {params}) => {
    console.log("GET request to /api/prompt")

    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        console.log("Failed to fetch all prompts for user", error)
        return new Response("Failed to fetch all prompts for user", {status: 500})
    }
}