import DiscordProvider from 'next-auth/providers/discord'
import NextAuth from 'next-auth'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ['identify', 'guilds'].join(' ')

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: '993566544279896114',
      clientSecret: 'Q0Z25vsGWid8F4UaZx9YoW3QcwR4akOI',
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
