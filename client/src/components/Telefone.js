
import React, { useRef, useState, useContext, useEffect, Component } from 'react'
import { DataContext } from "../contexts/DataContext"
import { telValidator } from '../validateData/Validator'
function Telefone(props) {
  const { tel, errorMessage, component } = useContext(DataContext)
  const tel_ref = useRef(null)
  const [backspace, setBackspace] = useState(false)
  const [telValue, setTelValue] = tel
  const [componentValue, setComponentValue] = component
  const [errorMessageValue, setErrorMessageValue] = errorMessage
  const handleKeyDown = e => {
    if (e.key === 'Backspace') setBackspace(true)
    else setBackspace(false)
  };
  useEffect(() => {
    if (componentValue === false) return
    else {
      console.log(telValidator(telValue))
      if (!telValidator(telValue)) {
        setErrorMessageValue("TELEFONE INVÁLIDO")
        tel_ref.current.value = ''
        tel_ref.current.style.border = "solid 2px #F65A7F"
        setComponentValue(false)
        return
      }
        tel_ref.current.style.border = "none"
        setErrorMessageValue(null)
    }
  }, [componentValue])
  function telManipulate(e) {
    let temp = e.target.value.replace(/[^0-9()]+/g, "")
    if (temp.length === 1 && temp !== "(") {
      if (backspace) return
      else temp = "(" + temp
    }
    if (temp.length === 3) {
      if (backspace) return
      else temp = temp + ")"

    }
    for (let i = 0; i < e.target.value.length; i++) {
      console.log(e.target.value[i])
      if (
        e.target.value[i] !== "0" &&
        e.target.value[i] !== "1" &&
        e.target.value[i] !== "2" &&
        e.target.value[i] !== "3" &&
        e.target.value[i] !== "4" &&
        e.target.value[i] !== "5" &&
        e.target.value[i] !== "6" &&
        e.target.value[i] !== "7" &&
        e.target.value[i] !== "8" &&
        e.target.value[i] !== "9"
      ) {
        e.target.value = null
      }
    }
    e.target.value = temp
    // setTelValue(e.target.value.replace(/[^0-9]+/g, ""))
    setTelValue(e.target.value)
    console.log(telValue)
  }
 

  return (
    <input ref={tel_ref}  name="tel" className="register_input" placeholder="Telefone" type="text" maxLength={13} onKeyDown={handleKeyDown} onChange={(e) => telManipulate(e)} />
  )
}

export default Telefone;
