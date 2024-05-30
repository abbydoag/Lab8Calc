import '@style/App.css'
import React, { useState } from 'react'
import Button from '@components/button.jsx'

const App = () => {
  const [calculatorData, setCalculatorData] = useState({
    maxChar: 10,
    result: null,
    currentValue: '0',
    currentOperation: null,
  })

  const keyMap = {
    48: {type: 'input', value: '0'}, 
    49: {type: 'input', value: '1'},
    50 : {type: 'input', value: '2'},
    51 : {type: 'input', value: '3'},
    52 : {type: 'input', value: '4'},
    53 : {type: 'input', value: '5'},
    54 : {type: 'input', value: '6'},
    55 : {type: 'input', value: '7'},
    56 : {type: 'input', value: '8'},
    57: {type: 'input', value: '9'}, 
    190: {type: 'input', value: '.'},
    187: {type: 'mate', value: 'sum'}, 
    189: {type: 'mate', value: 'sub'}, 
    221: {type: 'mate', value: 'mult'}, 
    47: {type: 'mate', value: 'div'}, 
    88 : {type: 'mate', value: 'exp'},
    8: {type: 'delete', value: null}, // borra
    13: { type: 'result', value: null},
    27: { type: 'clear', value: 'clear'}, //borra todo
    84: {type: 'toggle', value: 'toggle'}
  }
  const calculator = ()=>{
    const a = parseFloat(calculatorData.result, 10)
    const b = parseFloat(calculatorData.currentValue, 10)
    let resultValue = 0

    switch(calculatorData.currentOperation){
      case 'sum':
        resultValue = a+b
      case 'sub':
        resultValue = a-b
      case 'mult':
        resultValue = a*b
      case 'div':
        if(b === 0){
          resultValue = 'ERROR'
        }else{
          resultValue = a/b
        }
      case 'exp':
        resultValue = Math.pow(a,b)
    }
  }
  const handleInput=(userInput)=>{
    if(userInput.type === 'input'){
      setNumb(userInput.value)
    }
    else if(userInput.type === 'mate') {
      setNumb(userInput.value)
    } else if (userInput.type === 'delete') {
      deleteNumber()
    } else if (userInput.type === 'clear') {
      clearAll()
    } else if (userInput.type === 'toggle') {
      toggleNumber()
    } else if (userInput.type === 'result') {
      showResult()
    }
  }
  
  setNumb=(newNumb)=>{
    let currentValue = calculatorData.currentValue
  }
}
export default App