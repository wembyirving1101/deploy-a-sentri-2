'use client'

import { useState } from 'react'
import { Mail, Lock, Shield, Database, X } from 'lucide-react'

interface QueueTask {
  type: string
  id: string
  timestamp: number
  taskData?: any
}

interface DispatchQueueProps {
  tasks: QueueTask[]
  onClose: () => void
}

export default function DispatchQueue({ tasks, onClose }: DispatchQueueProps) {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTask, setSelectedTask] = useState<QueueTask | null>(null)

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.type === selectedFilter)

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail
      case 'password':
        return Lock
      case 'data-classification':
        return Database
      default:
        return Shield
    }
  }

  const getTaskLabel = (type: string) => {
    switch (type) {
      case 'email':
        return 'Email Investigation'
      case 'password':
        return 'Password Strength'
      case 'data-classification':
        return 'Data Classification'
      default:
        return 'Task'
    }
  }

  const getTaskTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const filterCounts = {
    all: tasks.length,
    email: tasks.filter(t => t.type === 'email').length,
    password: tasks.filter(t => t.type === 'password').length,
    'data-classification': tasks.filter(t => t.type === 'data-classification').length,
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-[#2a2a2a] border border-[#444444] rounded w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#444444] px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-widest text-[#e8d4b0] uppercase ui-font">
            DISPATCH QUEUE
          </h1>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#ffffff] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Queue List */}
          <div className="flex-1 flex flex-col border-r border-[#444444] overflow-hidden">
            {/* Filter Tabs */}
            <div className="flex border-b border-[#444444]">
              {[
                { key: 'all', label: 'ALL', count: filterCounts.all },
                { key: 'email', label: 'EMAIL', count: filterCounts.email },
                { key: 'password', label: 'PASSWORD', count: filterCounts.password },
                { key: 'data-classification', label: 'DATA', count: filterCounts['data-classification'] },
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ui-font ${
                    selectedFilter === filter.key
                      ? 'bg-[#3a3a3a] text-[#e8d4b0] border-b-[#e8d4b0]'
                      : 'text-[#888888] border-b-transparent hover:text-[#aaa]'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Tasks Table */}
            <div className="flex-1 overflow-y-auto">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-[#888888]">
                  <p className="text-sm">No tasks available</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#444444] bg-[#1f1f1f]">
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#888888] uppercase tracking-wider">TYPE</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#888888] uppercase tracking-wider">TASK</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#888888] uppercase tracking-wider">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map(task => {
                      const Icon = getTaskIcon(task.type)
                      const isSelected = selectedTask?.id === task.id
                      return (
                        <tr
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`border-b border-[#444444] cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#3a3a3a]'
                              : 'hover:bg-[#2a2a2a]'
                          }`}
                        >
                          <td className="px-4 py-3 text-xs text-[#e8d4b0]">
                            <div className="flex items-center gap-2">
                              <Icon size={16} />
                              {getTaskLabel(task.type)}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-[#ccc]">{task.id}</td>
                          <td className="px-4 py-3 text-xs text-[#888888]">{getTaskTime(task.timestamp)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right Panel - Task Details */}
          <div className="w-80 border-l border-[#444444] p-6 overflow-y-auto bg-[#2a2a2a]">
            {selectedTask ? (
              <div>
                <h2 className="text-sm font-bold text-[#e8d4b0] uppercase tracking-wider mb-4">
                  {getTaskLabel(selectedTask.type)}
                </h2>
                <div className="space-y-3 text-xs text-[#ccc]">
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider mb-1">Task ID</p>
                    <p className="font-mono">{selectedTask.id}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider mb-1">Type</p>
                    <p>{getTaskLabel(selectedTask.type)}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] uppercase tracking-wider mb-1">Time Received</p>
                    <p>{getTaskTime(selectedTask.timestamp)}</p>
                  </div>
                  <div className="pt-4 border-t border-[#444444]">
                    <p className="text-[#888888] uppercase tracking-wider mb-2">Status</p>
                    <p className="text-[#e8d4b0]">Pending</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[#888888]">
                <p className="text-sm">Select a task to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
