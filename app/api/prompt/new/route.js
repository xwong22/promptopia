import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDB()

        // method 1
        // await Prompt.create({
        //     creator: userId,
        //     prompt: prompt,
        //     tag: tag
        // })

        // method 2
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500})
    }
}