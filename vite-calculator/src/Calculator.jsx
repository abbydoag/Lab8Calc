import React, { useState, useEffect } from 'react'
import '@style/Calculator.css'

const Calculator = () => {
  const [maxChars] = useState(10)
  const [storedResult, setStoredResult] = useState(null)
  const [currentValue, setCurrentValue] = useState('')
  const [currentOperation, setCurrentOperation] = useState(null)

  const mapKeys ={
    48: {type: 'input', value: '0'},
    49: {type: 'input', value: '1'},
    50: {type: 'input', value: '2'},
    51: {type: 'input', value: '3'},
    52: {type: 'input', value: '4'},
    53: {type: 'input', value: '5'},
    54: {type: 'input', value: '6'},
    55: {type: 'input', value: '7'},
    56: {type: 'input', value: '8'},
    57: {type: 'input', value: '9'},
    190: {type: 'input', value: '.'},
    88: {type: 'operation', value: 'exp'}, //x
    47: {type: 'operation', value: 'div'},
    221: {type: 'operation', value: 'mult'},
    189: {type: 'operation', value: 'sub'},
    187: {type: 'operation', value: 'sum'},
    67: {type: 'clear', value: 'clear' }, //c
    13: {type: 'result', value: null }, //enter
    8: {type: 'delete', value: null }, //<- (borrar)
    84: {type: 'toggle', value: 'toggle' }, //t
  };

  useEffect(() =>{
    const handleKeyPress = (event) => {
      let keyCode = event.keyCode
      if(event.shiftKey && event.keyCode === 55){
        keyCode = 47
      }else if(event.shiftKey && event.keyCode === 187){
        keyCode = 221
      }
      if (mapKeys[keyCode]) {
        processUserInput(mapKeys[keyCode])
        activateButtonWithKeypress(keyCode)
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const activateButtonWithKeypress = (keyCode) =>{
    const btn = document.querySelectorAll(`.calculator button[data-keycode="${keyCode}"]`)[0]
    if (btn) {
      btn.classList.toggle('active')
      setTimeout(() => {
        btn.classList.toggle('active')
      }, 150)
    }
  }

  const processUserInput = (userInput) =>{
    switch (userInput.type) {
      case 'input':
        setNumber(userInput.value)
        break
      case 'operation':
        setOperation(userInput.value)
        break
      case 'delete':
        deleteNumber()
        break
      case 'result':
        showResult()
        break
      case 'clear':
        clearAll()
        break
      case 'toggle':
        toggleNumber()
        break
      default:
        break
    }
  }

  const setNumber = (newNumber) =>{
    if (newNumber === '.' && currentValue.includes('.')){
      blinkDisplay()
      return
    }
    if (currentValue.length >= maxChars){
      blinkDisplay()
      return
    }
    setCurrentValue((prev) =>{
        return prev === '0' && newNumber !== '.' ? newNumber : prev + newNumber
    })
  }

  const setOperation = (newOperation) =>{
    if (currentOperation !== null && storedResult !== null) {
      calculate()
    }
    setStoredResult(currentValue)
    setCurrentValue('0')
    setCurrentOperation(newOperation)
  }

  const deleteNumber = () =>{
    const newValue = currentValue.slice(0, -1)
    if (newValue === '') {
      blinkDisplay()
      setCurrentValue('0')
    } else {
      setCurrentValue(newValue)
    }
  }

  const showResult = () =>{
    if (storedResult !== null) {
      calculate()
    } else {
      blinkDisplay()
      setCurrentValue('' + calculate(parseFloat(currentValue, 10)))
    }
    setCurrentOperation(null)
  }

  const calculate = () =>{
    const a = parseFloat(storedResult, 10)
    const b = parseFloat(currentValue, 10)
    let resultValue = 0

    switch (currentOperation) {
      case 'mult':
        resultValue = a*b
        break
      case 'div':
        resultValue = a/b
        break
      case 'sub':
        resultValue = a-b
        break
      case 'sum':
        resultValue = a+b
        break
      case 'exp':
        resultValue = Math.pow(a,b)
        break
      default:
        break
    }

    setStoredResult(null)
    setCurrentValue('' + resultValue)
  }

  const clearAll = () =>{
    setCurrentOperation(null)
    setStoredResult(null)
    setCurrentValue('0')
  }

  const toggleNumber = () =>{
    setCurrentValue((prev) => (parseFloat(prev, 10) * -1).toString())
  }

  const blinkDisplay = () => {
    const blinkElement = document.querySelector('.calculator-display')
    blinkElement.classList.add('blink')
    setTimeout(() => {
      blinkElement.classList.remove('blink')
    }, 150)
  }

  //teclado 
  return (
    <div className="calculator">
      <div className="calculator-display">{currentValue}</div>
      <div className="calculator-buttons">
      <button className="calculator-button" data-keycode="49" onClick={() => setNumber('1')}>1</button>
        <button className="calculator-button" data-keycode="50" onClick={() => setNumber('2')}>2</button>
        <button className="calculator-button" data-keycode="51" onClick={() => setNumber('3')}>3</button>
        <button className="calculator-button" data-keycode="8" onClick={() => deleteNumber()}>DEL</button>
        <button className="calculator-button" data-keycode="67" onClick={() => clearAll()}>C</button>
        <button className="calculator-button" data-keycode="52" onClick={() => setNumber('4')}>4</button>
        <button className="calculator-button" data-keycode="53" onClick={() => setNumber('5')}>5</button>
        <button className="calculator-button" data-keycode="54" onClick={() => setNumber('6')}>6</button>
        <button className="calculator-button" data-keycode="187" onClick={() => setOperation('sum')}>+</button>
        <button className="calculator-button" data-keycode="189" onClick={() => setOperation('sub')}>-</button>
        <button className="calculator-button" data-keycode="55" onClick={() => setNumber('7')}>7</button>
        <button className="calculator-button" data-keycode="56" onClick={() => setNumber('8')}>8</button>
        <button className="calculator-button" data-keycode="57" onClick={() => setNumber('9')}>9</button>
        <button className="calculator-button" data-keycode="221" onClick={() => setOperation('mult')}>*</button>
        <button className="calculator-button" data-keycode="47" onClick={() => setOperation('div')}>/</button>
        <button className="calculator-button" data-keycode="48" onClick={() => setNumber('0')}>0</button>
        <button className="calculator-button" data-keycode="84" onClick={() => toggleNumber()}>+/-</button>
        <button className="calculator-button" data-keycode="88" onClick={() => setOperation('exp')}>^</button>
        <button className="calculator-button" data-keycode="13" onClick={() => showResult()}>=</button>
      </div>
    </div>
  )
}

export default Calculator