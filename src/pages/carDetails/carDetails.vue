<template>
<div class="container">
     <header>
     <div class="nav-banner">
        <!-- <router-link to="/index/article" tag='a' class="nav-back"> -->
          <div @click="handleclick()"  class="nav-back">
            <i class="yo-ico">&#xf07d;</i>
          </div>
          <!-- <i class="yo-ico">&#xf07d;</i> -->
        <!-- </router-link> -->
        <div class="logo-box">
          <div class="logo">
            <img src="~assets/image/logo.png" alt="">
          </div>
          <div v-if="cardetails!==''" class="act-details">
             {{cardetails.forum.forum_name}}
          </div>
           <!-- <div v-if="cardetails!=={}" class="act-details">
             {{cardetails.forum.forum_name}}
          </div> -->
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
       <div class="maincon">

          <div class="img-box">
             <div class="wg-item">
                 <img v-if="cardetails!==''" :src="cardetails.concern_obj.white_cover_url" alt="">
             </div>
          </div>

          <div class="series-info-wrap">
              <div class="series-wrap">
                <span v-if="cardetails!==''" class="series-brand">
                    {{cardetails.forum.forum_name}}
                </span>
                <span v-if="cardetails!==''" class="series-type">
                   {{parameter[0].info.title}}&nbsp;/&nbsp;{{parameter[0].info.content}}
                </span>
              </div>
              <div v-if="cardetails!==''" class="series-price">
                    {{parameter[2].info.content}}
              </div>
          </div>

          <div class="content-nav">
              <div class="tab-item-wrap active">在售车型</div>
              <div class="tab-item-wrap">配置参数</div>
              <div class="tab-item-wrap">口碑</div>
              <div class="tab-item-wrap">同级车</div>
          </div>

         <div
               v-for="(item,index) in salselist"
              :key="index"
               class="wrap-con">
            <div class="subtitle">
               {{item.info.name}}
            </div>
            <div
                v-for="(typeitem,index) in salemodels.online" 
            :key="typeitem.id"
            :index="index"
            v-if="typeitem.type==='1037' && index<=6"
            class="item">
              <div class="left-section">
                 <div class="name">
                    {{typeitem.info.name}}<br>{{typeitem.info.car_config.base_config[0]}}
                 </div>
                 <div class="value-box">
                     {{typeitem.info.price}}
                 </div>

              </div>
              <div class="right-section">
                  询底价
              </div>
          </div> 
 </div>
</div>
 </main>
    <footer>

    </footer> 
</div>
</template>

<script>
import {get} from 'utils/http'
import Bscroll from 'better-scroll'
export default {
    props:['series_id'],
    data(){
        return {
            cardetails:'',
            parameter:[],
            salemodels:'',
            salselist:[],
        }
    },
     methods:{
   //项目使用了history路由，所以以下代码可以实现路由回退
   handleclick(){
     this.$router.back()
   }
 },
    async mounted(){
        let result = await get({
            url:"/motor/car_page/m/v1/get_head/?city_name=%E5%8C%97%E4%BA%AC&device_id=0&data_from=m_station",
            params:{
                series_id:this.series_id
            }
        })
        let  result2= await get({
          url:"/motor/car_page/m/v1/series_all_json/?city_name=%E5%8C%97%E4%BA%AC&device_id=0&req_type=all&recommend_count=6&data_from=m_station&m_station_dealer_price_v=1",
          params:{
              series_id:this.series_id
          }
        })
        this.cardetails=result
        this.salemodels=result2.data
        for(let i of result2.data.online){
          if(i.type==='1036'){
            this.salselist.push(i)
          }
        }
        this.parameter=JSON.parse(this.cardetails.concern_obj.entrance_list)
        let bscroll=new Bscroll('main',{
         click:true,
         probType:2,
         mouseWheel:true
        })


    }
}
</script>

<style lang="stylus">

.container
  display flex
  flex-direction column
  height 100%
  header
    width 100%
    height 48px
    background #333
    .nav-banner
      width 100%
      height 100%
      padding 0 10px
      display flex
      align-items center
      justify-content center
      .nav-back
        display block
        width 20px 
        height 20px
        margin-right 12px
        font-size 0
        i
         display inline-block
         width 100%
         height 100%
         font-size 18px
         line-height 20px 
         text-align center
         color #fff
         font-weight 600  
      .logo-box
        flex 1   
        height  100%  
        display flex
        align-items center
        justify-content center
        .logo
          width 84px 
          height 23px
          font-size 0 
          img 
            height 100%
            width 100%
        .act-details
          flex 1
          color: #fff;
          font-size: 16px;
          line-height: 22px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space nowrap
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
          text-overflow: ellipsis;
          white-space nowrap
        .more-box
          flex 1
          color #fff
          font-size 18px
  main 
    flex 1
    width 100%
    overflow hidden
    .maincon
      width 100%
      .img-box
          height 1.6rem
          width 100%
          .wg-item
            width 100%
            height 100%
            padding 0 36px
            background linear-gradient(0deg,hsla(0,0%,100%,0),#ccc)
            img
              height 100%
              width 100%
      .series-info-wrap
        width 1005
        height 57px
        padding 0 16px
        .series-wrap
          width 100%
          height 25px
          line-height: 25px;
          .series-brand
            font-size 18px
            font-weight 500
            color #333
            line-height 25px
          .series-type
            font-size 12px
            color #999
            margin-left 8px
        .series-price
          width 100%
          height 22px
          font-weight 600
          font-size 16px
          line-height 22px
          margin-top 4px
          margin-bottom 6px
      .content-nav
        width 100%
        height 40px
        display flex
        .tab-item-wrap
          height 100%
          flex 1
          text-align center
          line-height 40px
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
      .wrap-con
        .subtitle
          width 100%
          height 30px
          padding-left 15px
          background: #f4f5f6;
          color: #707070;
          line-height 30px
          font-size 12px
        .item
          width 100%
          height 100px
          padding 12px 15px
          display flex
          align-items center
          justify-content  center
          .left-section
            flex 1
            height 100%
            margin-right 12px
            .name 
              width 100%
              height 48px
              line-height 24px
              font-size 18px
              font-weight 400
              overflow hidden
              white-space nowrap 
              text-overflow ellipsis
            .value-box
              width 100%
              height 18px
              font-size: 17px;
              line-height 17px
              margin-top 10px
              color #333
              font-weight 700
          .right-section
            width 58px
            height 28px
            background  #ffe100
            line-height 28px
            font-size 14px
            text-align  center
         
</style> 