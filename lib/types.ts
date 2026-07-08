export interface Email {
  id: string
  from: string
  senderDomain: string
  to: string
  subject: string
  body: string
  timestamp: string
  attachments: Attachment[]
  isLegitimate: boolean
  threat: 'phishing' | 'malware' | 'social-engineering' | 'legitimate'
  clues: EmailClues
}

export interface Attachment {
  name: string
  size: number
  type: string
  suspicious: boolean
  details: string
}

export interface EmailClues {
  senderProfile: string
  linkDetails: string[]
  attachmentAnalysis: string
  languageAnalysis: string
  contextAnalysis: string
  requestAnalysis: string
}

export interface InvestigationCategory {
  id: 'profile' | 'link' | 'file' | 'language' | 'context' | 'request'
  label: string
  checked: boolean
  hasEvidence: boolean
}

export interface GameState {
  graduationProgress: number
  currentTaskType: 'email' | 'password' | 'data-classification'
  currentEmailId: string | null
  currentPasswordId: string | null
  currentDocumentId: string | null
  investigatedCategories: Set<string>
  confidenceLevel: number
  decision: 'legitimate' | 'phishing' | null
  day: number
  todaysTasksCompleted: number
  dispatchQueue: Array<{ type: string; id: string; timestamp: number }>
}

export interface VerificationContact {
  id: string
  name: string
  role: string
  canHelp: string[]
}

export interface PasswordCharacteristic {
  id: string
  label: string
  description: string
  icon: string
  present: boolean
  checked: boolean
  weight: number
}

export interface Password {
  id: string
  employee: string
  department: string
  submitted: string
  timestamp: string
  characteristics: PasswordCharacteristic[]
  correctDecision: 'approve' | 'revision' | 'reject'
}

export interface DataClassification {
  id: string
  title: string
  from: string
  timestamp: string
  fileType: string
  fileSize: string
  preview: string
  sensitivityIndicators: string[]
  correctClassification: 'public' | 'internal' | 'confidential' | 'restricted'
  shouldShareWith?: string
}
