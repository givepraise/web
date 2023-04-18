interface CircleNumberProps {
  number: number
}

const CircleNumber = ({ number }: CircleNumberProps) => {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6007e]">
      <span className="text-xl font-bold text-white">{number}</span>
    </div>
  )
}

export default CircleNumber
