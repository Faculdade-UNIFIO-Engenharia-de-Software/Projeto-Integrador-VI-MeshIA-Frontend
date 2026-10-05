export default function LayoutPublic({ children }:Readonly <{ children: React.ReactNode }>) {
  return (
      <main className="flex flex-col flex-1 gap-2 p-2">
        {children}
      </main>
  )
}
