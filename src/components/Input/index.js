import React from 'react'
import * as C from './styles'
import './styles.scss'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <>
      <C.Input
        // className="container-input"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />

      <button>Enviar</button>
    </>
  )
}

export default Input
