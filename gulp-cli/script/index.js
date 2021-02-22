import './jquery-1.8.3.js'
import './log_box.js'

// *************轮播图**************
// 在末尾添加第一张图片
var wrap = $('#mainer .center .slide .wrap')
var slide = $('#mainer .center .slide')
var imgs = $('#mainer .center .slide .wrap img')
var lis = $('#mainer .center .list ul li')
var timer
var imgIndex = 0 // 当前显示图片的索引
var imgWidth = imgs[0].clientWidth//一张图片的宽度
var pageIndex = 0 // 当前页码的索引
var firstimg = wrap.children().eq(0).clone()
wrap.append(firstimg)

// 进入页面开启自动播放
autoPlay()

// 自动播放函数
function autoPlay(){
    timer = setInterval(function (){
        moveNext()//移动到下一页
    },3000)
}

// 移动到下一页
function moveNext(){
    imgIndex++
    // console.log(imgIndex);
    if (imgIndex > imgs.length) {
        imgIndex = 1//到达最后一张，接下来应该显示第二张图片
        slide.scrollLeft(0)//滚动条设置到0的位置
    }
    slide.animate({'scrollLeft':imgIndex*imgWidth},350)
    lis.eq(pageIndex).removeClass('show')
    pageIndex++
    if (pageIndex >= lis.length) {
        pageIndex = 0
    }
    lis.eq(pageIndex).addClass('show')
}

lis.on('mouseenter',function(){
    // 停止自动播放
    clearInterval(timer)
    slide.stop()
    imgIndex = $(this).index()
    // console.log(imgIndex);
    slide.animate({'scrollLeft':imgIndex*imgWidth},350)
    autoPlay()
    lis.eq(pageIndex).removeClass('show')
    lis.eq(imgIndex).addClass('show')
    pageIndex = imgIndex
})

// *************数据渲染**************

// 新品上架
// 请求商品列表数据
function news(){
    $.ajax({
        url: './data/goods_new.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (json){
            // console.log(json);
          var domStr = ''
          $.each(json,function (index,item){
              if(index>=0&&index<=7){
                domStr += `
                <dl>
                    <dt>
                    <img src="${item.imgurl}" alt="">
                    </dt>
                    <dd>
                    <a href="##" title="${item.name}">${item.name}</a>
        
                    Q币价:<span class="price1">&nbsp;&nbsp;&nbsp;&nbsp;${item.QB}</span>
                        <span>
                        Q币
                        </span>
                        <br>
                        微信价：
                    <span>￥</span><span class="price2">${item.WX}</span>
                    <br>
                    <a href="##" class="btn" data-id="${item.id}">立即购买</a>
                    </dd>
                </dl> 
                `
              }else{
                  return
              }
            
          })
        //   console.log(domStr);
          $('.new .left .left_content .box_type1').html(domStr)
        }
    })
}
news()

// 热门推荐
$('.new .left .left_top .topic_type h3').eq(1).on('click',function(){
    $(this).attr('class','active')
    $('.new .left .left_top .topic_type h3').eq(0).attr('class','')
    $.ajax({
        url: './data/goods_new.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (json){
            // console.log(json);
          var domStr = ''
          $.each(json,function (index,item){
              if(index>=8&&index<=15){
                domStr += `
                <dl>
                    <dt>
                    <img src="${item.imgurl}" alt="">
                    </dt>
                    <dd>
                    <a href="##" title="${item.name}">${item.name}</a>
        
                    Q币价:<span class="price1">&nbsp;&nbsp;&nbsp;&nbsp;${item.QB}</span>
                        <span>
                        Q币
                        </span>
                        <br>
                        微信价：
                    <span>￥</span><span class="price2">${item.WX}</span>
                    <br>
                    <a href="##" class="btn" data-id="${item.id}">立即购买</a>
                    </dd>
                </dl> 
                `
              }else{
                  return
              }
            
          })
        //   console.log(domStr);
          $('.new .left .left_content .box_type1').html(domStr)
        }
    })
})

$('.new .left .left_top .topic_type h3').eq(0).on('click',function(){
    $(this).attr('class','active')
    $('.new .left .left_top .topic_type h3').eq(1).attr('class','')
    news()
})

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
        if(index>=16&&index<=19){
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
      $('.new .right .box_type2').html(domStr)
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
            <dl>
                <dt><img src="${item.imgurl}" data-id="${item.id}" alt=""></dt>
                <dd>
                <p class="name">
                ${item.name}
                </p>
                <p class="price">
                    ￥${item.WX}
                </p>
                </dd>
            </dl>
            `
          }else{
              return
          }
        
      })
    //   console.log(domStr);
      $('.circum .content').html(domStr)
    }
})

// *************点击进入对应详情页**************
$('.new .left_content .box_type1').on('click','dl dt',function(){
    var id = $(this).parent().find('.btn').attr('data-id')//当前点击商品的id
    localStorage.setItem('detail', id)
    self.location.href = './detail.html'
})
$('.new .right .box_type2').on('click','li',function(){
    var id = $(this).attr('data-id')//当前点击商品的id
    localStorage.setItem('detail', id)
    self.location.href = './detail.html'
})

// *************点击加入购物车**************
// 未来元素写法
// 加入购物车
$('.new .left_content .box_type1').on('click','dl .btn',function(){
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
        location.reload()
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

