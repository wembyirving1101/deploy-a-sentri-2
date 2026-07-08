import { Email, Password, DataClassification } from './types'

export function selectRandomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomDelay(min: number = 3000, max: number = 10000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateRandomIncident(
  emails: Email[],
  passwords: Password[],
  documents: DataClassification[],
  usedIncidents: Set<string>
): { type: 'email' | 'password' | 'data-classification'; id: string } | null {
  // Filter out already used incidents
  const availableEmails = emails.filter(e => !usedIncidents.has(`email-${e.id}`))
  const availablePasswords = passwords.filter(p => !usedIncidents.has(`password-${p.id}`))
  const availableDocuments = documents.filter(d => !usedIncidents.has(`data-${d.id}`))

  if (availableEmails.length === 0 && availablePasswords.length === 0 && availableDocuments.length === 0) {
    return null
  }

  const types: Array<'email' | 'password' | 'data-classification'> = []
  if (availableEmails.length > 0) types.push('email')
  if (availablePasswords.length > 0) types.push('password')
  if (availableDocuments.length > 0) types.push('data-classification')

  const selectedType = selectRandomFromArray(types)

  switch (selectedType) {
    case 'email': {
      const email = selectRandomFromArray(availableEmails)
      return { type: 'email', id: email.id }
    }
    case 'password': {
      const password = selectRandomFromArray(availablePasswords)
      return { type: 'password', id: password.id }
    }
    case 'data-classification': {
      const doc = selectRandomFromArray(availableDocuments)
      return { type: 'data-classification', id: doc.id }
    }
  }
}

export function playNotificationSound(): void {
  // Use Web Audio API to create a simple beep notification
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800 // Frequency in Hz
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  } catch (e) {
    // Audio context not available, silently fail
  }
}

export function getUniqueRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}
