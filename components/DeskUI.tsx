'use client'

import { useState } from 'react'
import { BookOpen, MessageSquare, FileText, Coffee, LogOut } from 'lucide-react'

interface DeskUIProps {
  progressPercentage: number
  onEndDay?: () => void
  tasksCompleted?: number
  onShowQueue?: () => void
}

export default function DeskUI({ progressPercentage, onEndDay, tasksCompleted = 0, onShowQueue }: DeskUIProps) {
  const [showHandbookModal, setShowHandbookModal] = useState(false)
  const [showMessagesModal, setShowMessagesModal] = useState(false)

  return (
    <>
      {/* Persistent Desk UI */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#2a2a2a] to-[#1f1f1f] border-t border-[#444444] px-6 py-4 flex items-end justify-between gap-6">
        {/* Left: Employee Handbook */}
        <div className="flex gap-4">
          {/* Handbook */}
          <button
            onClick={() => setShowHandbookModal(true)}
            className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-16 h-20 bg-[#c9a96e] rounded-sm border-2 border-[#8b7355] shadow-lg hover:shadow-xl transition-shadow">
              {/* Handbook spine details */}
              <div className="absolute inset-0 p-2 flex flex-col items-center justify-center">
                <div className="text-[10px] font-bold text-[#5d4e37] text-center leading-tight ui-font">
                  EMPLOYEE
                </div>
                <div className="text-[9px] text-[#5d4e37] mt-1 ui-font">
                  HANDBOOK
                </div>
                <div className="mt-2 text-[20px]">📗</div>
              </div>
            </div>
            <span className="text-[11px] text-muted-foreground ui-font whitespace-nowrap">
              HANDBOOK
            </span>
          </button>

          {/* Company Password Policy Card */}
          <div className="w-56 h-28 bg-[#2a2a2a] border border-[#444444] rounded-sm p-3 shadow-lg flex flex-col justify-between overflow-hidden">
            <div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2 ui-font">
                Company Password Policy
              </div>
              <div className="text-[8px] text-muted-foreground space-y-0.5 ui-font">
                <p className="line-clamp-1">
                  <span className="text-primary">▸</span> Strong passwords are the first line of defense.
                </p>
                <p className="line-clamp-1">
                  <span className="text-primary">▸</span> Never approve weak or reused passwords.
                </p>
              </div>
            </div>
            <button className="text-[10px] text-primary hover:underline ui-font uppercase tracking-wider text-left">
              VIEW POLICY
            </button>
          </div>
        </div>

        {/* Center: Messages and Notes */}
        <div className="flex gap-4">
          {/* Messages */}
          <button
            onClick={() => setShowMessagesModal(true)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 bg-[#333333] border border-[#444444] rounded hover:bg-[#3a3a3a] transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] ui-font uppercase">Messages</span>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold">
              2
            </span>
          </button>

          {/* Queue */}
          <button
            onClick={onShowQueue}
            className="relative flex flex-col items-center gap-1 px-4 py-2 bg-[#333333] border border-[#444444] rounded hover:bg-[#3a3a3a] transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] ui-font uppercase">Queue</span>
          </button>
        </div>

        {/* Right: Coffee Mug and End Day */}
        <div className="flex gap-6 items-center">
          {/* Coffee Mug */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl">☕</div>
            <span className="text-[9px] text-muted-foreground ui-font text-center">
              KAFKUNG<br />IND.
            </span>
          </div>

          {/* End Day Button */}
          <button 
            onClick={onEndDay}
            className="flex flex-col items-center gap-2 px-6 py-2 bg-gradient-to-b from-[#c9a96e] to-[#b8956e] text-[#2a2a2a] rounded hover:from-[#d4b896] hover:to-[#c9a96e] transition-all font-bold shadow-lg hover:shadow-xl border border-[#8b7355]"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] ui-font uppercase tracking-wider">End Day</span>
            <span className="text-[9px] ui-font text-opacity-80">
              {tasksCompleted}/4 TASKS
            </span>
          </button>
        </div>
      </div>

      {/* Modals (placeholders for now) */}
      {showHandbookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Employee Handbook</h2>
              <button
                onClick={() => setShowHandbookModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                <strong>Company Policies:</strong> Review all company policies and security guidelines.
              </p>
              <p>
                <strong>Password Security:</strong> Maintain strong password standards across the organization.
              </p>
              <p>
                <strong>Email Safety:</strong> Always verify sender identity and be cautious with suspicious emails.
              </p>
              <p>
                <strong>Data Protection:</strong> Handle all data according to classification levels and compliance requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {showMessagesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Messages</h2>
              <button
                onClick={() => setShowMessagesModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/50 rounded border border-border">
                <p className="text-sm font-semibold">Security Alert</p>
                <p className="text-sm text-muted-foreground mt-1">
                  New suspicious activity detected in today&apos;s email batch.
                </p>
              </div>
              <div className="p-3 bg-secondary/50 rounded border border-border">
                <p className="text-sm font-semibold">Task Update</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You have 1 more password strength assessment to complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  )
}
