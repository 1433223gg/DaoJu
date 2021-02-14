export {num}
var num
// 生成 min~max区间的随机整数
function randomInt(min,max){
    return Math.round(Math.random()*(max-min))+min
  }
// 生成6位随机验证码
function randomCode(){
    var num = ''
    for (var i = 0, len = 6; i < len; i++){
      do {
        var ascii = randomInt(48,122)
      } while(ascii>57&&ascii<65 || ascii>90&&ascii<97)
      num += String.fromCharCode(ascii)
    }
    return num
  }

setInterval(function(){
    num = randomCode()
},3000)

