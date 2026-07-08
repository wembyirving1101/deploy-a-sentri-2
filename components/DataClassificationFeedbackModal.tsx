'use client'

import { DataClassification } from '@/lib/types'
import { Check, X, Globe, Building2, Lock } from 'lucide-react'

interface DataClassificationFeedbackModalProps {
  document: DataClassification
  userClassification: 'public' | 'internal' | 'confidential' | 'restricted'
  onContinue: () => void
}

export default function DataClassificationFeedbackModal({
  document,
  userClassification,
  onContinue,
}: DataClassificationFeedbackModalProps) {
  const isCorrect = userClassification === document.correctClassification

  const getClassificationLabel = (classification: string) => {
    const labels: Record<string, string> = {
      public: 'PUBLIC',
      internal: 'INTERNAL',
      confidential: 'CONFIDENTIAL',
      restricted: 'RESTRICTED',
    }
    return labels[classification] || classification
  }

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'public':
        return <Globe size={24} />
      case 'internal':
        return <Building2 size={24} />
      default:
        return <Lock size={24} />
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
          {/* Document Info */}
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground uppercase text-xs font-bold">Document</p>
              <p className="text-foreground font-bold mt-1">{document.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase text-xs font-bold">From</p>
              <p className="text-foreground font-bold mt-1">{document.from}</p>
            </div>
            {document.shouldShareWith && (
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">Intended Recipient</p>
                <p className="text-foreground font-bold mt-1">{document.shouldShareWith}</p>
              </div>
            )}
          </div>

          {/* Classification Decision */}
          <div className="space-y-3">
            <div className={`p-4 rounded border-2 flex items-center gap-3 ${
              isCorrect ? 'bg-green-900/30 border-green-600' : 'bg-red-900/30 border-red-600'
            }`}>
              <div className={`flex-shrink-0 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? <Check size={24} /> : <X size={24} />}
              </div>
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold mb-1">Your Decision</p>
                <p className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {getClassificationLabel(userClassification)}
                </p>
              </div>
            </div>

            {!isCorrect && (
              <div className="p-4 rounded border-2 bg-green-900/30 border-green-600 flex items-center gap-3">
                <div className="flex-shrink-0 text-green-400">
                  <Check size={24} />
                </div>
                <div>
                  <p className="text-muted-foreground uppercase text-xs font-bold mb-1">Correct Answer</p>
                  <p className="font-bold text-lg text-green-400">
                    {getClassificationLabel(document.correctClassification)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sensitivity Indicators */}
          <div className="space-y-3">
            <p className="text-muted-foreground uppercase text-xs font-bold">Content Analysis</p>
            <div className="bg-secondary rounded p-3 space-y-2 text-sm">
              {document.sensitivityIndicators && document.sensitivityIndicators.length > 0 ? (
                document.sensitivityIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <p className="text-foreground">{indicator}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No sensitive indicators found</p>
              )}
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
