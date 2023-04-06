interface CircleNumberProps {
  number: number
}

const CircleNumber = ({ number }: CircleNumberProps) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500">
      <span className="text-sm font-bold text-white">{number}</span>
    </div>
  )
}

export default CircleNumber
