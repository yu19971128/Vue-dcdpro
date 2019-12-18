<template>
  <div class="wrap-con">
    <div class="service-con">
        <div class="wgt-service-app">
          <div
              v-for="(serviceitem,index) in servicelist"
              class="service-item"
              :key="index"
              >
              <div class="img-box">
                <img :src="serviceitem.icon_url" alt="">
              </div>
              <span class="text-box">
                   {{serviceitem.title}}
              </span>
          </div>
        </div>
    </div>
      <Article></Article>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {get} from'utils/http'
import Article from 'pages/Index/Article'

export default {
     data(){
       return {
         servicelist:[]
       }
     },
     components:{
        Article
     },
     async mounted(){
        let result=await get({
          url:'/motor/serv_page/api/v1/m/service_head?aid=1230&channel=m_web&device_platform=wap&category=motor_car_video&web_id=6757876708164716035&version_code=0&zt=default',
        })
        this.servicelist=result.data.service_list
        let bscroll=new Bscroll('.wrap-con',{
            pullUpLoad:true,
            prodeType:2,
            mouseWheel:true,
            click:true,
        })
     }
}
</script>

<style lang="stylus">
.wrap-con
    width 100%
    height 100%
    overflow hidden
    .service-con
      width 100%
      .wgt-service-app
          width 100%
          height 236px
          padding-top 8px
          display flex
          align-items center
          justify-content center
          flex-wrap wrap
          .service-item
              width 93px
              height 74px
              padding 8px 0
              display flex
              flex-direction column
              align-items center
              justify-content center
              .img-box
                width 36px
                height 36px
                margin-bottom 5px
                img 
                  width 100%
                  height 100%
              .text-box
                flex 1
                font-size 14px
                line-height 1

</style>