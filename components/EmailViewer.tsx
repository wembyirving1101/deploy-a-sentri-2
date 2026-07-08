'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MoreVertical, FileText } from 'lucide-react'
import { Email } from '@/lib/types'

interface EmailViewerProps {
  email: Email
  onInvestigate: (categoryId: string) => void
  investigatedCategories: Set<string>
}

export default function EmailViewer({
  email,
  onInvestigate,
  investigatedCategories,
}: EmailViewerProps) {
  const [showInvestigationPanel, setShowInvestigationPanel] = useState(true)

  const investigationButtons = [
    { id: 'profile', label: 'PROFILE', icon: '👤' },
    { id: 'link', label: 'LINK', icon: '🔗' },
    { id: 'file', label: 'FILE', icon: '📄' },
    { id: 'language', label: 'LANGUAGE', icon: '💬' },
    { id: 'context', label: 'CONTEXT', icon: '🔍' },
    { id: 'request', label: 'REQUEST', icon: '⚠️' },
  ]

  const handleInvestigate = (categoryId: string) => {
    onInvestigate(categoryId)
  }

  return (
    <div className="flex-1 bg-card border border-border rounded flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
            EMAIL INVESTIGATION
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-secondary rounded transition-colors">
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-secondary rounded transition-colors">
            <MoreVertical size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-secondary px-4 flex gap-4 text-xs font-medium text-muted-foreground">
        <button className="py-3 border-b-2 border-accent text-accent">
          INBOX (5)
        </button>
        <button className="py-3 border-b-2 border-transparent hover:text-foreground">
          SENT
        </button>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-background p-6">
          {/* Email Header */}
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">{email.subject}</h3>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{email.timestamp}</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-12">From:</span>
                <div>
                  <p className="font-medium text-foreground">{email.from}</p>
                  <p className="text-xs text-muted-foreground">{email.senderDomain}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground min-w-12">To:</span>
                <p className="font-medium text-foreground">{email.to}</p>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-card border border-border rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm text-foreground leading-relaxed font-mono text-xs">
            {email.body}
          </div>

          {/* Attachments */}
          {email.attachments.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">
                Attachments
              </h4>
              <div className="space-y-2">
                {email.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-secondary rounded hover:bg-opacity-75 cursor-pointer transition-colors"
                  >
                    <FileText size={16} className="text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{attachment.size} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investigation Buttons */}
      <div className="border-t border-border bg-secondary px-4 py-3">
        <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
          Investigate
        </p>
        <div className="grid grid-cols-3 gap-2">
          {investigationButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleInvestigate(btn.id)}
              disabled={investigatedCategories.has(btn.id)}
              className={`py-2 px-2 rounded text-xs font-bold transition-colors uppercase border ${
                investigatedCategories.has(btn.id)
                  ? 'bg-secondary text-muted-foreground border-border opacity-50 cursor-not-allowed'
                  : 'bg-accent text-accent-foreground border-accent hover:opacity-90'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
