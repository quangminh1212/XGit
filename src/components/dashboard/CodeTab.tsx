"use client";

import { Code2 } from "lucide-react";
import { PortfolioConfig } from "@/types";

interface CodeTabProps {
    config: PortfolioConfig;
    updateConfig: (updates: Partial<PortfolioConfig>) => void;
}

export default function CodeTab({ config, updateConfig }: CodeTabProps) {
    return (
        <div className="space-y-6">
            <div className="card">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    Custom Code Editor
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                    Write custom HTML, CSS, and JavaScript to fully customize your portfolio.
                    This code will be injected into your published portfolio page.
                </p>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Custom CSS
                            </label>
                            <span className="text-xs text-zinc-500">
                                Overrides default styles
                            </span>
                        </div>
                        <textarea
                            className="code-editor"
                            placeholder={`/* Custom CSS */\n.portfolio-hero {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n}\n\n.project-card:hover {\n  transform: scale(1.02);\n  transition: transform 0.3s ease;\n}`}
                            value={config.customCSS}
                            onChange={(e) => updateConfig({ customCSS: e.target.value })}
                            rows={10}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Custom HTML
                            </label>
                            <span className="text-xs text-zinc-500">
                                Injected before closing body tag
                            </span>
                        </div>
                        <textarea
                            className="code-editor"
                            placeholder={`<!-- Custom HTML -->\n<section class="custom-section">\n  <h2>My Custom Section</h2>\n  <p>Add any HTML you want!</p>\n</section>`}
                            value={config.customHTML}
                            onChange={(e) => updateConfig({ customHTML: e.target.value })}
                            rows={10}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Custom JavaScript
                            </label>
                            <span className="text-xs text-zinc-500">
                                Runs after page load
                            </span>
                        </div>
                        <textarea
                            className="code-editor"
                            placeholder={`// Custom JavaScript\nconsole.log('Portfolio loaded!');\n\n// Example: typing effect\nfunction typeWriter(element, text, speed) {\n  let i = 0;\n  function type() {\n    if (i < text.length) {\n      element.textContent += text.charAt(i);\n      i++;\n      setTimeout(type, speed);\n    }\n  }\n  type();\n}`}
                            value={config.customJS}
                            onChange={(e) => updateConfig({ customJS: e.target.value })}
                            rows={10}
                        />
                    </div>
                </div>
            </div>

            {/* Code Helper Snippets */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">Code Snippets</h3>
                <p className="text-sm text-zinc-400 mb-4">
                    Click to copy useful code snippets to your clipboard.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SNIPPETS.map((snippet) => (
                        <button
                            key={snippet.name}
                            onClick={() => {
                                navigator.clipboard.writeText(snippet.code);
                            }}
                            className="p-3 rounded-xl border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-left transition-all group"
                        >
                            <span className="text-sm font-medium block group-hover:text-indigo-400 transition-colors">
                                {snippet.name}
                            </span>
                            <span className="text-xs text-zinc-500">{snippet.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SNIPPETS = [
    {
        name: "Typing Effect",
        desc: "Animated text typing in hero",
        code: `// Add to Custom JS
const el = document.querySelector('.portfolio-hero h1');
if (el) {
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  (function type() {
    if (i < text.length) { el.textContent += text[i++]; setTimeout(type, 80); }
  })();
}`,
    },
    {
        name: "Scroll Reveal",
        desc: "Fade-in sections on scroll",
        code: `// Add to Custom CSS
section { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
section.visible { opacity: 1; transform: translateY(0); }

// Add to Custom JS
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
sections.forEach(s => observer.observe(s));`,
    },
    {
        name: "Dark/Light Toggle",
        desc: "Theme switcher button",
        code: `// Add to Custom HTML
<button id="theme-toggle" style="position:fixed;bottom:20px;right:20px;z-index:999;padding:10px 16px;border-radius:12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;cursor:pointer;font-size:18px">🌙</button>

// Add to Custom JS
const btn = document.getElementById('theme-toggle');
let dark = true;
btn?.addEventListener('click', () => {
  dark = !dark;
  document.body.style.background = dark ? '#0a0a0f' : '#f5f5f5';
  document.body.style.color = dark ? '#e4e4e7' : '#1a1a1a';
  btn.textContent = dark ? '🌙' : '☀️';
});`,
    },
    {
        name: "Custom Cursor",
        desc: "Glowing cursor follower",
        code: `// Add to Custom CSS
.cursor-dot { width: 20px; height: 20px; background: radial-gradient(circle, rgba(99,102,241,0.6), transparent); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transition: transform 0.1s; }

// Add to Custom HTML
<div class="cursor-dot" id="cursor-dot"></div>

// Add to Custom JS
const dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
  if (dot) { dot.style.left = e.clientX - 10 + 'px'; dot.style.top = e.clientY - 10 + 'px'; }
});`,
    },
    {
        name: "Gradient Background",
        desc: "Animated gradient hero",
        code: `/* Add to Custom CSS */
.portfolio-hero {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: hero-gradient 15s ease infinite;
}
@keyframes hero-gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    },
    {
        name: "Counter Animation",
        desc: "Animate stat numbers",
        code: `// Add to Custom JS
function animateNumber(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(start); }
  }, 16);
}
document.querySelectorAll('[data-count]').forEach(el => {
  animateNumber(el, parseInt(el.dataset.count));
});`,
    },
];
