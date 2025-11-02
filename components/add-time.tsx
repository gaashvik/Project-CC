'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown } from "lucide-react"

interface AddTimeProps {
  onTimeSelect: (time: string) => void;
  defaultTime?: string;
  placeholder?: string;
}

export default function AddTime({
  onTimeSelect,
  defaultTime = '09:00',
  placeholder = 'Select time',
}: AddTimeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState(defaultTime)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Update selectedTime when defaultTime changes
  useEffect(() => {
    setSelectedTime(defaultTime)
  }, [defaultTime])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Scroll to selected time when dropdown opens
  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      const selectedButton = scrollAreaRef.current.querySelector(`[data-time="${selectedTime}"]`)
      if (selectedButton) {
        selectedButton.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
  }, [isOpen, selectedTime])

  const generateTimeIntervals = () => {
    const intervals = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        intervals.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        )
      }
    }
    return intervals
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onTimeSelect(time)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        className="w-28 justify-between text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTime || placeholder}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-28 rounded-md border bg-popover text-popover-foreground shadow-md">
          <ScrollArea className="h-60" ref={scrollAreaRef}>
            <div className="p-1">
              {generateTimeIntervals().map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant="ghost"
                  data-time={time}
                  className={`w-full justify-start text-sm ${
                    time === selectedTime ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
