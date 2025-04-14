import '@/app/globals.css'
import ClientComponent from "@/app/appRouter/nestedClientComponent/ClientComponent";

export default async function Page() {
  const res = await fetch(`https://api.github.com/repos/vercel/next.js`, { cache: 'force-cache' })
  const repo = await res.json()

  console.log('Im rendered exclusively on server');

  return (
    <ClientComponent>
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Dynamic content
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Fetched number of stars from GitHub API <code className="font-mono font-bold">{repo.stargazers_count}</code>
      </p>
    </ClientComponent>
  )
}
