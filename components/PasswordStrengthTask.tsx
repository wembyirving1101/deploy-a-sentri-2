'use client'

import { Password } from '@/lib/types'
import { Check, AlertCircle, X } from 'lucide-react'

interface PasswordStrengthTaskProps {
  password: Password
  checkedCharacteristics: Set<string>
  onToggleCharacteristic: (id: string) => void
  onMakeDecision: (decision: 'approve' | 'revision' | 'reject') => void
}

export default function PasswordStrengthTask({
  password,
  checkedCharacteristics,
  onToggleCharacteristic,
  onMakeDecision,
}: PasswordStrengthTaskProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-bold tracking-widest text-foreground">TASK: PASSWORD STRENGTH ASSESSMENT</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-6 overflow-hidden p-6">
        {/* Left Side - Password Info and Submission */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
          {/* Employee Info */}
          <div className="bg-card border border-border rounded p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl">👤</div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground uppercase text-xs font-bold">EMPLOYEE</span>
                    <p className="text-foreground font-bold mt-1">{password.employee}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase text-xs font-bold">DEPARTMENT</span>
                    <p className="text-foreground font-bold mt-1">{password.department}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase text-xs font-bold">SUBMITTED</span>
                    <p className="text-foreground font-bold mt-1">{password.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Display */}
          <div className="bg-card border border-border rounded p-4">
            <span className="text-muted-foreground uppercase text-xs font-bold block mb-3">SUBMITTED PASSWORD</span>
            <div className="bg-secondary rounded p-4 font-mono text-foreground text-lg tracking-widest">
              {password.submitted}
            </div>
          </div>

          {/* Characteristics */}
          <div className="bg-card border border-border rounded p-4 flex-1 overflow-y-auto">
            <span className="text-muted-foreground uppercase text-xs font-bold block mb-4">PASSWORD CHARACTERISTICS</span>
            <div className="space-y-2">
              {password.characteristics.map((char) => (
                <label
                  key={char.id}
                  className="flex items-start gap-3 p-3 bg-secondary rounded hover:bg-opacity-75 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedCharacteristics.has(char.id)}
                    onChange={() => onToggleCharacteristic(char.id)}
                    className="w-4 h-4 accent-accent mt-1 cursor-pointer flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm">{char.label}</p>
                    <p className="text-muted-foreground text-xs mt-1">{char.description}</p>
                  </div>
                  {char.present && (
                    <div className="flex-shrink-0 text-accent">
                      <Check size={16} />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Password Policy */}
        <div className="w-80 flex flex-col">
          <div className="bg-card border border-border rounded p-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-accent" />
              <span className="text-muted-foreground uppercase text-xs font-bold">PASSWORD POLICY</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">📏</span>
                <div>
                  <p className="font-bold text-foreground">Minimum 12 characters</p>
                  <p className="text-muted-foreground text-xs mt-1">Longer passwords are harder to crack</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">Aa</span>
                <div>
                  <p className="font-bold text-foreground">Include uppercase and lowercase letters</p>
                  <p className="text-muted-foreground text-xs mt-1">Mix character types for complexity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">123</span>
                <div>
                  <p className="font-bold text-foreground">Include at least one number</p>
                  <p className="text-muted-foreground text-xs mt-1">Numbers increase entropy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">!@#</span>
                <div>
                  <p className="font-bold text-foreground">Include at least one special character</p>
                  <p className="text-muted-foreground text-xs mt-1">Symbols make passwords stronger</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">📚</span>
                <div>
                  <p className="font-bold text-foreground">Avoid dictionary words</p>
                  <p className="text-muted-foreground text-xs mt-1">Common words are easy to guess</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">👤</span>
                <div>
                  <p className="font-bold text-foreground">Avoid personal or company information</p>
                  <p className="text-muted-foreground text-xs mt-1">Don't use names, birthdates, or usernames</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">1️⃣</span>
                <div>
                  <p className="font-bold text-foreground">Avoid sequential characters</p>
                  <p className="text-muted-foreground text-xs mt-1">e.g., 123456, abcdef</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">⌨️</span>
                <div>
                  <p className="font-bold text-foreground">Avoid keyboard patterns</p>
                  <p className="text-muted-foreground text-xs mt-1">e.g., qwerty, asdfgh</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">↻</span>
                <div>
                  <p className="font-bold text-foreground">Do not reuse old passwords</p>
                  <p className="text-muted-foreground text-xs mt-1">Create unique passwords for each account</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-bold">⚠️</span>
                <div>
                  <p className="font-bold text-foreground">Do not use leaked or common passwords</p>
                  <p className="text-muted-foreground text-xs mt-1">Check against known breach databases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="border-t border-border px-6 py-4 flex gap-4 justify-center">
        <button
          onClick={() => onMakeDecision('approve')}
          className="px-8 py-3 bg-green-700 hover:bg-green-600 text-foreground font-bold rounded transition-colors flex items-center gap-2"
        >
          <Check size={18} />
          APPROVE
        </button>
        <button
          onClick={() => onMakeDecision('revision')}
          className="px-8 py-3 bg-yellow-700 hover:bg-yellow-600 text-foreground font-bold rounded transition-colors flex items-center gap-2"
        >
          <AlertCircle size={18} />
          REQUIRE REVISION
        </button>
        <button
          onClick={() => onMakeDecision('reject')}
          className="px-8 py-3 bg-red-700 hover:bg-red-600 text-foreground font-bold rounded transition-colors flex items-center gap-2"
        >
          <X size={18} />
          REJECT
        </button>
      </div>
    </div>
  )
}
