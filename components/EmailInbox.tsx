import { Star } from 'lucide-react'
import { Email } from '@/lib/types'

interface EmailInboxProps {
  emails: Email[]
  selectedEmailId: string | null
  onSelectEmail: (emailId: string) => void
}

export default function EmailInbox({
  emails,
  selectedEmailId,
  onSelectEmail,
}: EmailInboxProps) {
  return (
    <div className="bg-card border border-border rounded w-64 flex flex-col overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          INBOX
        </h2>
        <span className="text-xs text-muted-foreground font-mono">
          ({emails.length})
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border">
          {emails.map((email) => {
            const isSelected = selectedEmailId === email.id

            return (
              <button
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                className={`w-full text-left px-4 py-3 transition-colors border-l-4 ${
                  isSelected
                    ? 'bg-secondary border-l-accent'
                    : 'hover:bg-secondary border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {email.from}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {email.subject}
                    </p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="flex-shrink-0 hover:text-accent transition-colors cursor-pointer"
                  >
                    <Star size={14} className="text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  {email.timestamp}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-border px-4 py-2 bg-secondary text-center text-xs text-muted-foreground">
        SENT ({emails.length})
      </div>
    </div>
  )
}
