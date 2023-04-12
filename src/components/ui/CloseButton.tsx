import React, { ReactElement } from 'react'
import { FaTimes } from 'react-icons/fa'

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }): ReactElement => {
  return (
    <button
      className="absolute top-0 right-0 p-4 text-gray-800 hover:text-pink-600"
      onClick={onClick}>
      <FaTimes className="h-8 w-8" />
    </button>
  )
}

export default CloseButton
