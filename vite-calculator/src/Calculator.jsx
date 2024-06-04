import React, { useState, useEffect } from 'react';

function Calculator() {
  const [maxChars] = useState(10);
  const [storedResult, setStoredResult] = useState(null);
  const [currentValue, setCurrentValue] = useState('0');
  const [currentOperation, setCurrentOperation] = useState(null);

  const mapKeys = {
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
    88: {type: 'operation', value: 'exponent'},
    47: {type: 'operation', value: 'division'},
    221: {type: 'operation', value: 'multiply'},
    189: {type: 'operation', value: 'subtract'},
    187: {type: 'operation', value: 'sum'},
    67: {type: 'clear', value: 'clear'},
    8: {type: 'delete', value: null},
    84: {type: 'toggle', value: 'toggle'},
  }

  useEffect(() => {
    function handleKeyPress(event) {
      const keyCode = event.keyCode
      if (mapKeys[keyCode]) {
        processUserInput(mapKeys[keyCode])
      }else if(keyCode === 13){
        processUserInput({type: 'result', value: null})
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const activateButtonWithKeypress = (keyCode) =>{
    //Se ve el clik
    const btn = document.querySelectorAll(`.calculator button[data-keycode="${keyCode}"]`)[0]
    if(btn){
        btn.classList.toggle('active')
        setTimeout(()=>{
            btn.classList.toggle('active')
        }, 150)
    }
  }

  const processUserInput = (userInput) => {
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
            if (event.keyCode === 13) {
                showResult()
            }
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

  const setNumber =(newNumber) =>{
    if (newNumber === '.' && currentValue.includes('.')){
      return;
    }
    setCurrentValue(newNumber)
  }

  const setOperation=(newOperation)=> {
    if (currentOperation !== null && storedResult !== null){
        calculate()
    }
      setStoredResult(currentValue)
      setCurrentValue('0')
      setCurrentOperation(newOperation)
  }

  const deleteNumber =()=>{
    const newValue = currentValue.slice(0,-1)
    setCurrentValue(newValue||'0')
  }

  const blinkDisplay = ()=>{
    const blinkElement = document.querySelector('.calculator-display')
    blinkElement.classList.add('blink')
  
    setTimeout(() => {
      blinkElement.classList.remove('blink')
    }, 150)
  }

  const showResult=()=>{
    if (storedResult !== null){
        calculate()
        updateDisplay() 
      } else {
        blinkDisplay()
      }
  }

  const calculate = () => {
    const a = parseFloat(storedResult,10)
    const b = parseFloat(currentValue,10)
    let resultValue = 0

    switch (currentOperation) {
      case 'multiply':
        resultValue = a*b;
        break
      case 'division':
        resultValue = a/b;
        break
      case 'subtract':
        resultValue = a-b;
        break;
      case 'sum':
        resultValue = a+b
        break
      case 'exponent':
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

  const toggleNumber =()=> {
    setCurrentValue((prevValue) => {
        return (parseFloat(prevValue, 10)*-1) + ''
      })
  }

  const updateDisplay = () => {
    document.querySelector('.calculator-display').innerHTML=currentValue
  }

  return (
    <div className="calculator">
        <div className="calculator-display">{currentValue}</div>
        <div className="calculator-buttons">
            <button className="calculator-button" onClick={() => setNumber('1')}>1</button>
            <button className="calculator-button" onClick={() => setNumber('2')}>2</button>
            <button className="calculator-button" onClick={() => setNumber('3')}>3</button>
            <button className="calculator-button" onClick={() => setNumber('4')}>4</button>
            <button className="calculator-button" onClick={() => setNumber('5')}>5</button>
            <button className="calculator-button" onClick={() => setNumber('6')}>6</button>
            <button className="calculator-button" onClick={() => setNumber('7')}>7</button>
            <button className="calculator-button" onClick={() => setNumber('8')}>8</button>
            <button className="calculator-button" onClick={() => setNumber('9')}>9</button>
            <button className="calculator-button" onClick={() => setNumber('0')}>0</button>
            <button className="calculator-button" onClick={() => setOperation('sum')}>+</button>
            <button className="calculator-button" onClick={() => setOperation('sub')}>-</button>
            <button className="calculator-button" onClick={() => setOperation('mult')}>*</button>
            <button className="calculator-button" onClick={() => setOperation('div')}>/</button>
            <button className="calculator-button" onClick={() => setOperation('exp')}>^</button>
            <button className="calculator-button" onClick={showResult}>=</button>
            <button className="calculator-button" onClick={clearAll}>C</button>
            <button className="calculator-button" onClick={deleteNumber}>DEL</button>
            <button className="calculator-button" onClick={toggleNumber}>+/-</button>
        </div>
  </div>
  )
}

export default Calculator