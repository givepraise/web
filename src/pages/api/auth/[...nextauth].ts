import DiscordProvider from 'next-auth/providers/discord'
import NextAuth from 'next-auth'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string
const NEXT_PUBLIC_DISCORD_CLIENT_ID = process.env
  .NEXT_PUBLIC_DISCORD_CLIENT_ID as string
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ['identify', 'guilds'].join(' ')

export default NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: NEXT_PUBLIC_DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: scopes } },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
})
