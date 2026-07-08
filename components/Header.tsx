import { Settings, HelpCircle } from 'lucide-react'

interface HeaderProps {
  currentTime: string
  graduationProgress: number
}

export default function Header({ currentTime, graduationProgress }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo and Time */}
        <div className="flex items-center gap-8">
          <h1 className="text-base font-bold tracking-widest text-foreground">
            SENTRI DISPATCH CONSOLE
          </h1>
          <span className="font-mono text-sm text-muted-foreground" suppressHydrationWarning>
            {currentTime}
          </span>
        </div>

        {/* Center: Graduation Progress Bar */}
        <div className="flex-1 mx-8">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="bg-secondary rounded h-6 overflow-hidden border border-border">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${graduationProgress}%` }}
                />
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-accent min-w-12">
              {graduationProgress}%
            </span>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-secondary rounded transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={20} className="text-muted-foreground hover:text-foreground" />
          </button>
          <button
            className="p-2 hover:bg-secondary rounded transition-colors"
            title="Help"
            aria-label="Help"
          >
            <HelpCircle size={20} className="text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
