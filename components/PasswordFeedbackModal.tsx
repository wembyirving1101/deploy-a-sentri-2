'use client'

import { Password } from '@/lib/types'
import { Check, X } from 'lucide-react'

interface PasswordFeedbackModalProps {
  password: Password
  userDecision: 'approve' | 'revision' | 'reject'
  onContinue: () => void
}

export default function PasswordFeedbackModal({
  password,
  userDecision,
  onContinue,
}: PasswordFeedbackModalProps) {
  const isCorrect = userDecision === password.correctDecision

  const getCorrectDecisionLabel = () => {
    switch (password.correctDecision) {
      case 'approve':
        return 'APPROVE'
      case 'revision':
        return 'REQUIRE REVISION'
      case 'reject':
        return 'REJECT'
    }
  }

  const getUserDecisionLabel = () => {
    switch (userDecision) {
      case 'approve':
        return 'APPROVE'
      case 'revision':
        return 'REQUIRE REVISION'
      case 'reject':
        return 'REJECT'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`w-full max-w-2xl mx-4 rounded border-2 overflow-hidden bg-card ${
        isCorrect ? 'border-green-600' : 'border-red-600'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-center gap-3 ${
          isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'
        }`}>
          {isCorrect ? (
            <>
              <Check size={28} className="text-green-500" />
              <h2 className="text-2xl font-bold tracking-widest text-foreground">CORRECT!</h2>
            </>
          ) : (
            <>
              <X size={28} className="text-red-500" />
              <h2 className="text-2xl font-bold tracking-widest text-foreground">INCORRECT</h2>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Employee and Password Info */}
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground uppercase text-xs font-bold">Employee</p>
              <p className="text-foreground font-bold mt-1">{password.employee} • {password.department}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase text-xs font-bold">Submitted Password</p>
              <p className="text-foreground font-mono font-bold mt-1 tracking-wider">{password.submitted}</p>
            </div>
          </div>

          {/* Decision Section */}
          <div className="space-y-3">
            <div className={`p-4 rounded border-2 ${
              isCorrect ? 'bg-green-900/30 border-green-600' : 'bg-red-900/30 border-red-600'
            }`}>
              <p className="text-muted-foreground uppercase text-xs font-bold mb-2">Your Decision</p>
              <p className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓' : '✗'} {getUserDecisionLabel()}
              </p>
            </div>

            {!isCorrect && (
              <div className="p-4 rounded border-2 bg-green-900/30 border-green-600">
                <p className="text-muted-foreground uppercase text-xs font-bold mb-2">Correct Answer</p>
                <p className="font-bold text-lg text-green-400">✓ {getCorrectDecisionLabel()}</p>
              </div>
            )}
          </div>

          {/* Password Analysis */}
          <div className="space-y-3">
            <p className="text-muted-foreground uppercase text-xs font-bold">Analysis</p>
            <div className="bg-secondary rounded p-3 space-y-2 text-sm">
              {password.characteristics.map((char) => (
                <div key={char.id} className="flex items-start gap-3">
                  {char.present ? (
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                  ) : (
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                  )}
                  <div>
                    <p className="font-bold text-foreground">{char.label}</p>
                    <p className="text-muted-foreground text-xs">{char.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex justify-center">
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-accent hover:opacity-90 text-accent-foreground font-bold rounded transition-colors"
          >
            Continue to Next Case
          </button>
        </div>
      </div>
    </div>
  )
}
