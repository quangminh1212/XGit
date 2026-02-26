import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: "read:user user:email repo",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.githubId = profile?.id;
                token.githubUsername = profile?.login;
                token.githubAvatar = profile?.avatar_url;
                token.githubBio = profile?.bio;
                token.githubName = profile?.name;
                token.githubLocation = profile?.location;
                token.githubBlog = profile?.blog;
                token.githubCompany = profile?.company;
                token.githubTwitter = profile?.twitter_username;
                token.publicRepos = profile?.public_repos;
                token.followers = profile?.followers;
                token.following = profile?.following;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user.githubId = token.githubId as number;
            session.user.githubUsername = token.githubUsername as string;
            session.user.githubAvatar = token.githubAvatar as string;
            session.user.githubBio = token.githubBio as string;
            session.user.githubName = token.githubName as string;
            session.user.githubLocation = token.githubLocation as string;
            session.user.githubBlog = token.githubBlog as string;
            session.user.githubCompany = token.githubCompany as string;
            session.user.githubTwitter = token.githubTwitter as string;
            session.user.publicRepos = token.publicRepos as number;
            session.user.followers = token.followers as number;
            session.user.following = token.following as number;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
