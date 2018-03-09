// pages/caculator/caculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        displayValue:"0",
        num: [],
        caculateResult:null,
        operate:null,
        waitingForOperate: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.calculatorOperations = {
      'key-divide': (prevValue, nextValue) => prevValue / nextValue,
      'key-multiply': (prevValue, nextValue) => prevValue * nextValue,
      'key-add': (prevValue, nextValue) => prevValue + nextValue,
      'key-subtract': (prevValue, nextValue) => prevValue - nextValue,
      'key-equals': (prevValue, nextValue) => nextValue
    }
  },

  /**
   * AC操作
   */
  clearAll(){
    this.setData({
      displayValue: "0",
      caculateResult:null,
      operate:null,
      waitingForOperate: false
    });
  },

  clearDisplay(){
    this.setData({
      displayValue:'0'
    })
  },

  onTapFunction:function(event){
    const key = event.target.dataset.key;
    switch(key){
      case 'key-clear':
        if(this.data.displayValue !== '0'){
          this.clearDisplay();
        }else{
          this.clearAll();
        }
      break;
      case 'key-sign':
        var newValue = parseFloat(this.data.displayValue)*-1
        this.setData({
          displayValue:String(newValue)
        })
      break;
      case 'key-percent':
        const fixedDigits = this.data.displayValue.replace(/^-?\d*\.?/,'')
        var newValue = parseFloat(this.data.displayValue)/100
        this.setData({
          displayValue:String(newValue.toFixed(fixedDigits.length+2))
        });
      break;
    }
  },

  /**
   * 数字键操作区域
   */
  onTapDigit:function(event){
    const inputValue = this.data.displayValue;
    console.log("inputValue.length: " + inputValue.length)
    if (inputValue != null && inputValue.length >= 9) {
      console.log("最多只能显示" + inputValue.length + "位")
      return
    }
    const key = event.target.dataset.key;
    console.log("you input " + key[key.length - 1])
    if(key == 'key-dot'){
      if (!(/\./).test(this.data.displayValue)){
        this.setData({
          displayValue: this.data.displayValue + '.',
          waitingForOperate:false
        })
      }
    }else{
      const digit = key[key.length-1];
      if(this.data.waitingForOperate){
        this.setData({
          displayValue:String(digit),
          waitingForOperate:false
        })
      }else{
        this.setData({
          displayValue:this.data.displayValue === '0' ? String(digit) : this.data.displayValue + digit
        })
      }
    }
  },
  
  onTapOperator:function(event){
    const operator = event.target.dataset.key;
    const inputValue = parseFloat(this.data.displayValue);
    if(inputValue == null){
      this.setData({
        caculateResult:inputValue
      })
    }else if(this.data.operate){
      const currentValue = this.data.caculateResult || 0;
      console.log("this.data.operate:"+this.data.operate)
      const newValue = this.calculatorOperations[this.data.operate](currentValue,inputValue);
      this.setData({
        caculateResult:newValue,
        displayValue:String(newValue)
      })
    }
    this.setData({
      waitingForOperate:true,
      operate:operator
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})