// import './jquery-1.8.3.js'
// *************登录验证(通用)**************
// 验证登录状态
if (localStorage.getItem('user_message')) {
    // alert('ok')
    let goodsArr = JSON.parse( localStorage.getItem('user_message') )
    let arr1 = `
    当前用户：${goodsArr.user}<br>
    欢迎您购买超值商品！
    `
    let arr2 = `
    欢迎回来！${goodsArr.user}
    <span class="exit">退出登录</span>
    `
    $('#mainer .login p').html(arr1)
    $('#top .top_1 .right p').html(arr2)
    // login().toggle('none')
  }


// 单例模式生成登录框
(function (){
    function Login(){
      this.init()
    }
    Login.prototype = {
      constructor: Login,
      init: function (){
        this.login = document.createElement('div')
        this.login.className = 'login_box'
        this.login.innerHTML = `
        <span class="close"></span>
        <h2>账号密码登录</h2>
        <h3>推荐使用快速安全登录，防止盗号</h3>
        <p><input type="text" class="user" placeholder="支持QQ号/邮箱/手机号登录"></p>
        <p><input type="password" class="pass" placeholder="密码"></p>
        <p class="submit">登录</p>
        <a href="./login.html">没有账号？点击这里注册</a>
        `
        document.body.appendChild(this.login)
        this.cacheElement()
      },
      cacheElement: function (){
        this.close = this.login.querySelector('.close')
        this.user = this.login.querySelector('.user')
        this.pass = this.login.querySelector('.pass')
        this.submit = this.login.querySelector('.submit')
        this.addEvent()
      },
      addEvent: function (){
        var _this = this
        this.close.onclick = function (){
          _this.toggle('none')
        }
        this.submit.onclick = function (){
        //   console.log('账号：'+_this.user.value,'密码：'+_this.pass.value)
            // 请求获取用户名密码信息
            $.ajax({
                url: './data/user_message.json',
                type: 'get',
                dataType: 'json',
                cache: false,
                success: function (json){
                    let num = 0
                    // console.log(json);
                    $.each(json,function (index,item){
                        let user = item.username
                        let pass = item.password 
                        // console.log(user);
                        if(user === _this.user.value && pass === _this.pass.value){
                            num = 1
                        }
                    })
                    if(num === 1){
                        alert('登录成功！')
                        let arr1 = `
                        当前用户：${_this.user.value}<br>
                        欢迎您购买超值商品！
                        `
                        let arr2 = `
                        欢迎回来！${_this.user.value}
                        <span class="exit">退出登录</span>
                        `
                        $('#mainer .login p').html(arr1)
                        $('#top .top_1 .right p').html(arr2)
                        _this.toggle('none')

                        let user_message = {
                            "user":_this.user.value,
                            "pass":_this.pass.value
                        }
                        // 数据更新到本地存储
                        localStorage.setItem('user_message', JSON.stringify(user_message) )
                        return
                    }else{
                        alert('用户名或密码错误！')
                    }
                }
            })
        }
      },
      toggle: function (attr){
        this.login.style.display = attr
      }
    }
    //管理单例的逻辑
    var getSingle = function (constructor){
      var instance//保存实例对象
      return function (){
        if (instance) {
          return instance//返回第一次的实例对象
        }
        return instance = new constructor()
        // return instance||(instance = new constructor())
      }
    }
    window.login = getSingle(Login)
  })($)

$('#top .top_1 .right p .log').on('click',function(){
    // alert('登录')
    login().toggle('block')
    // login().password = 1
    // console.log(login());
})
$('#mainer .login p span').on('click',function(){
    login().toggle('block')
})
$('.exit').on('click',function(){
    console.log('del');
    // 删除本地存储的账户并刷新页面
    localStorage.removeItem('user_message');
    location.reload()
})