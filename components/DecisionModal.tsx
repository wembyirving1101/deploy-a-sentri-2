import { X } from 'lucide-react'
import { Email } from '@/lib/types'

interface DecisionModalProps {
  email: Email
  onDecide: (decision: 'legitimate' | 'phishing') => void
  onClose: () => void
}

export default function DecisionModal({
  email,
  onDecide,
  onClose,
}: DecisionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg shadow-2xl w-full max-w-md max-h-96 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-accent px-6 py-4 flex items-center justify-between bg-secondary">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
            Make Your Decision
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-border rounded transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">
              From
            </label>
            <p className="text-sm text-foreground font-medium">{email.from}</p>
            <p className="text-xs text-muted-foreground">{email.senderDomain}</p>
          </div>

          <div className="border-t border-border pt-4">
            <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">
              Subject
            </label>
            <p className="text-sm text-foreground">{email.subject}</p>
          </div>

          <div className="border-t border-border pt-4">
            <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">
              Your Determination
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              Based on your investigation, is this email legitimate or phishing?
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border px-6 py-4 bg-secondary flex gap-3">
          <button
            onClick={() => onDecide('phishing')}
            className="flex-1 py-3 px-4 bg-destructive text-white font-bold text-sm rounded uppercase hover:opacity-90 transition-opacity"
          >
            Phishing
          </button>
          <button
            onClick={() => onDecide('legitimate')}
            className="flex-1 py-3 px-4 bg-accent text-accent-foreground font-bold text-sm rounded uppercase hover:opacity-90 transition-opacity"
          >
            Legitimate
          </button>
        </div>
      </div>
    </div>
  )
}
