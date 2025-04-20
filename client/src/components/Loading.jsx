import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin shadow-lg" role='status' aria-label='loading'></div>
  </div>
  )
}

export default Loading