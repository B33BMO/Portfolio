'use client'
import React, { useEffect, useState } from "react"

// --- Glass Panel Component ---
const GlassPanel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 my-6 ${className}`}>
    {children}
  </div>
)

// --- Video Background Component ---
const VideoBackground = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className="fixed inset-0 w-full h-full object-cover z-0"
    src="/bg.mp4"
  />
)

// --- About Section ---
const About = () => (
  <GlassPanel>
    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow">Hey, I&apos;m <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text">Bmo</span></h1>
    <p className="opacity-90 text-lg max-w-2xl">
      Cybersecurity enthusiast, tech nerd, wannabe programmer and much more.<br/>
      <span className="opacity-60 text-base">Welcome to my lair on the Internet.</span>
    </p>
  </GlassPanel>
)


useEffect(() => {
  fetch("https://your-server.com:5050/track", {
    method: "POST",
  });
}, []);

type Repo = {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  language: string
  fork: boolean
}



const useGitHubRepos = (username: string) => {
  const [repos, setRepos] = useState<Repo[]>([])
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data)
      })
  }, [username])
  return repos
}

const Projects = () => {
  const repos = useGitHubRepos("b33bmo")
  return (
    <GlassPanel>
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.length === 0 && (
          <div className="opacity-60">Loading from GitHub...</div>
        )}
        {repos
          .filter(r => !r.fork)
          .slice(0, 6)
          .map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white/20 hover:bg-white/40 transition p-4 rounded-xl shadow border border-white/10"
          >
            <div className="font-semibold text-xl mb-1 flex items-center gap-2">
              <span>{repo.name}</span>
              {repo.stargazers_count > 0 && (
                <span className="ml-2 text-yellow-400 text-base">★ {repo.stargazers_count}</span>
              )}
            </div>
            <div className="opacity-70 text-sm mb-1">{repo.description || <em>No description</em>}</div>
            {repo.language && <span className="opacity-50 text-xs">{repo.language}</span>}
          </a>
        ))}
      </div>
    </GlassPanel>
  )
}

// --- Social Links Section ---
const socials = [
  {
    name: "GitHub",
    url: "https://github.com/b33bmo",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
  <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.285 3.438 9.773 8.207 11.387.6.11.793-.26.793-.577 
  0-.285-.01-1.04-.016-2.042-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 
  1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.763-1.606-2.665-.305-5.467-1.334-5.467-5.932 
  0-1.31.469-2.381 1.235-3.221-.124-.303-.535-1.527.117-3.182 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 
  1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.655.242 2.879.119 3.182.77.84 1.233 1.911 
  1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.104.814 2.226 0 1.606-.015 2.898-.015 3.293 0 .319.192.694.801.576C20.565 
  22.066 24 17.578 24 12.297c0-6.627-5.373-12-12-12z"/>
</svg>

    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/brandon-bischoff-b58a982a9/",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-11.6 19.7H3.1v-9h4.3v9zm-2.1-10.4C3.1 8.8 2.2 7.8 2.2 6.7c0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1-.1 1.1-1 2.1-2.1 2.1zm15.4 10.4h-4.3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.6h-4.3v-9h4.1v1.2h.1c.6-1.1 2-2.2 4.1-2.2 4.3 0 5.1 2.8 5.1 6.3v5.7z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    url: "https://www.discord.com/users/b33bmo",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1048c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.8732.8924.0766.0766 0 0 0-.0406.1047c.3604.698.7719 1.3628 1.225 1.9933a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6601a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1835 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.9555 2.419-2.1569 2.419Zm7.9748 0c-1.1836 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.946 2.419-2.1568 2.419Z"/>
      </svg>
    ),
  },
]


const SocialLinks = () => (
  <GlassPanel className="flex flex-row justify-center gap-6">
    {socials.map((s) => (
      <a
        key={s.name}
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-lg font-medium hover:underline hover:scale-105 transition"
      >
        {s.icon}
        {s.name}
      </a>
    ))}
  </GlassPanel>
)

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Video BG */}
      <VideoBackground />
      {/* Overlay */}
      <div className="relative z-10 w-full max-w-2xl mx-auto py-16">
        <About />
        <Projects />
        <SocialLinks />
      </div>
      {/* Glassy dark overlay to help readability */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-[1]" />
    </div>
  )
}
