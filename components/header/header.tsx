"use client"

import { useState } from "react"
import HeaderLeft from "./headerLeft"
import HeaderRight from "./headerRight"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to your Langgraph agent here
    console.log("Agent search query:", searchQuery)
  }

  return (
    <div className="mx-3 flex items-center justify-between gap-4 py-4">
      <HeaderLeft />
      
      {/* Google-style Agent Search Bar */}
      <div className="flex-1 max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <div
            className={`flex items-center bg-white rounded-full border transition-all duration-200 shadow-sm ${
              isFocused
                ? "border-[#4277d5] shadow-md"
                : "border-gray-300 hover:shadow-md"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 ml-4 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask agent to help you..."
              className="flex-1 py-3 px-4 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mr-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-400"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            
            <button
              type="submit"
              className="mr-2 p-2 bg-[#4277d5] hover:bg-[#3666c4] text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!searchQuery.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      <HeaderRight />
    </div>
  )
}
