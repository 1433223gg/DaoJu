import './jquery-1.8.3.js'

// setInterval(function(){
//     if($('.slide').css('zoom')>1) {
//         $('.slide').css('zoom',1)
//     }
// // })
// setInterval(function(){
//     console.log(document.body.offsetWidth);
// })

// top部分
$('.language').on('mouseenter',function(){
    $('.language img').attr('src','./image/loginup.png')
    $('.language div').css('display','block')
})
$('.language').on('mouseleave',function(){
    $('.language img').attr('src','./image/logindown.png')
    $('.language div').css('display','none')
})


/********* 用户名密码模块 *********/ 

//** */ 昵称输入框点触
var nickname = false
$('.nickname .ipt').on('focus',function(){
    $(this).css('borderColor','#549df8')
    $(this).css('background','none')
    $('.nickname_error').hide(200); 
    nickname = false
})
$('.nickname .ipt').on('blur',function(){
    // 判断昵称是否为空
    if(!$(this)[0].value){
        $(this).css('borderColor','#ff5b5b')
        $('.nickname_error').show(200); 
        $(this).css('background','none')
        nickname = false
        return
    }
    $(this).css('borderColor','#777')
    $(this).css('background','url(./image/logintick.png) no-repeat 440px 20px')
    nickname = true
})


//** */ 密码输入框点触

// 定义密码错误代码
var err_num = 0
// 输入密码格式检测
$('.password .ipt').on('keyup',function(){
    var pass =  $('.password .ipt')[0].value
    var reg1 = /[\s]/ 
    var reg2 = /^.{8,16}$/
    var reg3 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$]{2,}$/
    if(!reg3.test(pass)){ //如果不由两种类型组成
        err_num = 3
        $('.password_tips div img').eq(2).attr('src','./image/logininfo.png')
    }else{
        $('.password_tips div img').eq(2).attr('src','./image/logingreen.png')
        err_num = 0
    }
    if(!reg2.test(pass)){ //如果不由8~16字符组成
        err_num = 2
        $('.password_tips div img').eq(1).attr('src','./image/logininfo.png')
        // console.log('8,16');
    }else{
        $('.password_tips div img').eq(1).attr('src','./image/logingreen.png')
        // err_num = 0
    }
    if(reg1.test(pass)){ //如果有空格
        // console.log('有空格'); 
        err_num = 1  
        $('.password_tips div img').eq(0).attr('src','./image/logininfo.png')
    }else{
        $('.password_tips div img').eq(0).attr('src','./image/logingreen.png')
    }
    // console.log(err_num);
})

// 密码输入检验
$('.password .ipt').on('focus',function(){
    $('.password div').css('left','420px')
    $(this).css('borderColor','#549df8')
    $(this).css('color','#000')
    $(this).css('background','none')
    $('.password_error_wrap .change').css('display','none')
    // $('.password_tips').css('display','block')
    $('.password_tips').show(200)
    $('.password_error').hide(200); 
})
$('.password .ipt').on('blur',function(){
    if(!$(this)[0].value){
        $(this).css('borderColor','#ff5b5b')
        $('.password_error').show(200); 
        $('.password_tips').hide(200);
        $(this).css('background','none')
        // $(this).css('borderColor','#549df8')
        return
    }
    // 判断其他
    else if(err_num === 1){
        // console.log('有空格');
        $(this).css('borderColor','#ff5b5b')
        $(this).css('color','#ff5b5b')
        $('.password_tips').hide(200);
        $('.password_error_wrap .change').css('display','block')
        $('.password_error_wrap .change img').attr('src','./image/loginerror.png')
        $('.password_error_wrap .change p').html('不能包含空格！')
    }
    else if(err_num === 2){
        // console.log('长度不对');
        $(this).css('borderColor','#ff5b5b')
        $(this).css('color','#ff5b5b')
        $('.password_tips').hide(200);
        $('.password_error_wrap .change').css('display','block')
        $('.password_error_wrap .change img').attr('src','./image/loginerror.png')
        $('.password_error_wrap .change p').html('长度应该为8-16个字符嗷！')
    }
    else if(err_num === 3){
        // console.log('必须两种');
        $(this).css('borderColor','#ff5b5b')
        $(this).css('color','#ff5b5b')
        $('.password_tips').hide(200);
        $('.password_error_wrap .change').css('display','block')
        $('.password_error_wrap .change img').attr('src','./image/loginerror.png')
        $('.password_error_wrap .change p').html('字符、数字、特殊字符必须包含至少两个哦！')
    }else{
        $(this).css('borderColor','#777')
        $('.password div').css('left','380px')
        $('.password .ipt').css('background','url(./image/logintick.png) no-repeat 440px 20px')
        $('.password_tips').hide(200);
    }
})


// 监听密码输入
var eye = 0
setInterval(function(){
    if($('.password .ipt')[0].value){
        if(eye === 1){
            $('.password div').css('background','url(./image/eye.png)')
        }else{
            $('.password div').css('background','url(./image/eye-close.png)')
        }
        $('.password div').css('display','block')
    }else{
        $('.password .ipt').css('background','none')
        $('.password div').css('display','none')
    }
})

// 长按显示密码
$('.password div').on('mousedown',function(){
    // console.log('变了');
    $('.password .ipt')[0].type = 'text'
    eye = 1
})
$('.password div').on('mouseup',function(){
    // console.log('变了');
    $('.password .ipt')[0].type = 'password'
    eye = 0
})

/********* 手机模块 *********/ 
// 手机号前缀
var down_num = 0
$('.list_outer input').on('focus',function(){
    $('.list_inner').show(200)
    $('.list_outer img').attr('src','./image/loginup.png')
    $('.list_outer input').css('borderColor','#549df8')
    down_num++
})
$('.list_outer input').on('blur',function(){
    $('.list_inner').hide(200)
    $('.list_outer img').attr('src','./image/logindown.png')
    $('.list_outer input').css('borderColor','#777')
    down_num++
})
$('.list_outer img').on('click',function(){
    down_num++
    if(down_num%2){
        $('.list_inner').show(200)
        $('.list_outer img').attr('src','./image/loginup.png')
        $('.list_outer input').focus()
    }
    else{
        $('.list_inner').hide(200)
        $('.list_outer img').attr('src','./image/logindown.png')
    }
})
$('.list_inner ul li').on('mousedown',function(){
    var text = $(this)[0].innerHTML
    console.log(text);
    // console.log(text.match(/\d+/)[0]);
    text = '+'+ text.match(/\d+/)[0]
    $('.list_outer input').val(text)
})
// down_num++


// 手机号
var phonenum = false
$('.phonenum input').on('focus',function(){
    $('.message').show(200)
    $('.list_wrap p').eq(1).hide(200)
    $('.list_wrap p').eq(0).show(200)
    $(this).css('borderColor','#549df8')
    $(this).css('color','#000')
    $('.phonenum input').css('background','none')
    phonenum = false
})
$('.phonenum input').on('blur',function(){
    if($('.phonenum input')[0].value){
        // 手机号验证
        var phone_text =  $('.phonenum input')[0].value
        var reg = /^1[3456789]\d{9}$/
        if(reg.test(phone_text)){
            // alert('对了')
            $('.phonenum input').css('background','url(./image/logintick.png) no-repeat 250px 20px')
            $('.phonenum input').css('borderColor','#777')
            phonenum = true

        }else{
            $('.list_wrap p').eq(0).hide(200)
            $('.list_wrap p').eq(1).show(200)
            $('.phonenum input').css('borderColor','#ff5b5b')
            $('.phonenum input').css('color','#ff5b5b')
            phonenum = false

        }
    }else{
        $('.message').hide(200)
        $(this).css('borderColor','#777')
        phonenum = false
    }
})

// 隐私政策
var upper = 0
$('.readed .right').on('click',function(){
    upper++
    if(upper%2){
        $('.readed .right img').attr('src','./image/loginup.png')
        $('.rool').show(200)
    }else{
        $('.readed .right img').attr('src','./image/logindown.png')
        $('.rool').hide(200)
    }
    
})

// 隐私政策确认
var check = 0
$('.readed .left img').on('click',function(){
    check++
    if(check%2){
        $('.readed .left img').attr('src','./image/checkbox_normal.png')
    }else{
        $('.readed .left img').attr('src','./image/checkbox_check.png')
    }
})

var ident
import {num} from './ident_num.js'
// 发送验证码点击
$('.message span').on('click',function(){
    alert(num)
    function ide(){
        ident = num
        return ident
    }
    ide()
})

// 验证码输入
$('.message input').on('focus',function(){
    $('.message_err p').hide(200)
    $(this).css('borderColor','#549df8')
    $(this).css('color','#000')
})
$('.message input').on('blur',function(){
    if($('.message input')[0].value === ident){
        // alert('验证码正确')
        $(this).css('borderColor','#777')
        $(this).css('color','#000')
    }else{
        $(this).css('borderColor','#ff5b5b')
        $(this).css('color','#ff5b5b')
        $('.message_err p').show(200)
        // setTimeout(function(){
        //     $('.message span').css('backgroundColor','#f0f0f0')
        //     $('.message span').css('borderColor','#f0f0f0')
        //     $('.message span').css('color','#ccc')
        // },5)
        
    }
})

// 注册按钮点击
$('.submit').on('click',function(){
    // 自动触发失去焦点
    $('.nickname .ipt').trigger('blur')
    $('.password .ipt').trigger('blur')
    if(($('.nickname .ipt').css('borderColor') === 'rgb(119, 119, 119)')&&($('.password .ipt').css('borderColor') === 'rgb(119, 119, 119)')&& phonenum && !(check%2) && ($('.message input')[0].value === ident)){
        // 允许注册
        // alert('ok')
        let username = $('.nickname .ipt')[0].value
        let password = $('.password .ipt')[0].value
        let pre_phone = $('.list_outer input')[0].value
        let phone = $('.phonenum input')[0].value
        let ident_num = $('.message input')[0].value
        let data_all = {username:username,password:password,pre_phone:pre_phone,phone:phone,ident_num:ident_num}
        $.ajax({
            url:'http://127.0.0.1/DaoJu/gulp-cli/dist/php/1.php',
            type:'post',
            data:data_all,
            dataType:'text',
            success:function(data){
                // console.log(data);
                alert('恭喜您注册成功！')
                window.location.href="index.html";
            },
            error:function(err){
                console.log(err);
            }
        })
    }
})

// 测试
// $('.submit').on('click',function(){
//     let username = $('.nickname .ipt')[0].value
//     let password = $('.password .ipt')[0].value
//     let pre_phone = $('.list_outer input')[0].value
//     let phone = $('.phonenum input')[0].value
//     let ident_num = $('.message input')[0].value
//     let data_all = {username:username,password:password,pre_phone:pre_phone,phone:phone,ident_num:ident_num}
//     $.ajax({
//         url:'http://127.0.0.1/DaoJu/gulp-cli/dist/php/1.php',
//         type:'get',
//         data:data_all,
//         dataType:'text',
//         success:function(data){
//             console.log(data);
//         },
//         error:function(err){
//             console.log(err);
//         }
//     })
// })