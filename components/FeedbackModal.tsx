import { CheckCircle, XCircle } from 'lucide-react'
import { Email } from '@/lib/types'

interface FeedbackModalProps {
  email: Email
  userDecision: 'legitimate' | 'phishing'
  onContinue: () => void
}

export default function FeedbackModal({
  email,
  userDecision,
  onContinue,
}: FeedbackModalProps) {
  const isCorrect = (userDecision === 'phishing' && !email.isLegitimate) ||
                    (userDecision === 'legitimate' && email.isLegitimate)

  const correctAnswer = email.isLegitimate ? 'legitimate' : 'phishing'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className={`bg-card border-2 rounded-lg shadow-2xl w-full max-w-md flex flex-col overflow-hidden ${
        isCorrect ? 'border-green-500' : 'border-destructive'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-center gap-3 ${
          isCorrect ? 'bg-green-900 bg-opacity-20' : 'bg-destructive bg-opacity-20'
        }`}>
          {isCorrect ? (
            <>
              <CheckCircle size={28} className="text-green-500" />
              <h2 className="text-xl font-bold text-green-400 uppercase tracking-wide">
                Correct!
              </h2>
            </>
          ) : (
            <>
              <XCircle size={28} className="text-destructive" />
              <h2 className="text-xl font-bold text-destructive uppercase tracking-wide">
                Incorrect
              </h2>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Your Decision */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">
              Your Decision
            </label>
            <div className={`p-3 rounded border-l-4 ${
              isCorrect 
                ? 'bg-green-900 bg-opacity-20 border-green-500'
                : 'bg-destructive bg-opacity-20 border-destructive'
            }`}>
              <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                {userDecision === 'phishing' ? '🚩 Phishing' : '✓ Legitimate'}
              </p>
            </div>
          </div>

          {/* Correct Answer (if wrong) */}
          {!isCorrect && (
            <div>
              <label className="text-xs font-bold text-green-400 uppercase block mb-2">
                Correct Answer
              </label>
              <div className="p-3 rounded border-l-4 bg-green-900 bg-opacity-20 border-green-500">
                <p className="text-sm font-bold uppercase tracking-wide text-green-400">
                  {correctAnswer === 'phishing' ? '🚩 Phishing' : '✓ Legitimate'}
                </p>
              </div>
            </div>
          )}

          {/* Email Details */}
          <div className="border-t border-border pt-4 space-y-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                From
              </label>
              <p className="text-sm text-foreground font-medium">{email.from}</p>
              <p className="text-xs text-muted-foreground">{email.senderDomain}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                Subject
              </label>
              <p className="text-sm text-foreground">{email.subject}</p>
            </div>
          </div>

          {/* Key Indicators */}
          {!isCorrect && (
            <div className="border-t border-border pt-4">
              <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">
                Red Flags
              </label>
              <ul className="space-y-1 text-xs">
                {email.redFlags && email.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-muted-foreground flex gap-2">
                    <span className="text-destructive">▸</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="border-t border-border px-6 py-4 bg-secondary">
          <button
            onClick={onContinue}
            className="w-full py-3 px-4 bg-accent text-accent-foreground font-bold text-sm rounded uppercase hover:opacity-90 transition-opacity"
          >
            Continue to Next Case
          </button>
        </div>
      </div>
    </div>
  )
}
