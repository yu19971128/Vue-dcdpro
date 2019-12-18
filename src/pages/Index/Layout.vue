<template>
<div class="index_container">
  <header>
    <div @click="handleSearch" class="logo-box">
        <img class="logoimg" src="~assets/image/logo.png" alt="">
    </div>
    <input class="search-box" type="text" placeholder="搜你所想" v-on:focus="handleSearch">
    <div class="client">
       <div class="img-box">
         <img src="~assets/image/client.png" alt="">
       </div>
       <div class="text-box">
        打开<br/>客户端
       </div>
       <div class="more-box" @click="handlemore">
         <i class="yo-ico">&#xf07e;</i>
       </div>
    </div>
  </header>

<!--nav-->
 <div class="nav-box">
         <div class="nav">
            <router-link to="/index/article" tag="a" class="nav-item" active-class="active">首页</router-link>
            <router-link to="/index/carChoose" tag='a' class="nav-item" active-class="active">选车</router-link>
            <router-link to="/index/riders" tag="a" class="nav-item" active-class="active">车有圈</router-link>
            <router-link to="/index/smallVideo" tag="a" class="nav-item" active-class="active">小视频</router-link>
            <a href="#" class="nav-item">排行榜</a>
            <router-link tag="a" class="nav-item" to="/index/service" active-class="active">服务</router-link>
            <a href="#" class="nav-item">文章</a>
            <router-link to="/index/banner" tag="a" class="nav-item">视频</router-link>
         </div>
  </div>

  <!--main-->
  <main id="mainbox">
     <router-view></router-view>
  </main>
  <div class="menu-toast" @click="handleclick2">
      <div class="toast-con">
         <router-link to="/" tag="div" class="munu-toast-triangle">
             回到首页
         </router-link>
         <ul class="list">
            <router-link to="/" tag="li" class="item">
              首页
            </router-link>
            <li class="item">选车</li>
            <li class="item">车友圈</li>
            <li class="item">小视频</li>
            <li class="item">排行榜</li>
            <li class="item">服务</li>
            <li class="item">文章</li>
            <li class="item">视频</li>
            <li class="item">新车</li>
            <li class="item">SUV</li>
            <li class="item">导购</li>
            <li class="item">提车作业</li>
            <li class="item">用车</li>
            <li class="item">试驾评测</li>
            <li class="item">自驾游</li>
            <li class="item">新能源</li>
         </ul>
      </div>
  </div>

  <footer></footer>
</div>
</template>

<script>
const BScroll = require('better-scroll')  
export default {

  methods:{
    handlemore(){
      let toast=document.querySelector('.menu-toast')
        toast.style.display='block'
    },
     handleclick2(){
      let toast=document.querySelector('.menu-toast')
        toast.style.display='none'
    },
    handleSearch(){
      this.$router.push({name:'Search'})
    }
  },
  mounted(){
    
     
  }
}
</script>

<style lang='stylus' >
@import "~assets/stylus/border.styl"
.index_container
  display flex
  flex-direction column
  height 100%
  position relative
  header 
    height 48px
    background #333
    padding 0 10px
    display flex
    align-items center
    justify-content center
    border-bottom 1px solid #999
    .logo-box
      width 84px
      height 23px
      font-size 0
      // background url("~assets/logo.png") no-repeat
      .logoimg 
        width  100%
        height 100%
    .search-box
      flex 2
      height 26px
      margin 0 5px
      outline none
      background rgba(255,255,255.0.2)
      border 0
      text-align center
      line-height 26px
      font-size 12px 
    .client
      width 96px
      height 32px
      display flex
      align-items center
      justify-content center
      .img-box
        height 24px
        width 24px
        font-size 0        
        img
           width 100%
           height 100%
      .text-box 
        flex 2
        height: 32px
        width 100%
        line-height 14px
        font-size 8px
        color #fff
        margin-left 5px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap 
      .more-box
        flex 1
        color #fff
        font-size 18px
  .nav-box
         overflow-x scroll
         width 100%
         height 48px
         background #333
         .nav
           width 500px
           background #333
          .nav-item
            display inline-block
            height 100%;
            margin 0 12px
            color #ffffff
            font-size 16px
            line-height 48px
            text-align center
            position relative
          .active:after
            position: absolute;
            left: 50%;
            right: 0;
            content: "";
            bottom: 0;  
            border-bottom: 3px solid #ffcb00
            width: 30px;
            transform: translateX(-50%);
            span 
             color #ffffff
             font-size 16px
             line-height 48px
             text-align center
  main
    flex 1
    overflow hidden
  .menu-toast
    display none
    width 3.75rem
    height 6.67rem
    position absolute
    top 0
    background rgba(0,0,0,.4)
    z-index 999
    .toast-con
      width 333px
      height 330px
      position absolute
      top 50px
      right 10px
      background #ddd
      .munu-toast-triangle
        width 100%
        height 48px
        background: #f4f5f6;
        text-align: center;
        font-size 12px
        line-height 48px
      .list
        height 282px
        width 100%
        display flex
        align-items center
        justify-content left
        flex-wrap wrap
        background #fff
      
        .item
          width 111px
          height 46px
          line-height 22px
          font-size 16px
          color #333
          padding 12px 0
          text-align center
          $border(1px 1px 1px 1px,#ddd,solid)
          
</style>