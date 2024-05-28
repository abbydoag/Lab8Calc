let calculator = {
  data: {
    maxNums: 10,
    result: null,
    currentValue: 0,
    currentOperation: null,

    calculatorKeys:{
      48: {type:'input', value:'0'},
      49: {type:'input', value:'1'},
      50: {type:'input', value:'2'},
      51: {type:'input', value:'3'},
      52: {type:'input', value:'4'},
      53: {type:'input', value:'5'},
      54: {type:'input', value:'6'},
      55: {type:'input', value:'7'},
      56: {type:'input', value:'8'},
      57: {type:'input', value:'9'},
      58: {type:'input', value:'.'},
      //Opecaiones
      187: {type: 'mate', value:'sum'},
      189: {type: 'mate', value:'sub'}, 
      221: {type: 'mate', value:'mult'},
      47: {type: 'mate', value:'div'},
      88: {type: 'mate', value:'exp'},
      //Otros
      67: {type: 'C', value:'clear'},
      13: {type: 'Ans', value: null},
      84: {type: 'Del', value: null},
      8: {type: 'toggle', value: 'toggle'},
    },
  },

  //input teclado
   keyInput(keyCode){
    const botn = document.querySelector(`.calculator button[keyboardCode]="${keyCode}"]`)[0]
    if(botn){
      botn.classList.toggle('active')
      setTimeout(() =>{
        botn.classList.toggle('active')
      },160)
    }
   },

   connectingKey(){
    const botns = document.querySelector('.calculator button')
    const calculatorKeys = calculator.data.calculatorKeys
    Array.from(botns).forEach((botn)=> {
      botn.addEventListener('click', (event) =>{
        this.processInput(calculatorKeys[event.target.dataset.keycode])
      })
    })
   },

   connectingKeyboard(){
    document.addEventListener('keydown', (event =>{
      const calculatorKeys = calculator.data.calculatorKeys
      let keyCode = event.keyCode

      if (keyCode === 55 && event.shiftKey){
        keyCode = 47
      }
      if (calculatorKeys[keyCode]){
        this.processInput(calculatorKeys[keyCode])
        this.keyInput(keyCode)
      }
    }))
   },

   btnEffect(){
    const effect = document.querySelector('.calculator-display')
    effect.classList.toggle('press')
    setTimeout(()=>{
      effect.classList.toggle('press')
    }, 160)
   },

   //operando
   calculating(){
    const a = parseFloat(this.data.result, 10)
    const mate = this.data.currentOperation
    const b = parseFloat(this.data.currentValue, 10)
    let result = 0

    //operaciones
    if(this.data.currentOperation === 'sum'){
      const sumIssue = 1000000000
      result = (((a*sumIssue)+(b*sumIssue))/sumIssue)
    }
    if(this.data.currentOperation === 'sub'){
      result = a-b
    }
    if(this.data.currentOperation === 'mult'){
      result = a*b
    }
    if(this.data.currentOperation === 'div'){
      result = a/b
      if (a === 0 || b === 0){
        result = "ERROR"
      }
    }
    if(this.data.currentOperation === 'exp'){
      result = Math.pow(a,b)
    }
    if(result < 0){
      result = "Error"
    }
    if(result > 999999999){
      result = "Error"
    }
    this.data.result = null
    this.data.currentValue = ''+ result
    this.updateDisplay()
   },

   //limpia todo "C"
   clearData(){
    this.data.currentOperation = null
    this.data.result = null
    this.data.currentValue = null
    this.updateDisplay()
   },

   //limpia
   clearCurrent(){
    this.data.currentValue = null
    this.updateDisplay()
   },

   //borrar
   delete(){
    const b = this.data.currentValue.slice(0, -1)
    if (b ===''){
      this.btnEffect()
      this.clearCurrent()
    }else{
      this.data.currentValue = b
      this.updateDisplay()
    }
   },

   userInput(processInput){
    if(processInput.type === 'input'){
      this.setDigit(processInput.value)
    }
    if(processInput.type === 'mate'){
      this.setMate(processInput.value)
    }
    if(processInput.type === 'Del'){
      this.delete()
    }
    if(processInput.type === 'result'){
      this.showResult()
    }
    if(processInput.type === 'C'){
      this.clearData()
    }
    if(processInput.type === 'toggle'){
      this.toggleNum()
    }
   },

   //efecto al ingreso
   setDigit(newDigit){
    let currentValue = this.data.currentValue
    if(newDigit === '.' && currentValue.includes('.')){
      this.btnEffect()
      return
    }
    if(currentValue.lenght === this.data.maxNums){
      this.btnEffect()
      return
    }
   }
}