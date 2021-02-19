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

// 商品列表
$.ajax({
    url: './data/goods_new.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json){
        // console.log(json);
      var domStr = ''
      $.each(json,function (index,item){
          if(index>=0&&index<=15){
            domStr += `
            <dl>
                <dt>
                <img src="${item.imgurl}" alt="">
                </dt>
                <dd>
                <a href="" title="${item.name}">${item.name}</a>
    
                Q币价:<span class="price1">&nbsp;&nbsp;&nbsp;&nbsp;${item.QB}</span>
                    <span>
                    Q币
                    </span>
                    <br>
                    微信价：
                <span>￥</span><span class="price2">${item.WX}</span>
                <br>
                <a href="" class="btn" data-id="${item.id}">立即购买</a>
                </dd>
            </dl> 
            `
          }else{
              return
          }
        
      })
    //   console.log(domStr);
      $('#lists .right .lists .box_type1').html(domStr)
    }
})

// *************点击进入对应详情页**************
$('#lists .right .lists .box_type1').on('click','dl dt',function(){
  var id = $(this).parent().find('.btn').attr('data-id')//当前点击商品的id
  localStorage.setItem('detail', id)
  self.location.href = './detail.html'
})
$('.hot .box_type2').on('click','li',function(){
  var id = $(this).attr('data-id')//当前点击商品的id
  localStorage.setItem('detail', id)
  self.location.href = './detail.html'
})

// *************点击加入购物车**************
// 未来元素写法
// 加入购物车
$('#lists .right .lists .box_type1').on('click','dl .btn',function(){
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

