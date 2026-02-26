"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Github,
  ArrowRight,
  Sparkles,
  Palette,
  Code2,
  Globe,
  Zap,
  Shield,
  Star,
  Users,
  GitBranch,
} from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen animated-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">XGit</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              How it works
            </a>
            <button
              onClick={() => signIn("github")}
              className="btn-primary text-sm py-2 px-4"
            >
              <Github className="w-4 h-4" />
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-zinc-300">
                Transform your GitHub into a stunning portfolio
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your GitHub.
              <br />
              <span className="gradient-text">Your Portfolio.</span>
              <br />
              Your Rules.
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Login with GitHub, and we&apos;ll create a beautiful portfolio from
              your repos, contributions, and profile. Customize everything — from
              themes to custom code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => signIn("github")}
                className="btn-primary text-base py-3 px-8 glow-hover"
              >
                <Github className="w-5 h-5" />
                Get Started with GitHub
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="btn-secondary text-base py-3 px-8"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-12 mt-16">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-zinc-500">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">∞</div>
                <div className="text-sm text-zinc-500">Customizable</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10+</div>
                <div className="text-sm text-zinc-500">Languages</div>
              </div>
            </div>
          </div>

          {/* Preview mockup */}
          <div className="max-w-5xl mx-auto mt-20">
            <div className="gradient-border">
              <div className="bg-zinc-900/90 rounded-2xl p-1">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-zinc-800 rounded-md px-4 py-1 text-xs text-zinc-500 flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      xgit.dev/username
                    </div>
                  </div>
                </div>
                {/* Portfolio preview */}
                <div className="p-8 sm:p-12 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">John Developer</h3>
                      <p className="text-zinc-400">Full-Stack Engineer • Open Source Enthusiast</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["React", "TypeScript", "Node.js", "Python"].map((tech) => (
                      <div key={tech} className="glass rounded-lg p-3 text-center text-sm text-zinc-300">
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="glass rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">awesome-project-{i}</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${70 + i * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">stand out</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Build a portfolio that reflects who you are as a developer.
              No templates, no limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Github className="w-6 h-6" />,
                title: "GitHub Integration",
                description:
                  "Auto-import your repos, contributions, languages, and profile data. Always up-to-date.",
                color: "from-indigo-500/20 to-indigo-500/0",
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "6 Stunning Themes",
                description:
                  "Choose from Midnight, Aurora, Sunset, Ocean, Forest, or go fully custom with your own CSS.",
                color: "from-purple-500/20 to-purple-500/0",
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: "Custom Code Editor",
                description:
                  "Write custom HTML, CSS, and JavaScript. Full control over your portfolio's look and behavior.",
                color: "from-pink-500/20 to-pink-500/0",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Multi-Language",
                description:
                  "Support for 10+ languages including English, Vietnamese, Japanese, Korean, Chinese, and more.",
                color: "from-cyan-500/20 to-cyan-500/0",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Deploy",
                description:
                  "One click to publish. Your portfolio goes live immediately at your unique URL.",
                color: "from-yellow-500/20 to-yellow-500/0",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "SEO Optimized",
                description:
                  "Built-in meta tags, OG images, and structured data. Be found by recruiters.",
                color: "from-green-500/20 to-green-500/0",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 dot-pattern" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three steps to your{" "}
              <span className="gradient-text">dream portfolio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Sign in with GitHub",
                desc: "One click authentication. We securely access your public repos and profile.",
              },
              {
                step: "02",
                title: "Customize everything",
                desc: "Choose themes, select projects, write custom code, and configure every detail.",
              },
              {
                step: "03",
                title: "Publish & share",
                desc: "Your portfolio goes live instantly. Share it with recruiters, clients, and the world.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold gradient-text">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to build your portfolio?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                Join developers who showcase their work beautifully.
                It&apos;s free, fast, and fully customizable.
              </p>
              <button
                onClick={() => signIn("github")}
                className="btn-primary text-base py-3 px-8 glow-hover"
              >
                <Github className="w-5 h-5" />
                Start Building Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GitBranch className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold gradient-text">XGit</span>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} XGit. Built with ❤️ for developers.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
