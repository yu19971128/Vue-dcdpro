<template>
<div class="wrap-con">
          <div class="riders-con">
              <div 
                v-for="(ridersitem,index) in riderslist"
                :key="index"
                :index="index"
                class="con-wrap">
                 <div class="author-info">
                    <div class="user-img">
                        <img :src="ridersitem.info.repost_info.image_url" alt="">
                    </div>
                    <div class="name-box">
                        {{ridersitem.info.repost_info.name}}
                    </div>
                 </div>

                <div class="post-content"> 
                    <div class="post-text">
                        <a href="" class="post-link">#{{ridersitem.info.repost_info.community_info.motor_name}}#</a>
                        <div class="text-box">
                            {{ridersitem.info.repost_info.title}}
                        </div>
                    </div>
                    <div v-if="ridersitem.info.video_detail_info!==null"  class="post-video">
                        
                        <img :src="ridersitem.info.video_detail_info.detail_video_large_image.url" alt="">
                        <a class="pause" v-on:click="handleclickone"></a>
                        <!-- <img :src="ridersitem[1].info.video_thumb_url.url" alt=""> -->
                    </div>
                    <div class="big-box" v-else>
                        <div
                        class="post-img" 
                        v-for="item in ridersitem.info.image_list"
                        :key="item.url"
                        >
                          <img :src="item.url" alt="">
                                     
                    </div>
                    </div>

                 <div class="post-foot">
                    <div class="post-digg">
                        {{ridersitem.info.digg_count}}
                    </div>
                    <div class="post-comment">
                        {{ridersitem.info.comment_count}}
                    </div>
                </div>

                </div>
              </div>
          </div>
       
</div>
     
</template>

<script>
import {get} from 'utils/http'
import BSscroll from 'better-scroll'
export default {
   data(){
       return {
           riderslist:[]
       }
   },
   methods:{
        handleclickone(){
           this.$router.push({name:'ridersDetails'})
        },
    },
    async mounted(){
      
        
        let result= await get({
            url:'/motor/stream/api/news/feed/web/v47/?aid=1230&channel=m_web&device_platform=wap&category=motor_car_cmg&max_behot_time=1574150928&min_behot_time=0&web_id=6757876708164716035&impression_info=%7B%22page_id%22:%22page_cmg_list%22,%22product_name%22:%22m_station%22,%22zt%22:%22default%22%7D&tt_from=load_more'
        })
        this.riderslist=result.data
        console.log(this.riderslist)  
        let bscroll=new BSscroll('.wrap-con',{
            pullUpLoad:true,
            prodeType:2,
            mouseWheel:true,
            click:true,
        })

      bscroll.on('pullingUp',async () =>{
      if(bscroll.y<bscroll.maxScrollY){
        let result2=await get({
          url:'/motor/stream/api/news/feed/web/v47/?aid=1230&channel=m_web&device_platform=wap&category=motor_car_cmg&max_behot_time=1574150928&min_behot_time=0&web_id=6757876708164716035&impression_info=%7B%22page_id%22:%22page_cmg_list%22,%22product_name%22:%22m_station%22,%22zt%22:%22default%22%7D&tt_from=load_more'
        })
      
        this.riderslist=[...this.riderslist,...result2.data]
        await this.$nextTick()
        bscroll.refresh()
      }                                                                                                                         
      bscroll.finishPullUp()
    })
 }
}
</script>

<style lang="stylus">
.wrap-con
    width 100%
    height 100%
    overflow hidden
    .riders-con
        width 100%
        .con-wrap
            margin-bottom 5px
            .author-info
               width 100%
               height 64px
               padding 14px 14px 10px
               display flex
               align-items center
               justify-content center
               .user-img
                 width 40px 
                 height 40px
                 margin-right 10px
                 border-radius 20px
                 overflow hidden
                 img 
                   height 100%
                   width 100%
                .name-box
                   flex 1
                   height 100%
                   font-size 16px
                   color #666
                   line-height 40px
                   font-weight 700
            .post-content 
                 width 100%
                 padding 0 14px
                .post-text
                    width 100%
                    height 48px
                    margin-bottom 10px
                    overflow hidden
                    text-overflow ellipsis
                    .post-link
                       display inline
                       color: #406599;
                       margin-right: 8px;
                       height 24px
                       line-height 24px
                    .text-box
                       display inline
                       height 24px
                       line-height 24px
                .post-video
                    width 1.73rem
                    height 3.08rem
                    position relative
                    img 
                       width 100%
                       height 100%
                    .pause
                        position: absolute
                        width 40px
                        height 40px
                        left 50%
                        top 50%
                        margin-left -20px
                        margin-top -20px
                        border-radius 50%
                        background-color rgba(0,0,0,.4)
                    .pause:after
                        content: "";
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -10px;
                        margin-top: -10px;
                        background: url("~assets/image/play.png") no-repeat 50%;
                        background-size: contain;
                .big-box
                    display flex
                    align-items center
                    justify-content left
                    flex-wrap wrap 
                    .post-img
                        width 1.1rem
                        height 1.1rem
                        margin-left 3px
                        position relative
                        img
                            width 100%
                            height 100%
                .post-foot
                    width 100%;
                    height 40px
                    display flex
                    align-items center
                    justify-content center
                    .post-digg
                        flex 1
                        height 100%
                        line-height 40px
                        text-align center
                    .post-comment
                        flex 1
                        height 100%
                        line-height 40px
                        text-align center
</style>