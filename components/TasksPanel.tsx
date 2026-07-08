import { Mail, Lock, Shield, Database } from 'lucide-react'

interface TasksPanelProps {
  currentTaskType: 'email' | 'password' | 'data-classification'
  onSelectTask: (taskType: 'email' | 'password' | 'data-classification') => void
  emailNotificationCount?: number
  passwordNotificationCount?: number
  dataClassificationNotificationCount?: number
}

export default function TasksPanel({ 
  currentTaskType, 
  onSelectTask,
  emailNotificationCount = 0,
  passwordNotificationCount = 0,
  dataClassificationNotificationCount = 0
}: TasksPanelProps) {
  const tasks = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email Investigation',
      notificationCount: emailNotificationCount,
      active: currentTaskType === 'email',
    },
    {
      id: 'password',
      icon: Shield,
      label: 'Password Strength',
      notificationCount: passwordNotificationCount,
      active: currentTaskType === 'password',
    },
    {
      id: 'data-classification',
      icon: Database,
      label: 'Data Classification',
      notificationCount: dataClassificationNotificationCount,
      active: currentTaskType === 'data-classification',
    },
  ]

  return (
    <div className="bg-card border border-border rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          TASKS
        </h2>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => {
          const Icon = task.icon
          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(task.id as any)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                task.active
                  ? 'bg-accent text-accent-foreground hover:bg-opacity-90'
                  : 'bg-secondary text-foreground hover:bg-opacity-75'
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left font-medium">{task.label}</span>
              {task.notificationCount > 0 && (
                <span className="bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                  {task.notificationCount}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
