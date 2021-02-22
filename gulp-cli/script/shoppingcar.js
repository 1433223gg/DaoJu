import './jquery-1.8.3.js'
import './log_box.js'

// 验证登录状态
if (!localStorage.getItem('user_message')) {
  alert('请先登录！')
  login().toggle('block')
}else{
// *************数据渲染**************
// // 商品信息列表
// var goodsid = localStorage.getItem('detail')
// // 假装有locaton数据
// // var goodsid = 'b1'
// $.ajax({
//     url: './data/goods_new.json',
//     type: 'get',
//     dataType: 'json',
//     cache: false,
//     success: function (json){
//         // console.log(json);
//       var domStr = ''
//       $.each(json,function (index,item){
//         if(item.id === goodsid ){
//             domStr = `
            // <li>
            //     <input type="checkbox">
            //     <img src="${item.imgurl}" alt="">
            //     <p class="name">${item.name}</p>
            //     <p class="pifu">${item.type}</p>
            //     <p class="danjia">${item.QB} Q币</p>
            //     <i>${item.time}</i>
            //     <p class="del">-</p>
            //     <p class="num">1</p>
            //     <p class="add">+</p>
            //     <p class="zk">${item.youhui}</p>
            //     <p class="xiaoji">${item.QB} Q币</p>
            //     <span>删除</span>
            // </li>
//             `
//         }
//       })
//     //   console.log(domStr);
//       $('#shopcar .carlist div div ul').html(domStr)
//     }
// })
// 修改当前页面购物车中数量
var carnum = JSON.parse(localStorage.getItem('goods'))
if(carnum){
carnum = carnum.length
}else{
carnum = 0
}
$('#top .menu .top_3 .right div span').html(carnum)


$(function (){
  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    // 定义全局变量总价
    var mix_num = 0
    // 获取所有数据
    $.ajax({
      url: './data/goods_new.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            if (item.id === obj.id) {
              if(// 判断全选框是否被选中
                localStorage.getItem('checkbox')==1
              ){
              domStr += `
              <li>
                <input type="checkbox" checked>
                <img src="${item.imgurl}" alt="">
                <p class="name">${item.name}</p>
                <p class="pifu">${item.type}</p>
                <p class="danjia">${item.QB} Q币</p>
                <i>${item.time}</i>
                <p class="del">-</p>
                <p class="num">${obj.num}</p>
                <p class="add">+</p>
                <p class="zk">${item.youhui}</p>
                <p class="xiaoji">${item.QB} Q币</p>
                <span data-id="${item.id}">删除</span>
            </li>
              `
              }else{
                domStr += `
                <li>
                  <input type="checkbox">
                  <img src="${item.imgurl}" alt="">
                  <p class="name">${item.name}</p>
                  <p class="pifu">${item.type}</p>
                  <p class="danjia">${item.QB} Q币</p>
                  <i>${item.time}</i>
                  <p class="del">-</p>
                  <p class="num">${obj.num}</p>
                  <p class="add">+</p>
                  <p class="zk">${item.youhui}</p>
                  <p class="xiaoji">${item.QB} Q币</p>
                  <span data-id="${item.id}">删除</span>
              </li>
                `
              }
            }
          })
        })
        $('.list').html(domStr)
        //置零
        mix_num=0
        // 遍历
        $('#shopcar .carlist .list input').each(function(index,item){
          if($(item).attr('checked')){
            mix_num+= parseFloat($($(item).siblings('.danjia')[0]).html())*parseInt($(item).siblings('.num').html())
          }
          
        })
        mix_num =  mix_num.toFixed(2)
        $('.zj p').html(mix_num)

        $('#shopcar .carlist .list input').each(function(index,item){
          if(goodsArr[index].check==1){
            $(item).attr('checked','checked')
          }else if(goodsArr[index].check==0){
            $(item).removeAttr('checked','checked')
          }
          
        })

      }
    })

    // 选择框被选中时
    $('.list').on('change','input',function(){
      // 定义全选数值
      var all =[]
      //置零
      mix_num=0
      // 遍历
      $('.list input').each(function(index,item){
        // 判断是否选中
        if($(item).attr('checked')){
          mix_num+= parseFloat($($(item).siblings('.danjia')[0]).html())*parseInt($(item).siblings('.num').html())

          goodsArr[index].check = 1
          // goodsArr.push();
          all.push(0)
        }else{
          all.push(1)
          goodsArr[index].check = 0
        }
      })
      // 更新本地存储的数据
    localStorage.setItem('goods',JSON.stringify(goodsArr))


      if(all.indexOf(1)==-1){// 判断是否全部选中
        localStorage.setItem('checkbox','1')
        $('.head input').attr('checked','checked')
      }else
      if(!all.includes(0)==0){
        localStorage.setItem('checkbox','0')
        $('.head input').removeAttr('checked')
      }
      console.log(all.indexOf(0));
      // console.log(mix_num);
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)

    })

     // 点击加号数量增加1
     $('.list').on('click', '.add', function () {
      // 判断
      // console.log($(this).siblings('span').html());
      //判断最大购买量
      if ($(this).siblings('.num').html() < 20) {
        var num_add = parseInt($(this).siblings('.num').html()) + 1
        $(this).siblings('.num').html(num_add)
      } else {
        alert('购买的数量达到当日购买上限！想想您的钱包和花呗！')
        return false
      }
      var a_id = $(this).siblings('span').attr('data-id')

      // 遍历获取数据并打印
      //置零
      mix_num = 0
      // 遍历
      $('.list input').each(function (index, item) {
        if ($(item).attr('checked')) {
          mix_num += parseFloat($($(item).siblings('.danjia')[0]).html()) * parseInt($(item).siblings('.num').html())
        }

      })
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)

      // 遍历相同id的key，修改本地内存中的num
      $.each(goodsArr, function (index, item) {
        if (item.id == a_id) {
          goodsArr[index].num = num_add
          return false
        }
        // console.log(item.id);
      })
      // 更新本地存储的数据
      localStorage.setItem('goods', JSON.stringify(goodsArr))
      // return mix_num

      // mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)
    })


    // 点击减号数量减少1
    $('.list').on('click', '.del', function () {
      // console.log($(this).siblings('span').html());
      if ($(this).siblings('.num').html() > 1) {
        var num_del = parseInt($(this).siblings('.num').html()) - 1
        $(this).siblings('.num').html(num_del)
      } else {
        alert('数量不能小于1！')
        return false
      }
      var d_id = $(this).siblings('span').attr('data-id')

      // 遍历获取数据并打印
      //置零
      mix_num = 0
      // 遍历
      $('.list input').each(function (index, item) {
        if ($(item).attr('checked')) {
          mix_num += parseFloat($($(item).siblings('.danjia')[0]).html()) * parseInt($(item).siblings('.num').html())
        }

      })
      // console.log(mix_num);

      // 遍历相同id的key，修改本地内存中的num
      $.each(goodsArr, function (index, item) {
        if (item.id == d_id) {
          goodsArr[index].num = num_del
          return false
        }
        // console.log(item.id);
      })
      // 更新本地存储的数据
      localStorage.setItem('goods', JSON.stringify(goodsArr))
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)

    })


    // 删除商品
    $('.list').on('click', 'li span', function () {
      // 当前点击的商品id
      var id = $(this).attr('data-id')
      $.each(goodsArr, function (index, item) {
        if (item.id === id) {
          goodsArr.splice(index, 1)
          return false
        }
      })
      // 删除dom结构
      $(this).parent().remove()

      // 遍历获取数据并打印
      var all_del = []
      //置零
      mix_num = 0
      // 遍历
      $('.list input').each(function (index, item) {
        if ($(item).attr('checked')) {
          mix_num += parseFloat($($(item).siblings('.danjia')[0]).html()) * parseInt($(item).siblings('.num').html())
          all_del.push(0)
        } else {
          all_del.push(1)
        }
      })
      // console.log(all_del);
      if (all_del.indexOf(1) == -1) {
        localStorage.setItem('checkbox', '1')
        $('.head input').attr('checked', 'checked')
      }
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)

      // 更新本地存储的数据
      localStorage.setItem('goods', JSON.stringify(goodsArr))
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        var newLi = '<li>购物车暂无数据！</li>'
        $('.list').html(newLi)
      }
    })

  } else {
    var newLi = '<li>购物车暂无数据！</li>'
    $('.list').html(newLi)
  }


  // 本地checkbox检测是否为1 
  if (localStorage.getItem('checkbox') == 1) {
    $('.head input').attr('checked', 'checked')
  } else {
    $('.head input').removeAttr('checked')
  }

  // 选中全选框
  $('.head input').bind('change', function () {
    if ($(this).attr('checked')) {
      localStorage.setItem('checkbox', '1')
      console.log('good');
      $('.list input').each(function (index, item) {
        $(item).attr('checked', 'checked')
      })
      // 遍历获取数据并打印
      //置零
      mix_num = 0
      // 遍历
      $('.list input').each(function (index, item) {
        if ($(item).attr('checked')) {
          mix_num += parseFloat($($(item).siblings('.danjia')[0]).html()) * parseInt($(item).siblings('.num').html())
        }

      })
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)
    } else {
      localStorage.setItem('checkbox', '0')
      $('.list input').each(function (index, item) {
        $(item).removeAttr('checked')
      })
      // 遍历获取数据并打印
      //置零
      mix_num = 0
      // 遍历
      $('.list input').each(function (index, item) {
        if ($(item).attr('checked')) {
          mix_num += parseFloat($($(item).siblings('.danjia')[0]).html()) * parseInt($(item).siblings('.num').html())
        }

      })
      mix_num =  mix_num.toFixed(2)
      $('.zj p').html(mix_num)

  }
  })
})


}  //登录的else


// 提交按钮点击
$('#shopcar > div.total > a').on('click',function(){
  alert('购买成功！')
  $('#shopcar > div.carlist > div > div > ul > li').remove()
  localStorage.removeItem('goods')
})