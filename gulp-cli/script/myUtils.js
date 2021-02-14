// 冒泡排序
function popSort(arr) {
    for (var n = 0, len = arr.length; n < len - 1; n++) {
        for (var i = 0, len = arr.length; i < len - (n + 1); i++) {
            if (arr[i] > arr[i + 1]) {
                var cen = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = cen
            }
        }
    }
    return arr
}

// 选择排序
function selectSort(arr) {
    for (var n = 0, len = arr.length; n < len - 1; n++) {
        var min = arr[n];
        var index = n;
        for (var i = n + 1, len = arr.length; i < len; i++) {
            if (min > arr[i]) {
                min = arr[i]
                index = i
            }
        }
        var tmp = arr[n]
        arr[n] = min
        arr[index] = tmp

    } return arr
}

// 桶排序
function caskSort(arr) {
    var cask = []
    for (var i = 0, len = arr.length; i < len; i++) {
        var len_index = arr[i]
        // console.log(len_index)
        cask[len_index] = 'water'
        // }console.log(cask)
    }
    arr.length = 0
    for (var index in cask) {//遍历出来index的都是下标
        arr.push(parseInt(index))
    }
    // console.log(arr)
    return arr
}

// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) {//出口
        return arr
    }
    // 1.找中点（元素及下标）
    var index = parseInt(arr.length / 2)//2
    var middle = arr[index]
    // 2.分左右
    var left = []// [11,8,2,6]
    var right = []
    for (var i = 0; i < arr.length; i++) {
        if (index == i) {
            continue // 如果是中点，跳过本次循环
        }
        if (middle < arr[i]) {//与中点比较，分左右
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    // console.log( left.concat([middle],right) )
    return quickSort(left).concat([middle], quickSort(right))
}

// 生成 min~max区间的随机整数
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}
// 生成随机16进制颜色值
function randomColor() {
    var str = '0123456789abcdef'// 0-15
    var color = '#'
    for (var i = 0, len = 6; i < len; i++) {
        var index = randomInt(0, 15)
        color += str[index]
    }
    return color
}
// 生成n位随机验证码（数字、字母（大小））
function randomCode(n) {
    var num = ''
    for (var i = 0, len = n; i < len; i++) {
        do {
            var ascii = randomInt(48, 122)
        } while (ascii > 57 && ascii < 65 || ascii > 90 && ascii < 97)
        num += String.fromCharCode(ascii)
    }
    return num
}

// 生成min-max位随机验证码（数字、字母（大小））
// function randomCode(min, max) {
//     function randomInt(min, max) {
//         num = Math.round(Math.random() * (max - min)) + min
//         return num
//     }
//     n = randomInt(min, max)
//     // var str=''
//     var str = []
//     for (var i = 0; i < n; i++) {
//         do {
//             num = randomInt(48, 123)
//         } while (num > 57 && num < 65 || num > 90 && num < 97)
//         // str += String.fromCharCode(num)
//         str.push(String.fromCharCode(num))
//     }
//     // console.log(str)
//     // console.log(str.join(''))
//     return str.join('')
// }

// 判断数组中是否包含某个值
function has(arr, val) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == val) {
            return true
        }
    }
    return false
}
// 数组去重
function norepeat(arr) {
    var arr1 = []
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!has(arr1, arr[i])) {
            arr1.push(arr[i])
        }
    }
    return arr1
}

// 获取第一个元素子节点
function getFirstChild(dom) {
    if (dom.firstElementChild) {
        return dom.firstElementChild
    } else {
        return dom.firstChild
    }
}
// 获取最后一个元素子节点
function getLastChild(dom) {
    if (dom.lastElementChild) {
        return dom.lastElementChild
    } else {
        return dom.lastChild
    }
}
// 获取下一个兄弟子节点
function getNextNode(dom) {
    if (dom.nextElementSibling) {
        return dom.nextElementSibling
    } else {
        return dom.nextSibling
    }
}
// 获取上一个兄弟子节点
function getPreviousNode(dom) {
    if (dom.previousElementSibling) {
        return dom.previousElementSibling
    } else {
        return dom.previousSibling
    }
}

// dom获取元素样式 兼容IE678
function getStyle(dom, attr) {
    if (dom.currentStyle) {
        return dom.currentStyle[attr]
    } else {
        return getComputedStyle(dom)[attr]
    }
}

// ***************************************
// **
//** 封装一个函数，通过类名获取元素（兼容谷歌、火狐、IE678）
// 获取所有元素： var all = document.all || document.getElementsByTagName('*');
function byClass(thisClass) {
    // var thisClass = 'num'
    var all = document.all ? document.all : document.getElementsByTagName('*');
    var arr = []
    // console.log(all[8]);
    var reg = new RegExp('\\b'+thisClass+'\\b')
    for (var i = 0, len = all.length; i < len; i++) {
        if (reg.test(all[i].className)) {//'box1 red'
            arr.push(all[i])
        }
    }
    return arr
}

// ***************************************
// **
// 添加事件监听（兼容低本版IE）
function addEvent(dom,type,callback){
    if (dom.addEventListener) {
      dom.addEventListener(type,callback)
    } else {
      dom.attachEvent('on'+type,callback)
    }
  }
  // 移除事件监听（兼容低本版IE）
  function removeEvent(dom,type,callback){
    if (dom.removeEventListener) {
      dom.removeEventListener(type,callback)
    } else {
      dom.detachEvent('on'+type,callback)
    }
  }


//********************** */
// 识别浏览器
// var str = navigator.userAgent.toLowerCase()
// if (str.indexOf('chrome')!==-1) {
//   alert('谷歌浏览器')
// }
// **********************


// ***************************************
// **添加事件
// 添加事件监听（兼容低本版IE）
// function addEvent(dom,type,callback){
//     if (dom.addEventListener) {
//       dom.addEventListener(type,callback)
//     } else {
//       dom.attachEvent('on'+type,callback)
//     }
//   }
//   function on(parent,type,selector,callback){
//     // 1.给父级绑定事件
//     addEvent(parent,type,function (ev){//父级的事件处理函数
//       var e = ev || event//事件对象
//       var target = e.target || e.srcElement//事件源
//       // 获取选择器第一个字符
//       var selector_first = selector.substr(0,1)
//       // 记录选择器第一个字符后面的内容
//       var selector_last = null
//       // 记录选择器类型（id class 标签）
//       var selector_type = null
//       // 根据第一个字符判断选择器类型
//       switch(selector_first){
//         case '.':
//           selector_type = 'className'
//           selector_last = selector.slice(1)//'tit'
//           break
//         case '#':
//           selector_type = 'id'
//           selector_last = selector.slice(1)//'tit'
//           break
//         default:
//           selector_type = 'tagName'
//           selector_last = selector.toUpperCase()//'EM'
//       }
//       // if (target.tagName === selector.toUpperCase()){
//       //   callback()
//       // }
//       // 判断点击元素是否为你希望触发事件的元素
//       if (target[selector_type] === selector_last){
//         callback.call(target,e)
//       }
//     })
//   }
  
// *************************
// 获取某个元素到最外层左侧/顶部的距离
function offset(dom,bool){
    var l = 0
    var t = 0
    var domBDL = dom.clientLeft
    var domBDT = dom.clientTop
    while(dom){
      l += dom.clientLeft+dom.offsetLeft
      t += dom.clientTop+dom.offsetTop
      dom = dom.offsetParent
    }
    // return [l,t]
    if (bool) {// 带自身边框
      return {left: l,top: t}
    } else {// 不带自身边框
      return {left: l-domBDL,top: t-domBDT}
    }
  }

// ***********************************
/** 
* 运动函数
* 参数：
*   dom 要运动的元素 （需要先获取元素）
*   attrObj 从当前属性要运动到的目标属性位置 (可以是对象)如：
*  {
*    'width': 200,
*    'height': 200,
*    'left': 532,
*    'top': 500,
*    'opacity':0.5,
*    'scrollTop':100,
*  }
*   callback 运动完成的回调函数
* 支持功能：
*   支持多个带px单位的属性：left top right bottom marginLeft marginTop width height ...
*   支持运动到任意位置
*   支持透明度运动
*   支持滚动条运动
*   支持多元素运动
*   支持多属性同时运动
*   支持运动完成之后进行其他操作（回调函数）
*/
function animate(dom,attrObj,callback){
    for(var key in attrObj){
      // 判断要运动的属性
      if (key === 'opacity') {
        var current = parseInt( getComputedStyle(dom)[key]*100 )
        var target = attrObj[key]*100
      } else if (key.indexOf('scroll') !== -1) {
        var current = dom[key]// wrap.scrollTop
        var target = attrObj[key]
      } else {
        var current = parseInt( getComputedStyle(dom)[key] )
        var target = attrObj[key]
      }
      attrObj[key] = {
        'current': current,
        'target': target
      }
    }
  
    clearInterval(dom.timer)
    dom.timer = setInterval(function (){
      for (var key in attrObj){
        // 当前属性 key
        // key属性的当前值 attrObj[key].current
        var current = attrObj[key].current
        // key属性的目标值 attrObj[key].target
        var target = attrObj[key].target
  
        // 持续变化的速度
        var speed = (target-current)/10
        // 根据运动方向进行取整
        speed = speed>0?Math.ceil(speed):Math.floor(speed)
  
        // 当前位置+速度
        attrObj[key].current+=speed
  
        // 临界值判断(运动停止条件：剩余运动量 <= 每次的运动量)
        if ( Math.abs(target-current) <= Math.abs(speed) ) {
          attrObj[key].current = target//到达目的地
          
          // 删除运动完成的属性
          delete attrObj[key]
  
          // 判断对象中是否还有其他属性
          for (var attr in attrObj){//{}
            // 能执行进来说明对象还有其他属性
            return false//终止当前函数执行
          }
          
          // 所有属性运动完成，清除计时器
          clearInterval(dom.timer)
  
          // 运动完成执行回调函数
          typeof callback === 'function'?callback():''
        } else {
          // 持续改变运动属性
          if (key === 'opacity') {
            dom.style[key] = attrObj[key].current/100
          } else if (key.indexOf('scroll') !== -1) {
            dom[key] = attrObj[key].current
          } else {
            dom.style[key] = attrObj[key].current + 'px'
          }
        }
      }
    },20)
  }

  //**
//*选项卡切换  
//*使用方式：
//*  var reg = tab({
//*   tits: '.tab1 .header h3', //事件绑定标签
//*  titClass:'active',  //事件绑定标签class切换名
//*  cons: '.tab1 .content div', //跟随改变标签
//*  conClass:'show',  //跟随改变标签class切换名
//*  eventType:'click',  //使用事件名
//*  initCtrl:true   //选择是否按下标初始化
//*  initIndex: 1    //初始化下标
//* })
//*功能：
//*     tits进行操作，修改class
//*     对应cons跟随修改class
//*     eventType为onmouseneter时，自动添加onmouseleave
(function(){
    function Tab(options){
        this.init(options)//初始化
    }
    Tab.prototype = {
        constructor:Tab,
        init:function(options){
            //初始化索引
            this.preindex = options.initIndex||0
            //获取元素
            this.changeClass = this.getElement(options.tits)
            this.followClass = this.getElement(options.cons)
            //初始化时显示对应索引的效果
            this.titClass = options.titClass
            this.conClass = options.conClass
            this.eventType = options.eventType
            //是否按照下标先进行初始化
            if(options.initCtrl==true){
                this.setClass(this.changeClass[this.preindex],this.titClass)
                this.setClass(this.followClass[this.preindex],this.conClass)
            }
            //添加事件
            this.addEvents(this.eventType)
        },
        getElement:function(selector){
            return document.querySelectorAll(selector)
        },
        setClass:function(dom,oClass){
            // console.log(dom.className)
            dom.className = oClass 
        },
        addEvents:function(type){
            var _this = this
            for(var i=0,len=this.changeClass.length;i<len;i++){
                addEvent(this.changeClass[i],type,function(index){
                      // this -> 点击的元素 -> 实例对象
                    // 1.清除上次选中元素的类名
                    this.setClass(this.changeClass[this.preindex],'')
                    this.setClass(this.followClass[this.preindex],'')
                    // 2.给当前点击的元素添加类名
                    this.setClass(this.changeClass[index], _this.titClass)
                    this.setClass(this.followClass[index], _this.conClass)
                    console.log('imin')
                    // 3.更新上次选中的索引
                    this.preindex = index
                }.bind(this,i))
                if(this.eventType == 'mouseenter'){
                  _this.changeClass[i].onmouseleave =function(){
                _this.setClass(_this.changeClass[_this.preindex], '')
                _this.setClass(_this.followClass[_this.preindex], '')
                }
              }
            }
        },
        getIndex: function (){
            return this.preindex
        }
    }

    function factory(options){
        return new Tab(options)
    }
    window.tab = factory
})()



/**
*ajax数据获取处理封装
*封装函数名： ajax()t
*使用方式：//对应接口文档
* ajax({
    url:'',   //数据地址
    type:'get',    //请求方式 支持post/get
    data:'user=123&pass=456', //传参
    //data:{user:'123',pass:'123456'},   //支持对象类型
    dataType:'text',    //支持'json','xml','jsonp','text'
    //jsonp:'cb',    //jsonp回调函数的参数
    //jsonpCallback:'hehe',   //回调函数名（自定义）
    success: function(data){  //请求成功执行的回调函数，data为返回值
    },
    // error: function(err){   //请求失败执行的回调函数，err为返回值
    // }
  })
*/
/* 
接口文档
url: 'http://127.0.0.1/jsontest/test1/data/post.php'
type: 'post'
params:
  user 账号
  pass 密码
返回值：
  '{"err":1,"msg":"登录成功"}'
*/
export function ajax(options){
  if(options.dataType.toLowerCase() ==='jsonp'){
    console.log('找到jsonp啦')
    // 把success添加为全局方法hehe
    window[options.jsonpCallback] = options.success

    // 格式data数据
    var data = ''
    if (typeof options.data === 'string') {
    data = options.data
    }
    if (Object.prototype.toString.call(options.data) === '[object Object]') {
    for (var key in options.data){
      data += (key+'='+options.data[key]+'&')
    }
    data = data.substring(0,data.length-1)
    }

    // 动态添加script标签
    var oScript = document.createElement('script')
    oScript.src = options.url+'?'+options.jsonp+'='+options.jsonpCallback+'&'+data
    // 'http://suggestion.baidu.com/su?cb=hehe&wd='+ipt.value
    document.body.appendChild(oScript)
    // 数据加载完成删除 script 标签
    oScript.onload = function (){
    document.body.removeChild(oScript)
    }
  }else{
    // 1.创建数据交互对象（XMLHttpRequest）
    var xhr = new XMLHttpRequest()//除了IE56其他都支持

    var data = ''
    if (typeof options.data === 'string'){
      // 如果参数是字符串不做任何处理
      data = options.data
    }
    if (Object.prototype.toString.call(options.data) === '[object Object]'){
      // 如果参数是对象，转成参数字符串 'user=xiaocuo&pass=123456'
      for (var key in options.data){
        data += (key+'='+options.data[key]+'&')
      }
      // 'user=xiaocuo&pass=123456&'
      data = data.substring(0,data.length-1)
    }
    // console.log(data)//'user=xiaocuo&pass=123456'

    if (options.type.toLowerCase() === 'get') {
      // 2.初始化请求
      if (options.cache) {
        xhr.open(options.type,options.url+'?'+data,true)
      } else {
        xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true)
      }
      // 3.发送请求
      xhr.send(null)
    } else if (options.type.toLowerCase() === 'post'){
      // 2.初始化请求
      xhr.open(options.type,options.url,true)
      // 设置请求头，模拟表单post提交数据
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
      // 3.发送请求
      xhr.send(data)
    } else {
      alert('仅支持 get和post 请求方式！')
      return //结束执行
    }

    // 4.请求响应状态
    // xhr.readyState 属性值会从0-4发送变化
    // 当xhr.readyState属性发生变化时，会触发onreadystatechange事件
    xhr.onreadystatechange = function (){
      // console.log( xhr.readyState )//2 3 4
      if (xhr.readyState === 4) {//请求完成
        // 响应状态码 xhr.status
        if (xhr.status >=200 && xhr.status < 300) {// 响应就绪
          // 可以拿到数据了
          // xhr.responseText  接收文本字符串数据
          // xhr.responseXML  接收xml数据
          if (options.dataType === 'json') {
            var json = JSON.parse(xhr.responseText)
            options.success(json)
          } else if (options.dataType === 'xml') {
            options.success(xhr.responseXML)
          } else {
            options.success(xhr.responseText)
          }
          } else {
          options.error(xhr.status)
         }
        }
      }
    }
  }

// 
// 可处理异步问题的Ajax
// 
function promiseAjax(options){
  return new Promise(function (resolve,reject){
    if(options.dataType.toLowerCase() ==='jsonp'){
      console.log('找到jsonp啦')
      // 把success添加为全局方法hehe
      window[options.jsonpCallback] = options.success
  
      // 格式data数据
      var data = ''
      if (typeof options.data === 'string') {
      data = options.data
      }
      if (Object.prototype.toString.call(options.data) === '[object Object]') {
      for (var key in options.data){
        data += (key+'='+options.data[key]+'&')
      }
      data = data.substring(0,data.length-1)
      }
  
      // 动态添加script标签
      var oScript = document.createElement('script')
      oScript.src = options.url+'?'+options.jsonp+'='+options.jsonpCallback+'&'+data
      // 'http://suggestion.baidu.com/su?cb=hehe&wd='+ipt.value
      document.body.appendChild(oScript)
      // 数据加载完成删除 script 标签
      oScript.onload = function (){
      document.body.removeChild(oScript)
      }
    }else{
      // 1.创建数据交互对象（XMLHttpRequest）
      var xhr = new XMLHttpRequest()//除了IE56其他都支持
  
      var data = ''
      if (typeof options.data === 'string'){
        // 如果参数是字符串不做任何处理
        data = options.data
      }
      if (Object.prototype.toString.call(options.data) === '[object Object]'){
        // 如果参数是对象，转成参数字符串 'user=xiaocuo&pass=123456'
        for (var key in options.data){
          data += (key+'='+options.data[key]+'&')
        }
        // 'user=xiaocuo&pass=123456&'
        data = data.substring(0,data.length-1)
      }
      // console.log(data)//'user=xiaocuo&pass=123456'
  
      if (options.type.toLowerCase() === 'get') {
        // 2.初始化请求
        if (options.cache) {
          xhr.open(options.type,options.url+'?'+data,true)
        } else {
          xhr.open(options.type,options.url+'?'+data+'&_='+Date.now(),true)
        }
        // 3.发送请求
        xhr.send(null)
      } else if (options.type.toLowerCase() === 'post'){
        // 2.初始化请求
        xhr.open(options.type,options.url,true)
        // 设置请求头，模拟表单post提交数据
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        // 3.发送请求
        xhr.send(data)
      } else {
        alert('仅支持 get和post 请求方式！')
        return //结束执行
      }
  
      // 4.请求响应状态
      // xhr.readyState 属性值会从0-4发送变化
      // 当xhr.readyState属性发生变化时，会触发onreadystatechange事件
      xhr.onreadystatechange = function (){
        // console.log( xhr.readyState )//2 3 4
        if (xhr.readyState === 4) {//请求完成
          // 响应状态码 xhr.status
          if (xhr.status >=200 && xhr.status < 300) {// 响应就绪
            // 可以拿到数据了
            // xhr.responseText  接收文本字符串数据
            // xhr.responseXML  接收xml数据
            if (options.dataType === 'json') {
              var json = JSON.parse(xhr.responseText)
              resolve(json)
            } else if (options.dataType === 'xml') {
              resolve(xhr.responseXML)
            } else {
              resolve(xhr.responseText)
            }
            } else {
              reject(xhr.status)
            }
          }
        }
      }
  })
}