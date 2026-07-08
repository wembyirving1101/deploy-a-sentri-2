import { X, BookOpen } from 'lucide-react'

interface EmployeeHandbookProps {
  onClose: () => void
}

export default function EmployeeHandbook({ onClose }: EmployeeHandbookProps) {
  return (
    <div className="absolute bottom-4 left-4 w-64 bg-yellow-100 border-2 border-yellow-600 rounded-lg shadow-lg overflow-hidden">
      {/* Header - looks like a notebook spine */}
      <div className="bg-yellow-700 text-white px-4 py-3 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={20} />
          <h3 className="font-bold text-sm tracking-wide">EMPLOYEE HANDBOOK</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-yellow-600 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content area - like notebook binding */}
      <div className="bg-yellow-50 px-4 py-4 border-l-4 border-yellow-600 space-y-3 max-h-56 overflow-y-auto">
        <div>
          <h4 className="font-bold text-sm text-yellow-900 mb-1">Security Policy</h4>
          <p className="text-xs text-yellow-800 leading-tight">
            We will never ask for your password, PIN, or personal information via email.
          </p>
        </div>

        <div className="border-t border-yellow-300 pt-2">
          <h4 className="font-bold text-sm text-yellow-900 mb-1">Phishing Prevention</h4>
          <p className="text-xs text-yellow-800 leading-tight">
            Be suspicious of emails requesting urgent action, especially those asking for credentials or personal data.
          </p>
        </div>

        <div className="border-t border-yellow-300 pt-2">
          <h4 className="font-bold text-sm text-yellow-900 mb-1">Safe Links</h4>
          <p className="text-xs text-yellow-800 leading-tight">
            Hover over links to see their true destination. Official company links start with our domain.
          </p>
        </div>

        <div className="border-t border-yellow-300 pt-2">
          <h4 className="font-bold text-sm text-yellow-900 mb-1">Report Suspicious Activity</h4>
          <p className="text-xs text-yellow-800 leading-tight">
            Contact IT immediately if you receive suspicious emails or notices.
          </p>
        </div>
      </div>

      {/* Bottom - looks like page binding */}
      <div className="bg-yellow-200 px-4 py-2 text-center border-t border-yellow-600">
        <button
          onClick={onClose}
          className="text-xs font-bold text-yellow-700 hover:text-yellow-900 transition-colors"
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}
