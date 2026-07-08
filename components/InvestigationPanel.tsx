import { AlertTriangle } from 'lucide-react'
import { InvestigationCategory } from '@/lib/types'

interface InvestigationPanelProps {
  investigationList: InvestigationCategory[]
  onMakeDecision: () => void
  onCheckboxChange?: (categoryId: string) => void
  onVerify?: () => void
}

export default function InvestigationPanel({
  investigationList,
  onMakeDecision,
  onCheckboxChange,
  onVerify,
}: InvestigationPanelProps) {
  const checkedCount = investigationList.filter((item) => item.checked).length

  return (
    <div className="bg-card border border-border rounded w-80 flex flex-col overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={16} className="text-destructive" />
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            INVESTIGATION LIST
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {checkedCount}/{investigationList.length} analyzed
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {investigationList.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-3 bg-secondary rounded hover:bg-opacity-75 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onCheckboxChange?.(item.id)}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              {item.hasEvidence && (
                <p className="text-xs text-accent">Evidence collected</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Contact People Button */}
      {onVerify && (
        <div className="border-t border-border px-4 py-3">
          <button
            onClick={onVerify}
            className="w-full py-2 px-3 rounded font-bold text-xs uppercase tracking-wide transition-colors bg-primary text-primary-foreground hover:opacity-90 mb-3"
          >
            Contact People
          </button>
        </div>
      )}

      {/* Evidence Collected Section */}
      <div className="border-t border-border px-4 py-3 bg-secondary">
        <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
          Evidence Collected
        </p>
        <p className="text-xs text-foreground mb-3">
          Review the clues you've found to build your case.
        </p>
      </div>

      {/* Make Decision Button */}
      <div className="border-t border-border px-4 py-3">
        <button
          onClick={onMakeDecision}
          className="w-full py-3 rounded font-bold text-sm uppercase tracking-wide transition-colors bg-accent text-accent-foreground hover:opacity-90"
        >
          Make a Decision
        </button>
      </div>
    </div>
  )
}
