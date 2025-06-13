import React from 'react'

const Button = ({text}) => {
  return (
    <button className="absolute right-8 top-[270px] border border-gray-500 px-6 p-2 rounded-md hover:bg-[#151616] hover:text-white transition-normal">
          {text}
        </button>
  )
}

export default Button
