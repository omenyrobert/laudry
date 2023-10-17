import * as React from 'react';
import '../assets/styles/login.css'

const Button = ({ value, onClick = null }) => {
  return (
    <div className="loginBtn px-4 py-2 rounded-lg text-center cursor-pointer"
      onClick={onClick}
    >
      {value}
    </div>
  )
}

export default Button