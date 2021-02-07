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


// form部分

// 昵称输入框点触
$('.nickname .ipt').on('focus',function(){
    $(this).css('borderColor','#549df8')
    $(this).css('background','none')
    $('.nickname_error').hide(200); 
})
$('.nickname .ipt').on('blur',function(){
    if(!$(this)[0].value){
        $(this).css('borderColor','#ff5b5b')
        $('.nickname_error').show(200); 
        $(this).css('background','none')
        return
    }
    $(this).css('borderColor','#777')
    $(this).css('background','url(../image/logintick.png) no-repeat 440px 20px')
})

// 密码输入框点触
$('.password .ipt').on('focus',function(){
    $(this).css('borderColor','#549df8')
    $(this).css('background','none')
    $('.password_error').hide(200); 
})
$('.password .ipt').on('blur',function(){
    if(!$(this)[0].value){
        $(this).css('borderColor','#ff5b5b')
        $('.password_error').show(200); 
        $(this).css('background','none')
        return
    }
    $(this).css('borderColor','#777')
    $(this).css('background','url(../image/logintick.png) no-repeat 440px 20px')
})
