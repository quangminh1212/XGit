"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github, GitBranch, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

    return (
        <div className="min-h-screen animated-bg flex items-center justify-center relative">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

            <div className="container max-w-md relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>

                <div className="glass rounded-2xl p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                            <GitBranch className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Welcome to XGit</h1>
                        <p className="text-zinc-400 text-sm">
                            Sign in with your GitHub account to create your portfolio
                        </p>
                    </div>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full btn-primary justify-center py-3 text-base glow-hover"
                    >
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                    </button>

                    <p className="text-xs text-zinc-500 text-center mt-6">
                        By signing in, you agree to let XGit access your public GitHub
                        profile and repositories to build your portfolio.
                    </p>
                </div>
            </div>
        </div>
    );
}
