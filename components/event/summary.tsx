'use client'

import React, { useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import { Button } from "@/components/ui/button"
import { IoCloseSharp } from "react-icons/io5"
import { CalendarEventType } from '@/redux/calender/eventSlice'
import { Clock, AlignLeft, Calendar } from 'lucide-react'

interface EventSummaryPopoverProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEventType
}

export function EventSummaryPopover({ isOpen, onClose, event }: EventSummaryPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const eventTypeColor = {
    meeting: 'bg-blue-600',
    task: 'bg-green-600',
    reminder: 'bg-red-600',
    event: 'bg-purple-600',
  }[event.type] || 'bg-gray-600'

  const formatTime = (time: string) => {
    return dayjs(`2000-01-01 ${time}`).format('h:mm A')
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('dddd, MMMM D, YYYY')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)' }}
      >
        {/* Header section with colored bar */}
        <div className="flex items-start gap-3 p-5 pb-4 border-b border-gray-100">
          <div className={`w-1 h-20 ${eventTypeColor} rounded-full flex-shrink-0`}></div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-[22px] font-normal text-gray-900 leading-7 mb-1">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600">
              {formatDate(event.date.toISOString())}
            </p>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 -mt-1 -mr-1 flex-shrink-0"
          >
            <IoCloseSharp className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Event details */}
        <div className="px-5 py-4 space-y-3">
          {/* Time */}
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-900">
              {formatTime(event.from_time)} – {formatTime(event.to_time)}
            </span>
          </div>

          {/* Calendar/Type */}
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-900 capitalize">
              {event.type}
            </span>
          </div>

          {/* Description */}
          {event.description && (
            <div className="flex items-start gap-4">
              <AlignLeft className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 bg-gray-50 flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            className="text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium px-4"
            onClick={() => {
              // Add edit functionality
              console.log('Edit event:', event.id)
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}
