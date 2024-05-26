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
    const op = this.data.currentOperation
    const b = parseFloat(this.data.currentValue, 10)
   }

}