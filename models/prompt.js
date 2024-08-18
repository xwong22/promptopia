import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
})

// we have to do this check because this route is called multiple times froms scratch due to serverless functions
// if model already exists, use it, otherwise create a new model
const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt