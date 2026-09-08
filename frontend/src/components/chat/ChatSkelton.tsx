function ChatSkeleton() {
  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden border bg-white">
        {/* Sidebar */}
        <aside className="w-80 border-r p-4">
          <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />

          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </aside>

        {/* Chat */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b p-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

            <div>
              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 p-6">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />

            <div className="ml-auto h-10 w-56 animate-pulse rounded-lg bg-gray-200" />

            <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="ml-auto h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatSkeleton;
