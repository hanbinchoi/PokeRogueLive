export default function Pokemon({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-10">
      {children}
    </main>
  );
}
