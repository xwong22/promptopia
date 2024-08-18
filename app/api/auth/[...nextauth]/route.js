import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import User from "@models/user"
import { connectToDB } from "@utils/database"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            // to make sure we know which user is logged in
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString()

            return session
        },
        async signIn({ profile }) {
            try {
                // every next.js route is a serverless function
                // lambda function that only runs when called
                // so we can use the database here
                await connectToDB()

                // check if user exists
                const userExists = await User.findOne({
                    email: profile.email
                })

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message)
                return false
            }
        }
    },
})

// for next authentication handler is exported as both
// not what usually done
export { handler as GET, handler as POST }