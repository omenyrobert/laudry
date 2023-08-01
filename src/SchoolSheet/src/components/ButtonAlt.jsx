import * as React from 'react';
import '../assets/styles/login.css'

const ButtonAlt = ({value}) => {
  return (
    <div className="Btn px-4 py-2 rounded-lg text-center w-auto cursor-pointer">
     {value}
    </div>
  )
}

export default ButtonAlt