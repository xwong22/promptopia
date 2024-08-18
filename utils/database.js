import mongoose from 'mongoose'

let isConnected = false // track db connection status

export const connectToDB = async () => {
    // sets mongoose options
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            // deprecated options
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        isConnected = true
        console.log('MongoDB connection success')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
}