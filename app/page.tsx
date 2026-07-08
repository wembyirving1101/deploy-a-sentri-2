'use client'

import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { mockEmails, verificationContacts } from '@/lib/mockEmails'
import { mockPasswords } from '@/lib/mockPasswords'
import { mockDataClassifications } from '@/lib/mockDataClassification'
import { GameState, InvestigationCategory } from '@/lib/types'
import { generateRandomIncident, playNotificationSound, getRandomDelay } from '@/lib/gameHelpers'
import Header from '@/components/Header'
import TasksPanel from '@/components/TasksPanel'
import ProgressPanel from '@/components/ProgressPanel'
import EmailInbox from '@/components/EmailInbox'
import EmailViewer from '@/components/EmailViewer'
import InvestigationPanel from '@/components/InvestigationPanel'
import EmployeeHandbook from '@/components/EmployeeHandbook'
import DecisionModal from '@/components/DecisionModal'
import FeedbackModal from '@/components/FeedbackModal'
import PasswordFeedbackModal from '@/components/PasswordFeedbackModal'
import DataClassificationFeedbackModal from '@/components/DataClassificationFeedbackModal'
import PasswordStrengthTask from '@/components/PasswordStrengthTask'
import DataClassificationTask from '@/components/DataClassificationTask'
import DeskUI from '@/components/DeskUI'
import ContactModal from '@/components/ContactModal'
import DispatchQueue from '@/components/DispatchQueue'

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [gameState, setGameState] = useState<GameState>({
    graduationProgress: 35,
    currentTaskType: 'email',
    currentEmailId: 'email-1',
    currentPasswordId: 'pwd-1',
    currentDocumentId: 'doc-1',
    investigatedCategories: new Set(),
    decision: null,
    day: 7,
    todaysTasksCompleted: 0,
    dispatchQueue: [],
  })
  const [checkedPasswordCharacteristics, setCheckedPasswordCharacteristics] = useState<Set<string>>(new Set())
  const [showHandbook, setShowHandbook] = useState(true)
  const [investigationList, setInvestigationList] = useState<InvestigationCategory[]>([
    { id: 'profile', label: 'Profile', checked: false, hasEvidence: true },
    { id: 'link', label: 'Link', checked: false, hasEvidence: true },
    { id: 'file', label: 'File', checked: false, hasEvidence: true },
    { id: 'language', label: 'Language', checked: false, hasEvidence: true },
    { id: 'context', label: 'Context', checked: false, hasEvidence: true },
    { id: 'request', label: 'Request', checked: false, hasEvidence: true },
  ])
  const [showDecisionModal, setShowDecisionModal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastDecision, setLastDecision] = useState<'legitimate' | 'phishing' | null>(null)
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false)
  const [lastPasswordDecision, setLastPasswordDecision] = useState<'approve' | 'revision' | 'reject' | null>(null)
  const [showDataClassificationFeedback, setShowDataClassificationFeedback] = useState(false)
  const [lastDataClassificationDecision, setLastDataClassificationDecision] = useState<'public' | 'internal' | 'confidential' | 'restricted' | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showQueueModal, setShowQueueModal] = useState(false)
  const [activeEmails, setActiveEmails] = useState<Set<string>>(new Set())
  const [emailNotifications, setEmailNotifications] = useState(0)
  const [passwordNotifications, setPasswordNotifications] = useState(0)
  const [dataClassificationNotifications, setDataClassificationNotifications] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const incidentGeneratorRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const usedIncidentsRef = useRef<Set<string>>(new Set())
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Update time every minute (client-side only to avoid hydration mismatch)
  useEffect(() => {
    const updateTime = () => {
      const now = dayjs()
      setCurrentTime(`DAY ${now.date().toString().padStart(2, '0')} • ${now.format('hh:mm A')}`)
    }
    // Set initial time immediately on first render
    updateTime()
    // Then update every minute
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Incident generation timer - generates new tasks every 3-10 seconds
  useEffect(() => {
    const scheduleNextIncident = () => {
      const delay = getRandomDelay(3000, 10000)
      
      incidentGeneratorRef.current = setTimeout(() => {
        // Only generate if we haven't hit the max tasks for the day (10)
        if (gameState.todaysTasksCompleted < 10) {
          const incident = generateRandomIncident(mockEmails, mockPasswords, mockDataClassifications, usedIncidentsRef.current)
          
          if (incident) {
            console.log('[v0] New incident generated:', incident)
            usedIncidentsRef.current.add(incident.id)
            setGameState((prev) => ({
              ...prev,
              dispatchQueue: [
                ...prev.dispatchQueue,
                {
                  type: incident.type,
                  id: incident.id,
                  timestamp: Date.now(),
                },
              ],
            }))
            
            // Update per-task notifications
            if (incident.type === 'email') {
              setEmailNotifications((prev) => prev + 1)
              setToastMessage(`New Email Investigation: ${incident.id}`)
              // Add email to active emails so it appears in the inbox
              setActiveEmails((prev) => {
                const newSet = new Set([...prev, incident.id])
                // Auto-select the first email in the inbox
                setGameState((prevState) => ({
                  ...prevState,
                  currentEmailId: incident.id,
                }))
                return newSet
              })
            } else if (incident.type === 'password') {
              setPasswordNotifications((prev) => prev + 1)
              setToastMessage(`New Password Strength Task: ${incident.id}`)
              // Auto-select the new password task
              setGameState((prevState) => ({
                ...prevState,
                currentPasswordId: incident.id,
              }))
            } else if (incident.type === 'data-classification') {
              setDataClassificationNotifications((prev) => prev + 1)
              setToastMessage(`New Data Classification: ${incident.id}`)
            }
            
            // Clear previous toast timeout
            if (toastTimeoutRef.current) {
              clearTimeout(toastTimeoutRef.current)
            }
            
            // Auto-clear toast after 3 seconds
            toastTimeoutRef.current = setTimeout(() => {
              setToastMessage(null)
            }, 3000)
            
            playNotificationSound()
          }
        }
        
        // Schedule next incident
        scheduleNextIncident()
      }, delay)
    }
    
    scheduleNextIncident()
    
    return () => {
      if (incidentGeneratorRef.current) {
        clearTimeout(incidentGeneratorRef.current)
      }
    }
  }, [gameState.todaysTasksCompleted])

  // Initialize currentTime with a placeholder to prevent hydration mismatch
  const displayTime = currentTime || 'DAY -- • --:-- --'

  const currentEmail = mockEmails.find((e) => e.id === gameState.currentEmailId)

  const handleSelectEmail = (emailId: string) => {
    setGameState((prev) => ({
      ...prev,
      currentEmailId: emailId,
      investigatedCategories: new Set(),
      decision: null,
    }))
    setInvestigationList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: false,
      }))
    )
    setShowDecisionModal(false)
    setEmailNotifications(0) // Reset email notification when viewing
  }

  const handleInvestigate = (categoryId: string) => {
    setGameState((prev) => ({
      ...prev,
      investigatedCategories: new Set([...prev.investigatedCategories, categoryId]),
    }))
    setInvestigationList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? { ...item, checked: true }
          : item
      )
    )
  }

  const handleCheckboxChange = (categoryId: string) => {
    const isCurrentlyChecked = investigationList.find((item) => item.id === categoryId)?.checked
    
    setInvestigationList((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? { ...item, checked: !item.checked }
          : item
      )
    )

    // Update investigation tracking based on checkbox state
    if (!isCurrentlyChecked) {
      // Checking: add to investigated categories
      setGameState((prev) => ({
        ...prev,
        investigatedCategories: new Set([...prev.investigatedCategories, categoryId]),
      }))
    } else {
      // Unchecking: remove from investigated categories
      const newInvestigated = new Set(gameState.investigatedCategories)
      newInvestigated.delete(categoryId)
      setGameState((prev) => ({
        ...prev,
        investigatedCategories: newInvestigated,
      }))
    }
  }

  const handleMakeDecision = (decision: 'legitimate' | 'phishing') => {
    let progressIncrease = 0
    
    if (currentEmail) {
      const isCorrect = (decision === 'phishing' && !currentEmail.isLegitimate) ||
                        (decision === 'legitimate' && currentEmail.isLegitimate)
      
      if (isCorrect) {
        // EXP multiplier based on investigation list completion
        const checkedCount = investigationList.filter((item) => item.checked).length
        const totalCount = investigationList.length
        const completionRatio = checkedCount / totalCount
        
        // Full reward (5%) if 50%+ investigated, reduced if less
        if (completionRatio >= 0.5) {
          progressIncrease = 5
        } else if (completionRatio > 0) {
          progressIncrease = 2
        } else {
          // Guessed without any investigation
          progressIncrease = 1
        }
      }
    }
    
    setGameState((prev) => ({
      ...prev,
      decision,
      graduationProgress: Math.min(100, prev.graduationProgress + progressIncrease),
    }))
    
    setLastDecision(decision)
    setShowDecisionModal(false)
    setShowFeedback(true)
  }

  const handleContinueAfterFeedback = () => {
    setShowFeedback(false)
    setLastDecision(null)
    
    // Remove completed email from active emails
    const completedEmailId = gameState.currentEmailId
    setActiveEmails((prev) => {
      const newSet = new Set(prev)
      newSet.delete(completedEmailId)
      return newSet
    })
    
    // Increment tasks completed
    setGameState((prev) => ({
      ...prev,
      todaysTasksCompleted: prev.todaysTasksCompleted + 1,
    }))
    
    // Move to next active email from remaining list
    const remainingEmails = mockEmails.filter((e) => e.id !== completedEmailId)
    if (remainingEmails.length > 0) {
      handleSelectEmail(remainingEmails[0].id)
    }
  }

  const handleTogglePasswordCharacteristic = (id: string) => {
    setCheckedPasswordCharacteristics((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handlePasswordDecision = (decision: 'approve' | 'revision' | 'reject') => {
    let progressIncrease = 0
    const currentPassword = mockPasswords.find((p) => p.id === gameState.currentPasswordId)
    
    if (currentPassword) {
      const isCorrect = decision === currentPassword.correctDecision
      if (isCorrect) {
        progressIncrease = 5
      }
    }
    
    setLastPasswordDecision(decision)
    setShowPasswordFeedback(true)
    
    // Update progress immediately
    setGameState((prev) => ({
      ...prev,
      graduationProgress: Math.min(100, prev.graduationProgress + progressIncrease),
    }))
  }

  const handleContinueAfterPasswordFeedback = () => {
    setShowPasswordFeedback(false)
    setLastPasswordDecision(null)
    setCheckedPasswordCharacteristics(new Set())
    
    // Increment tasks completed
    setGameState((prev) => ({
      ...prev,
      todaysTasksCompleted: prev.todaysTasksCompleted + 1,
    }))
    
    // Move to next password
    const nextPasswordIndex = mockPasswords.findIndex((p) => p.id === gameState.currentPasswordId) + 1
    if (nextPasswordIndex < mockPasswords.length) {
      setGameState((prev) => ({
        ...prev,
        currentPasswordId: mockPasswords[nextPasswordIndex].id,
      }))
    } else {
      // Cycle back to first password
      setGameState((prev) => ({
        ...prev,
        currentPasswordId: mockPasswords[0].id,
      }))
    }
  }

  const handleDataClassification = (classification: 'public' | 'internal' | 'confidential' | 'restricted') => {
    let progressIncrease = 0
    const currentDocument = mockDataClassifications.find((d) => d.id === gameState.currentDocumentId)
    
    if (currentDocument) {
      const isCorrect = classification === currentDocument.correctClassification
      if (isCorrect) {
        progressIncrease = 5
      }
    }
    
    setLastDataClassificationDecision(classification)
    setShowDataClassificationFeedback(true)
    
    // Update progress immediately
    setGameState((prev) => ({
      ...prev,
      graduationProgress: Math.min(100, prev.graduationProgress + progressIncrease),
    }))
  }

  const handleContinueAfterDataClassificationFeedback = () => {
    setShowDataClassificationFeedback(false)
    setLastDataClassificationDecision(null)
    
    // Increment tasks completed
    setGameState((prev) => ({
      ...prev,
      todaysTasksCompleted: prev.todaysTasksCompleted + 1,
    }))
    
    // Move to next document
    const nextDocumentIndex = mockDataClassifications.findIndex((d) => d.id === gameState.currentDocumentId) + 1
    if (nextDocumentIndex < mockDataClassifications.length) {
      setGameState((prev) => ({
        ...prev,
        currentDocumentId: mockDataClassifications[nextDocumentIndex].id,
      }))
    } else {
      // Cycle back to first document
      setGameState((prev) => ({
        ...prev,
        currentDocumentId: mockDataClassifications[0].id,
      }))
    }
  }

  const handleSelectTask = (taskType: 'email' | 'password' | 'data-classification') => {
    setGameState((prev) => ({
      ...prev,
      currentTaskType: taskType,
    }))
  }

  const handleEndDay = () => {
    console.log('[v0] End Day triggered')
    
    // Reset daily state while preserving graduation progress
    setGameState((prev) => ({
      ...prev,
      day: prev.day + 1,
      todaysTasksCompleted: 0,
      dispatchQueue: [],
      currentEmailId: 'email-1',
      currentPasswordId: 'pwd-1',
      currentDocumentId: 'doc-1',
      investigatedCategories: new Set(),
      decision: null,
    }))
    
    // Reset active emails for new day (start with 0)
    setActiveEmails(new Set())
    usedIncidentsRef.current.clear()
    setEmailNotifications(0)
    setPasswordNotifications(0)
    setDataClassificationNotifications(0)
    
    // Reset investigation list
    setInvestigationList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: false,
      }))
    )
    
    // Reset other state
    setShowFeedback(false)
    setShowDecisionModal(false)
    setLastDecision(null)
    setShowPasswordFeedback(false)
    setLastPasswordDecision(null)
    setShowDataClassificationFeedback(false)
    setLastDataClassificationDecision(null)
    setCheckedPasswordCharacteristics(new Set())
    
    console.log('[v0] New day started')
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <Header currentTime={displayTime} graduationProgress={gameState.graduationProgress} />

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 pb-44 overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-56 flex flex-col gap-4 overflow-hidden">
          <TasksPanel 
            currentTaskType={gameState.currentTaskType} 
            onSelectTask={handleSelectTask}
            emailNotificationCount={emailNotifications}
            passwordNotificationCount={passwordNotifications}
            dataClassificationNotificationCount={dataClassificationNotifications}
          />
          <ProgressPanel />
        </div>

        {/* Center Content - Task-specific UI */}
        <div className="flex-1 overflow-hidden">
          {gameState.currentTaskType === 'email' && (
            <div className="flex gap-4 h-full overflow-hidden">
              {/* Email Inbox */}
              <EmailInbox
                emails={mockEmails.filter((e) => activeEmails.has(e.id))}
                selectedEmailId={gameState.currentEmailId}
                onSelectEmail={handleSelectEmail}
              />

              {/* Email Viewer */}
              {currentEmail && (
                <EmailViewer
                  email={currentEmail}
                  onInvestigate={handleInvestigate}
                  investigatedCategories={gameState.investigatedCategories}
                />
              )}
            </div>
          )}

          {gameState.currentTaskType === 'password' && (
            <PasswordStrengthTask
              password={mockPasswords.find((p) => p.id === gameState.currentPasswordId) || mockPasswords[0]}
              checkedCharacteristics={checkedPasswordCharacteristics}
              onToggleCharacteristic={handleTogglePasswordCharacteristic}
              onMakeDecision={handlePasswordDecision}
            />
          )}

          {gameState.currentTaskType === 'data-classification' && (
            <DataClassificationTask
              document={mockDataClassifications.find((d) => d.id === gameState.currentDocumentId) || mockDataClassifications[0]}
              onClassify={handleDataClassification}
            />
          )}
        </div>

        {/* Right Sidebar - Investigation List (Email only) */}
        {gameState.currentTaskType === 'email' && currentEmail && (
          <InvestigationPanel
            investigationList={investigationList}
            onMakeDecision={() => setShowDecisionModal(true)}
            onCheckboxChange={handleCheckboxChange}
            onVerify={() => setShowContactModal(true)}
          />
        )}
      </div>

      {/* Bottom - Employee Handbook */}
      {/* {showHandbook && (
        <EmployeeHandbook onClose={() => setShowHandbook(false)} />
      )} */}

      {/* Decision Modal */}
      {showDecisionModal && currentEmail && (
        <DecisionModal
          email={currentEmail}
          onDecide={handleMakeDecision}
          onClose={() => setShowDecisionModal(false)}
        />
      )}

      {/* Feedback Modal */}
      {showFeedback && currentEmail && lastDecision && (
        <FeedbackModal
          email={currentEmail}
          userDecision={lastDecision}
          onContinue={handleContinueAfterFeedback}
        />
      )}

      {/* Password Feedback Modal */}
      {showPasswordFeedback && gameState.currentTaskType === 'password' && lastPasswordDecision && (
        <PasswordFeedbackModal
          password={mockPasswords.find((p) => p.id === gameState.currentPasswordId) || mockPasswords[0]}
          userDecision={lastPasswordDecision}
          onContinue={handleContinueAfterPasswordFeedback}
        />
      )}

      {/* Data Classification Feedback Modal */}
      {showDataClassificationFeedback && gameState.currentTaskType === 'data-classification' && lastDataClassificationDecision && (
        <DataClassificationFeedbackModal
          document={mockDataClassifications.find((d) => d.id === gameState.currentDocumentId) || mockDataClassifications[0]}
          userClassification={lastDataClassificationDecision}
          onContinue={handleContinueAfterDataClassificationFeedback}
        />
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          contacts={verificationContacts}
          onClose={() => setShowContactModal(false)}
        />
      )}

      {/* Persistent Desk UI */}
      <DeskUI 
        progressPercentage={gameState.graduationProgress} 
        onEndDay={handleEndDay}
        tasksCompleted={gameState.todaysTasksCompleted}
        onShowQueue={() => setShowQueueModal(true)}
      />

      {/* Dispatch Queue Modal */}
      {showQueueModal && (
        <DispatchQueue
          tasks={gameState.dispatchQueue}
          onClose={() => setShowQueueModal(false)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg border border-primary/50 animate-in fade-in-50 duration-200 z-50">
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  )
}
