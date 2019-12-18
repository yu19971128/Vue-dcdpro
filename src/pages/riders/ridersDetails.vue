<template>
  <div class="sidersdetails-container">
      <header>
      <div class="nav-banner">
        <!-- <router-link to="/index/article" tag='a' class="nav-back"> -->
          <div @click="handleback()"  class="nav-back">
            <i class="yo-ico">&#xf07d;</i>
          </div>
          <!-- <i class="yo-ico">&#xf07d;</i> -->
        <!-- </router-link> -->
        <div class="logo-box">
          <div class="logo">
            <img src="~assets/image/logo.png" alt="">
          </div>
          <div class="act-details">
              文章详情
            </div>
        </div>

       <div class="client">
          <div class="img-box">
            <img src="~assets/image/client.png" alt="">
          </div>
          <div class="text-box">
            打开<br/>客户端
          </div>
          <div class="more-box">
            <i class="yo-ico">&#xf07e;</i>
          </div>
        </div>        
      </div>
    </header>
    <main>
        <div class="main-con">
         <video src="http://v9-default.ixigua.com/e1b2a2f421f8535cfa6ce7bdb3c12b7b/5dd80113/video/m/22021d783191d164855b15908d6257600071163804910000821cd7b45b58/?a=2012&amp;br=1998&amp;cr=0&amp;cs=0&amp;dr=0&amp;ds=3&amp;er=&amp;l=201911222238300100140481440258909B&amp;lr=motor&amp;qs=0&amp;rc=ajx5cnlmaHg3bzMzPGgzM0ApZDw5ZDNpNmQ4N2lnOmVmNmcvL19hcXM2NHNfLS1jLi9zczNhNDIvYmA1MzUxXjNjNTI6Yw%3D%3D" poster="https://sf3-ttcdn-tos.pstatp.com/img/tos-cn-p-0000/67a3a8417c254519aebfa9078d0c2b65~tplv-resize:480:0.png" controls="" width="375" height="375" preload="true" webkit-playsinline="webkit-playsinline" playsinline="playsinline" id="tt-video" class="tt-video" style="height: 600px;background:#000;position:absolute;left:0;top:48px"></video>
        </div>
    </main>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
   methods:{
       handleback(){
           this.$router.back()
       }
   },
   mounted(){
       let bScroll=new Bscroll('main',{
           probType:2,
           click:true,
       })
   }
}
</script>

<style>

</style>