import '@style/App.css'
import React, { useState } from 'react'
import Button from '@components/button.jsx'

const App = () => {
  const [calculatorData, setCalculatorData] = useState({
    result: '0',
    currentValue: '',
    currentOperation: '',
  })

  const keyMap = {
    48: { type: 'input', value: '0' }, 
    49: { type: 'input', value: '1' },
    50 : { type: 'input', value: '2' },
    51 : { type: 'input', value: '3' },
    52 : { type: 'input', value: '4' },
    53 : { type: 'input', value: '5' },
    54 : { type: 'input', value: '6' },
    55 : { type: 'input', value: '7' },
    56 : { type: 'input', value: '8' },
    57: { type: 'input', value: '9' }, 
    190: { type: 'input', value: '.' }, 
  
    111: { type: 'mate', value: '/' }, 
    107: { type: 'mate', value: '+' }, 
    109: { type: 'mate', value: '-' }, 
    106: { type: 'mate', value: '*' }, 
  
    8: { type: 'Del' }, // borra
    13: { type: 'result' }, // =
    27: { type: 'C' }, //borra todo
  };
  

  const handleNum = (value) => {
    setCalculatorData({ ...calculatorData, currentValue: calculatorData.currentValue + value });
  }
  
  const handleSum = () => {
    const a = parseFloat(calculatorData.result, 10)
    const b = parseFloat(calculatorData.currentValue, 10)
    const result = a + b

    setCalculatorData({ ...calculatorData, currentOperation: 'sum', result: result, currentValue: '' });
    updateDisplay();
  }

  const handleSub= () => {
    const a = parseFloat(calculatorData.result, 10)
    const b = parseFloat(calculatorData.currentValue, 10)
    const result = a - b
  }

  const handleMult = () => {
    const a = parseFloat(calculatorData.result, 10)
    const b = parseFloat(calculatorData.currentValue, 10)
    const result = a * b
  }

  const handleDiv = () => {
    const a = parseFloat(calculatorData.result, 10)
    const b = parseFloat(calculatorData.currentValue, 10)
    if(b === 0){
      setCalculatorData({ ...calculatorData, result: 'ERROR' })
      return
    }
    const result = a/b

    setCalculatorData({ ...calculatorData, currentOperation: 'div', result: result.toString(), currentValue: '' })
    updateDisplay()
  }

  const handleClear = () => {
    setCalculatorData({ result: '0', currentValue: '', currentOperation: '' })
  }

  const handleToggle= () => {
    const currentValue = calculatorData.currentValue
    let newValue

    if (currentValue.startsWith('-')) {
      newValue = currentValue.slice(1) //quita -
    } else {
      newValue = '-' + currentValue // da +
    }

    setCalculatorData({ ...calculatorData, currentValue: newValue })
  }

  const handleEquals = () => {
    if (calculatorData.currentOperation === 'sum') {
      handleSum()
    } else if (calculatorData.currentOperation === 'sub') {
      handleSub()
    } else if (calculatorData.currentOperation === 'mult') {
      handleMult()
    } else if (calculatorData.currentOperation === 'div') {
      handleDiv()
    }
  }

  // Update display
  const updateDisplay = () => {
    
  }

  if (currentResult.startsWith('-')) {
    displayValue = 'ERROR' //x<0
  if (currentResult.length > 9) {
      displayValue = 'ERROR'; //+9
    }

  // Tecla input
  useEffect(() => {
    const handleKeyboardInput = (event) => {
      const keyCode = event.keyCode
      
      const processInputValue = keyMap[keyCode]
      if (processInputValue) {
        processInput(processInputValue)
      }
    }

    document.addEventListener('keydown', handleKeyboardInput)

    return () => document.removeEventListener('keydown', handleKeyboardInput) // C
  }, [])  

  const processInput = (processInput) => {
    if (processInput.type === 'input') {
      handleNum(processInput.value);
    } else if (processInput.type === 'mate') {
      // operaciones elect
      if (processInput.value === '+') {
        handleSum()
      } else if (processInput.value === '-') {
        handleSub()
      } else if (processInput.value === '*') {
        handleMult()
      } else if (processInput.value === '/') {
        handleDiv()
      }
    } else if (processInput.type === 'Del') {
    } else if (processInput.type === 'result') {
      handleEquals()
    } else if (processInput.type === 'C') {
      handleClear()
    } else if (processInput.type === 'toggle') {
      handleToggle()
    }
    const processInputValue = keyMap[keyCode]
  }

  return (
    <div className="container">
      <div className="calculator">
        <div className="calculator-display">{calculatorData.result}</div>
        <div className="calculator-keyboard">
          <div className="calculator-keyboard_container_numbers">
            <Button value="7" onClick={() => processInput({ type: 'input', value: '7' })} />
            
            <Button value="C" onClick={handleClear} style={{ backgroundColor: 'red' }} />
          </div>
          <div className="calculator-keyboard_container_operators">
            <Button value="+" onClick={handleSum} data-keycode="107" />
            
            <Button value="=" onClick={handleEquals} data-keycode="13" />
          </div>
        </div>
      </div>
    </div>
  )
}
}
export default App