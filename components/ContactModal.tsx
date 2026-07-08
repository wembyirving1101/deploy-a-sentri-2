'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { VerificationContact } from '@/lib/types'

interface ChatMessage {
  role: 'user' | 'contact'
  content: string
  isTyping?: boolean
}

interface ContactModalProps {
  contacts: VerificationContact[]
  onClose: () => void
}

export default function ContactModal({ contacts, onClose }: ContactModalProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isContactTyping, setIsContactTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedContact = contacts.find((c) => c.id === selectedContactId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isContactTyping])

  const getIconForContact = (id: string) => {
    switch (id) {
      case 'it':
        return '💻'
      case 'supervisor':
        return '👤'
      case 'hr':
        return '💼'
      case 'finance':
        return '$'
      case 'sender':
        return '📞'
      default:
        return '📞'
    }
  }

  const getResponseMessage = (contact: VerificationContact) => {
    const responses: Record<string, string> = {
      it: `We haven't received any suspicious links or attachments reported today. All systems are running normally. If you need further assistance with email security, please submit a ticket with details about the suspicious message.`,
      supervisor: `I don't recall authorizing any unusual work requests today. If you've received a request asking you to handle something outside your normal duties, please verify it with me directly before proceeding.`,
      hr: `We have not sent any urgent communications today. If you received an email claiming to be from HR asking for personal information or passwords, please disregard it and report it to our security team immediately.`,
      finance: `We haven't requested any invoice payments today. If you received a payment request claiming to be from Finance, verify it through our official system before processing anything.`,
      sender: `Unable to reach the sender at this time. If you're unable to verify the sender through alternative channels, the email should be treated as suspicious.`,
    }
    return responses[contact.id] || 'Contact was unable to provide information at this time.'
  }

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId)
    setMessages([])
  }

  const handleVerifyClick = async () => {
    if (!selectedContact) return

    // Add user's verify message
    const userMessage: ChatMessage = {
      role: 'user',
      content: 'Verify',
    }
    setMessages((prev) => [...prev, userMessage])

    // Show typing animation
    setIsContactTyping(true)
    
    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Add contact response
    const contactResponse: ChatMessage = {
      role: 'contact',
      content: getResponseMessage(selectedContact),
    }
    setMessages((prev) => [...prev, contactResponse])
    setIsContactTyping(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border-2 border-[#444] rounded-lg w-11/12 max-w-4xl h-3/4 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] border-b border-[#444] px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-muted-foreground tracking-wider uppercase">
            Contact
          </h1>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Trusted Contacts */}
          <div className="w-1/3 border-r border-[#444] bg-[#1a1a1a] overflow-y-auto">
            <div className="p-4 border-b border-[#444] sticky top-0 bg-[#1a1a1a] z-10">
              <h2 className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                Trusted Contacts
              </h2>
            </div>
            <div className="p-2 space-y-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleSelectContact(contact.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded transition-colors text-left ${
                    selectedContactId === contact.id
                      ? 'bg-[#4a4a4a] border border-primary'
                      : 'bg-[#2a2a2a] border border-[#444] hover:bg-[#333]'
                  }`}
                >
                  <span className="text-xl">{getIconForContact(contact.id)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="w-2/3 bg-[#2a2a2a] flex flex-col overflow-hidden">
            {selectedContact ? (
              <>
                {/* Contact Header */}
                <div className="border-b border-[#444] p-4">
                  <h2 className="text-sm font-bold text-muted-foreground tracking-widest uppercase">
                    {selectedContact.name}
                  </h2>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-muted-foreground text-center">
                        Select a contact and click verify to start chatting
                      </p>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-[#c4b5a0] text-gray-900'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                      {isContactTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#c4b5a0] text-gray-900 px-4 py-2 rounded-lg">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-[#444] p-4">
                  {messages.length === 0 ? (
                    <button
                      onClick={handleVerifyClick}
                      className="w-full py-3 px-4 rounded font-bold text-sm uppercase tracking-wide transition-colors bg-primary text-primary-foreground hover:opacity-90"
                    >
                      Verify
                    </button>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">
                      Conversation with {selectedContact.name}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Select a contact to start chatting
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#444] bg-[#1a1a1a] p-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded font-bold text-sm uppercase tracking-wide text-muted-foreground border border-[#444] hover:bg-[#2a2a2a] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
