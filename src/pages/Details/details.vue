<template>
  <div class="detail-container">
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
      <div class="main-container">
        <div v-if="type===3">
          <div class="wgt-feed-head">
              <div class="box-title">
                {{details.title}}
              </div>
              <div class="article-meta">
                <span class="source">
                   {{details.source}}
                </span>
                <span class="publish-time">
                   {{details.publish_time}}
                </span>
              </div>
          </div>
          <div class="details-con" v-html="details.content"></div>
        </div>
        <div v-else>
          <div class="video-box">
            <img :src="image" alt="">
          </div>
          <div class="vedio-info">
              <div class="info-title">
                <h2> {{details.title}}</h2>
                <i class="yo-ico more-ico">&#xf033;</i>
              </div>
              <span class="mdie">{{details.source}}</span>
              <span class="mdie">{{number}}万次观看</span>
          </div>
          <div class="cpt-feed-car-card">
              <div class="feed-slogan">
                  <span class="sp1">相关车型</span>
                  <span class="sp2">数据来源于懂车帝APP</span>
              </div>
              
             <div class="car-wrap">
                <div class="car-img">
                  <img :src="obj.cover" alt="">
                </div>
                <div class="others-info">
                    <div class="car-name">
                        <div class="name">
                            {{obj.series_name}}
                        </div>
                        <div 
                        v-if="obj.offical_price===''"
                        class="price"
                        >
                          暂无报价
                        </div>
                        <div 
                         v-else
                         class="price"
                        >
                         {{obj.offical_price}}
                        </div>
                    </div>
                    <div class="ask">
                        询底价
                    </div>
                </div>
             </div>

          </div>
          
          <!-- <div class="car-wrap">
             <div class="car-img">
               <img :src="details.car_card.cover" alt="">
             </div>
          </div> -->
          
          <div class="wgt-feed-foot">
              <div class="foot-title">
                相关阅读 
              </div>
              <div 
               v-for="(feeditem,index) in feed"
               :key="feeditem.id"
               :feeditem="feeditem"
               :index="index"
               class="cpt-feed-item"
               >
               <!-- <div class="left"><>
               </div> -->
                  <div v-if="feeditem.video!==null" class="left">
                      <img  :src="feeditem.video.cover_image_url" alt="">
                  </div>
                  <div v-else class="left">
                     <img
                    v-for="(i,index) in feeditem.image_list"
                   :index="index" 
                   :i="i"
                   :key="i.url"

                   v-if="index== 0"

                     :src="i.url" alt="">
                  </div>
                  <div class="right">
                    <div class="feed-title">
                       {{feeditem.title}}
                    </div>
                    <div class="feed-meta">
                       {{feeditem.author.name}}
                    </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  //接收路由传过来的数据
  props: ["id", "type"],
  
  //数据源
  data() {
    return {
      details: {},
      number:0,
      feed:[],
      image:'',
      obj:{}
    };
  },
  
 methods:{
   //项目使用了history路由，所以以下代码可以实现路由回退
   handleclick(){
     this.$router.back()
   }
 },

  async mounted() {
    //详情页，首页的不同的布局有不同的详情页，根据type进行判断
    if (this.type === 3) {
      let result = await get({
        url: "/motor/m/article/detail",
        params: {
          group_id: this.id
        }
      });
      this.details = result.data;
    } else {
      let result = await get({
        url: "/motor/m/article/detail",
        params: {
          group_id: this.id
        }
      });
      this.details = result.data;
      this.image="http://p3.pstatp.com/large/w240/"+this.details.video_info.cover_uri+".png"

      //这个数据中出现了__ob__: Observer，__ob__: Observer这些数据是vue这个框架对数据设置的监控器，一般都是不可枚举的。
      //通过以下方法进行转化
      this.obj=JSON.parse(JSON.stringify(this.details.car_card))
      this.number=Math.round((result.data.video_play_count)/1000)
    }
    let result2= await get({
      url:'/related/open/6735282747079655947/?site_id=5000726&code_id=900246129&num=20&page_type=video',
     
    })
    this.feed=result2.data
  }
};
</script>

<style lang='stylus'>
@import "~assets/stylus/border.styl"
body

.detail-container
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
    overflow scroll
    height 100%
    background #fff
    .main-container
       background #fff
      .wgt-feed-head
        margin 0 15px  
        .box-title
          font-size: 22px;
          line-height: 30px;
          margin: 0 0 10px;
          padding-top 18px
        .article-meta
          .source
            font-size 14px
          .publish-time
            display inline-block
            margin-left .05rem
            font-size 14px
            color #999
      .details-con
        margin 0 15px
        .ql-align-center
        font-size 18px
        line-height 32px
         margin-top 20px
        p
          font-size 18px
          line-height 32px
          margin-top 20px
        img 
          width: 100%;
          display: block;
          margin: 4px auto;
      .video-box
        width 100%
        height 2.11rem
        img
          width 100%
          height 100%
      .vedio-info
        width 100%
        height 81px
        padding-bottom 20px
        background #fff
       .info-title
          width 100%
          padding 12px 15px 4px
          height  42px
          display flex
          align-items center
          justify-content center
          h2 
            flex 1
            font-size 18px
            line-height 26px
            overflow hidden 
            text-overflow ellipsis 
            white-space nowrap
            font-weight: normal
          .more-ico
            width 18px 
            height 8px
            font-size 16px
            line-height 8px
            color #000
            text-align center
        .mdie 
          display inline-block
          margin 0 15px
          color: #999;
          font-size: 14px;
      .cpt-feed-car-card
        height 147px
        width 100%
        padding 0 16px
        background #fff
        .feed-slogan
          padding 10px 0 8px
          font-size 16px
          height 40px
          line-height 22px
          color #000
          $border(0 0 1px 0,#ddd,solid)
          span
            display inline-block
          .sp1
            padding-right 4px
            border-right 1px solid #ddd
          .sp2
            padding-left 4px
            color #999
        .car-wrap
          width 100%
          height 104px
          padding 12px 0 20px
          background #fff
          display flex
          align-items center 
          justify-content  center
          .car-img
            width 112px
            height 72px
            margin-right 10px
            img 
              height 100%
              width 100%
          .others-info
            flex 1
            height 100%
            display flex
            align-items center
            justify-content center
            .car-name
              flex 1
              height 100%
              .name
                font-size: 16px;
                line-height: 1;
                margin-bottom: 8px;
                color: #222;
                overflow: hidden;
                text-overflow: ellipsis;
              .price
                font-size 12px
                color #999
            .ask
              width 66px
              height 28px
              background #ffe100
              border-radius 14px
              font-size 14px
              line-height 28px
              text-align center
      .wgt-feed-foot
        padding 0 16px
        background #fff
        width 100%
        .foot-title
          width 100%
          padding  10px 0 8px;
          font-size 16px
          line-height 22px;
          color: #000;
          font-weight: 700;
        .cpt-feed-item
          height 94px
          display flex
          align-items center 
          justify-content center
          margin-bottom 16px
          .left
            width 134px
            height 100%
            margin-right 8px
            img
              height 100%
              width 100%
          .right
            flex 1
            height 38px
            .feed-title
              width 100%
              font-size: 16px;
              line-height: 22px;
              height 22px
              margin: 0;
              font-weight: 400;
              color #000
              overflow hidden
              text-overflow ellipsis
            .feed-meta
                color: #999;
                line-height: 1;
                margin-top: 4px;
                font-size 12px
</style>