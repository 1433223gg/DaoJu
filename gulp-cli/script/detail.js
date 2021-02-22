import './jquery-1.8.3.js'
import './log_box.js'

// *************数据渲染**************
// 热门排行
$.ajax({
    url: './data/goods_new.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json){
        // console.log(json);
      var domStr = ''
      $.each(json,function (index,item){
        if(index>=16&&index<=23){
            domStr += `
            <li data-id="${item.id}">
                <div class="listnum">${item.level}</div>
                <img src="${item.imgurl}" alt="">
                <div class="content">
                <h3>${item.name}</h3>
                <div class="qb">
                    Q币价： <span>${item.QB}</span>
                    <p>Q币</p> 
                </div>
                <br>
                <div class="wx">
                    微信价： <p>￥</p> <span>${item.WX}</span>
                </div>
                </div>
             </li>
            `
        }else{
            return
        }
        
      })
    //   console.log(domStr);
      $('#lists .left .hot ul').html(domStr)
    }
})

// 周边商城
$.ajax({
    url: './data/goods_new.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json){
        // console.log(json);
      var domStr = ''
      $.each(json,function (index,item){
          if(index>=24&&index<=27){
            domStr += `
            <li>
                <img src="${item.imgurl}" alt="">
                <div class="info">
                    <p>${item.name}</p>
                    <div class="price">￥${item.WX}</div>
                </div>
            </li>
            `
          }else{
              return
          }
        
      })
    //   console.log(domStr);
      $('#lists .left .round ul').html(domStr)
    }
})

// 详情商品信息
// 加载本地缓存
var goodsid = localStorage.getItem('detail')
// console.log(goodsid);
// 假装有locaton数据
// var goodsid = 'b1'
$.ajax({
    url: './data/goods_new.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json){
        // console.log(json);
      var domStr = ''
      $.each(json,function (index,item){
        if(item.id === goodsid ){
            domStr = `
            <div class="goods_img">
              <img src="${item.imgurl}" alt="">
              <div title="查看大图"></div>
            </div>
            <div class="goods_box">
              <h2>${item.name}</h2>
              <div class="bg_price">
                <div class="qb">
                  <p>Q币价:</p><span>${item.QB} Q币</span>
                </div>
                <div class="wx">
                  <p>微信价:</p><h3>￥${item.WX}</h3>
                </div>
                
              </div>
              <p>期限: ${item.time}</p>
              <div class="buy">
                <a href="" class="incar" data-id="${item.id}">加入购物车</a>
                <a href="" class="gift">赠送</a>
              </div>
              </div>
            `
        }
      })
    //   console.log(domStr);
      $('#lists .right .top_con').html(domStr)
    }
})

// *************点击进入对应详情页**************
$('.hot .box_type2').on('click','li',function(){
  var id = $(this).attr('data-id')//当前点击商品的id
  localStorage.setItem('detail', id)
  self.location.href = './detail.html'
})

// *************点击加入购物车**************
// 未来元素写法
// 加入购物车
$('#lists .right .top_con').on('click','.buy .incar',function(){
  // 先判断是否已登录
  if (localStorage.getItem('user_message')) {
      // console.log('新品');
      // 存储商品id和数量
      // "goods"=>"[{'id':'abc4','num':2},{'id':'abc2','num':1}]"
      var id = $(this).attr('data-id')//当前点击商品的id
      // console.log(id);
      var goodsArr = []//购物车数据的数组
      if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse( localStorage.getItem('goods') )
      }
      // 标记购物车是否已有该商品
      var flag = false
      // 判断购物车是否已有该商品
      $.each(goodsArr,function (index,item){
      if (item.id === id) {//购物车已该商品
          item.num++//商品数量+1
          flag = true
      }
      })
      if (!flag) {
      // push一个商品对象到goodsArr
      goodsArr.push({"id":id,"num":1})
      }
      // 数据更新到本地存储
      localStorage.setItem('goods', JSON.stringify(goodsArr) )
      alert('加入购物车成功！')
  }else{
      alert('请先登录再执行该操作！')
  }
})

// 修改当前页面购物车中数量
var carnum = JSON.parse(localStorage.getItem('goods'))
if(carnum){
  carnum = carnum.length
}else{
  carnum = 0
}
$('#top .menu .top_3 .right div span').html(carnum)
      
// *************其他功能**************
// 点击放大图片
// $('#lists > div.right > div.top_con > div.goods_img > div').on('click',function(){
//   let bgimg = `
//   <div class="bigImg">
//     <img src="https://game.gtimg.cn/images/daoju/dbm/lol/20170216_28862_2202.jpg" alt="">
//   </div>
//   `
//   $(this).parent().append()
// })