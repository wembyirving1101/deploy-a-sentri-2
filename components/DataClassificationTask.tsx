'use client'

import { DataClassification } from '@/lib/types'
import { FileText, Lock, Building2, Globe } from 'lucide-react'

interface DataClassificationTaskProps {
  document: DataClassification
  onClassify: (classification: 'public' | 'internal' | 'confidential' | 'restricted') => void
}

export default function DataClassificationTask({
  document,
  onClassify,
}: DataClassificationTaskProps) {
  const classifications = [
    {
      id: 'public',
      label: 'PUBLIC',
      description: 'Safe to share with anyone.',
      icon: <Globe size={24} />,
      color: 'bg-blue-700 hover:bg-blue-600',
      textColor: 'text-blue-100',
    },
    {
      id: 'internal',
      label: 'INTERNAL',
      description: 'For internal use only.',
      icon: <Building2 size={24} />,
      color: 'bg-blue-900 hover:bg-blue-800',
      textColor: 'text-blue-100',
    },
    {
      id: 'confidential',
      label: 'CONFIDENTIAL',
      description: 'Share only with authorized individuals.',
      icon: <Lock size={24} />,
      color: 'bg-yellow-700 hover:bg-yellow-600',
      textColor: 'text-yellow-100',
    },
    {
      id: 'restricted',
      label: 'RESTRICTED',
      description: 'Highly sensitive. Limited access only.',
      icon: <Lock size={24} />,
      color: 'bg-red-700 hover:bg-red-600',
      textColor: 'text-red-100',
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-bold tracking-widest text-foreground">TASK: DATA CLASSIFICATION</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-6 overflow-hidden p-6">
        {/* Left Side - Document Preview */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Document Info */}
          <div className="bg-card border border-border rounded p-4">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={24} className="text-accent" />
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">From: {document.from}</p>
                <p className="text-muted-foreground uppercase text-xs font-bold">Time: {document.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="bg-card border border-border rounded p-4 flex-1 flex flex-col overflow-hidden">
            <span className="text-muted-foreground uppercase text-xs font-bold block mb-3">DOCUMENT PREVIEW</span>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              <div className="bg-secondary rounded p-3 flex items-center gap-3 border border-border">
                <FileText size={32} className="text-accent flex-shrink-0" />
                <div>
                  <p className="font-bold text-foreground">{document.title}</p>
                  <p className="text-muted-foreground text-xs">{document.fileSize}</p>
                </div>
              </div>
              <div className="bg-secondary rounded p-4 flex-1 overflow-y-auto border border-border">
                <p className="text-foreground text-sm whitespace-pre-wrap">{document.preview}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Task Details and Classification Options */}
        <div className="w-96 flex flex-col gap-4">
          {/* Task Details */}
          <div className="bg-card border border-border rounded p-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={20} className="text-accent" />
              <span className="text-muted-foreground uppercase text-xs font-bold">TASK DETAILS</span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">Document</p>
                <p className="text-foreground font-bold mt-1">{document.title}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">From</p>
                <p className="text-foreground font-bold mt-1">{document.from}</p>
              </div>
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">Type</p>
                <p className="text-foreground font-bold mt-1">{document.fileType} • {document.fileSize}</p>
              </div>
              {document.shouldShareWith && (
                <div>
                  <p className="text-muted-foreground uppercase text-xs font-bold">Intended Recipient</p>
                  <p className="text-foreground font-bold mt-1">{document.shouldShareWith}</p>
                </div>
              )}
            </div>
          </div>

          {/* Classification Options */}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {classifications.map((classification) => (
              <button
                key={classification.id}
                onClick={() => onClassify(classification.id as any)}
                className={`${classification.color} ${classification.textColor} p-4 rounded transition-colors flex items-start gap-3 text-left`}
              >
                <div className="flex-shrink-0 mt-1">{classification.icon}</div>
                <div className="flex-1">
                  <p className="font-bold">{classification.label}</p>
                  <p className="text-sm opacity-90">{classification.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
