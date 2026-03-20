export default function Home() {
  return (
    <div className="h-full w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Get started with your workspace</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">
              Create and manage your boards
            </p>
          </div>
          
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Recent</h2>
            <p className="text-sm text-muted-foreground">
              View your recent activity
            </p>
          </div>
          
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Favorites</h2>
            <p className="text-sm text-muted-foreground">
              Access your starred items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
