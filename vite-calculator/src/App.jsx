import '@style/App.css'
import React, { useState } from 'react'

const App = () => {
  const [calculatorData, setCalculatorData] = useState({
    maxNums: 10,
    result: null,
    currentValue: 0,
    currentOperation: null,
    calculatorKeys: {
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
      58: {type: 'input', value: '.'},
      // Operaciones
      187: {type: 'mate', value: 'sum'},
      189: {type: 'mate', value: 'sub'},
      221: {type: 'mate', value: 'mult'},
      47: {type: 'mate', value: 'div'},
      88: {type: 'mate', value: 'exp'},
      // Otro
      67: {type: 'C', value: 'clear'},
      13: {type: 'Ans', value: null},
      84: {type: 'Del', value: null},
      8: {type: 'toggle', value: 'toggle'},
    },
  })

  //input teclado
  const keyInput= (keyCode) =>{
    const botn = document.querySelector(`.calculator button[keyboardCode]="${keyCode}"]`)[0]
    if(botn){
      botn.classList.toggle('active')
      setTimeout(() =>{
        botn.classList.toggle('active')
      },160)
    }
   }

  const connectingKey = () =>{
    const botns = document.querySelector('.calculator button')
    const calculatorKeys = calculatorData.calculatorKeys
    Array.from(botns).forEach((botn)=> {
      botn.addEventListener('click', (event) =>{
        this.processInput(calculatorKeys[event.target.dataset.keycode])
      })
    })
  }

  const connectingKeyboard = () =>{
    document.addEventListener('keydown', (event) =>{
      const calculatorKeys = calculatorData.calculatorKeys
      let keyCode = event.keyCode

      if (keyCode === 55 && event.shiftKey){
        keyCode = 47
      }
      if (calculatorKeys[keyCode]){
        processInput(calculatorKeys[keyCode])
        keyInput(keyCode)
      }
    })
  }

  const btnEffect = () =>{
    const effect = document.querySelector('.calculator-display')
    effect.classList.toggle('press')
    setTimeout(()=>{
      effect.classList.toggle('press')
    }, 160)
  }

   //operando
  const calculating = () =>{
    const a = parseFloat(this.data.result, 10)
    const mate = this.data.currentOperation
    const b = parseFloat(this.data.currentValue, 10)
    let result = 0

    //operaciones
    if(calculatorData.currentOperation === 'sum'){
      const sumIssue = 1000000000
      result = (((a*sumIssue)+(b*sumIssue))/sumIssue)
    }
    if(calculatorData.currentOperation === 'sub'){
      result = a-b
    }
    if(calculatorData.currentOperation === 'mult'){
      result = a*b
    }
    if(calculatorData.currentOperation === 'div'){
      result = a/b
      if (a === 0 || b === 0){
        result = "ERROR"
      }
    }
    if(calculatorData.currentOperation === 'exp'){
      result = Math.pow(a,b)
    }
    if(result < 0){
      result = "Error"
    }
    if(result > 999999999){
      result = "Error"
    }
    setCalculatorData({ ...calculatorData, result: null, currentValue: '' + result })
    updateDisplay()
   }

   //limpia todo "C"
  const clearData = () =>{
    setCalculatorData({ ...calculatorData, currentOperation: null, result: null, currentValue: null })
    updateDisplay()
   }

   //limpia
  const clearCurrent = () =>{
    setCalculatorData({ ...calculatorData, currentValue: null })
    updateDisplay()
   }

   //borrar
  const deleteNumber = () =>{
    const b = this.data.currentValue.slice(0, -1)
    if (b ===''){
      this.btnEffect()
      this.clearCurrent()
    }else{
      this.data.currentValue = b
      this.updateDisplay()
    }
  }

  const processInput = (processInput) =>{
    if(processInput.type === 'input'){
      setDigit(processInput.value)
    }
    if(processInput.type === 'mate'){
      setMate(processInput.value)
    }
    if(processInput.type === 'Del'){
      deleteNumber()
    }
    if(processInput.type === 'result'){
      showResult()
    }
    if(processInput.type === 'C'){
      clearData()
    }
    if(processInput.type === 'toggle'){
      toggleNum()
    }
  }

   //efecto al ingreso
   const setDigit = (newDigit) =>{
    let currentValue = this.data.currentValue
    if(newDigit === '.' && currentValue.includes('.')){
      this.btnEffect()
      return
    }
    if(currentValue.lenght === calculatorData.maxNums){
      this.btnEffect()
      return
    }
    if(currentValue === '0' && newDigit === '.'){
      currentValue = '0.'
    }else if (currentValue === '0' && newDigit !== '.'){
      this.btnEffect()
      currentValue = newDigit
    }else{
      currentValue += newDigit
    }
    setCalculatorData({ ...calculatorData, currentValue })
    updateDisplay()
  }

   //operaod
   const setMate = (newMate) => {
    if (calculatorData.currentOperation !== null && calculatorData.result !== null) {
      calculating()
    }
    setCalculatorData({ ...calculatorData, result: calculatorData.currentValue, currentValue: '0', currentOperation: newMate })
  }

  const showResult = () => {
    if (calculatorData.result !== null) {
      calculating()
      updateDisplay()
    } else {
      btnEffect()
    }
  }

  const toggleNum = () => {
    setCalculatorData({ ...calculatorData, currentValue: parseFloat(calculatorData.currentValue, 10) * -1 })
    updateDisplay()
  }

  const updateDisplay = () => {
    document.querySelector('.calculator-display').innerHTML = calculatorData.currentValue
  }

  const start = () => {
    updateDisplay()
    connectingKey()
    connectingKeyboard()
  }

  return (
    <div class="container">
    <div class="calculator">
      <div class="calculator-display">0</div>
      <div class="calculator-keyboard">
        <div class="calculator-keyboard_container_numbers">
          <button class="calculator-keyboard_number_key" type="button" data-keycode="67" value="clear">C</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="84" value="toggle">&#8314;&#8725;&#8331;</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="88" value="exponent">%</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="190" value=".">.</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="48" value="0">0</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="49" value="1">1</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="50" value="2">2</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="51" value="3">3</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="52" value="4">4</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="53" value="5">5</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="54" value="6">6</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="55" value="7">7</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="56" value="8">8</button>
          <button class="calculator-keyboard_number_key" type="button" data-keycode="57" value="9">9</button>
        </div>
        <div class="calculator-keyboard_container_operators">
          <button class="calculator-keyboard_operator_key" type="button" data-keycode="47" value="div">÷</button>
          <button class="calculator-keyboard_operator_key" type="button" data-keycode="221" value="mult"><span>×</span></button>
          <button class="calculator-keyboard_operator_key" type="button" data-keycode="189" value="subtract">−</button>
          <button class="calculator-keyboard_operator_key" type="button" data-keycode="187" value="sum">+</button>
          <button class="calculator-keyboard_operator_key" type="button" data-keycode="13" value="result">=</button>
        </div>
      </div>
    </div>
  </div>

  )
}
export default App