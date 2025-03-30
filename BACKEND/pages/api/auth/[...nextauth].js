import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import {mongooseConnect} from "@/lib/mongodb";


export default NextAuth({
    providers: [
        // OAuth authentication providers...
        CredentialProvider({

            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                const db = await mongooseConnect()
            }

        })

    ]
})