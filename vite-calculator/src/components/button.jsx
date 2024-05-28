import React from 'react'

const Button = ({ value, onClick }) => {
  return (
    <button type="button" onClick={onClick} data-keycode={value}>
      {value}
    </button>
  )
}

export default Button