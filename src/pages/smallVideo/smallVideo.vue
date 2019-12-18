<template>
  <div class="wrap-con">
      <div class="video-con">
        <div class="left-con">
          <div class="lfet-wrap"
            v-for="(leftitem,index) in leftlist"
            :key="index" 
          >
            <div 
                class="left-box"
                v-if="leftitem.info.image_list[0].height>=leftitem.info.image_list[0].width"
            > 
                <img :src="leftitem.info.image_list[0].url" alt="">
           </div>
            <div 
                class="left-box1"
                v-else
            > 
               <img :src="leftitem.info.image_list[0].url" alt="">
           </div>
          </div>
        </div>
        <div class="right-con">
            <div class="right-wrap"
                v-for="(rightitem,index) in rightlist"
                :key="index" 
            >
                <div 
                  class="right-box"
                  v-if="rightitem.info.image_list[0].height>=rightitem.info.image_list[0].width"
                > 
                  <img :src="rightitem.info.image_list[0].url" alt="">
               </div>
               <div 
                  class="right-box1"
                  v-else
                > 
                 <img :src="rightitem.info.image_list[0].url" alt="">
               </div>
            </div>
        </div>
      </div>
 </div>
</template>

<script>
import {get} from 'utils/http'
import Bscroll from 'better-scroll'

export default {
   data(){
       return {
           leftlist:[],
           rightlist:[]
       }
   },
   created(){
        this.leftHeight=0;
        this.rightHeight=0;
   },
   async mounted(){
       let result=await get({
           url:'/motor/stream/api/news/feed/web/v47/?aid=1230&channel=m_web&device_platform=wap&category=motor_car_ugc&max_behot_time=0&min_behot_time=1574591936&web_id=6757876708164716035&impression_info=%7B%22page_id%22%3A%22page_ugc_video%22%2C%22product_name%22%3A%22m_station%22%2C%22zt%22%3A%22default%22%7D&tt_from=pull&aid=1230&channel=m_web&device_platform=wap&category=motor_car_ugc&max_behot_time=0&min_behot_time=1574591936&web_id=6757876708164716035&impression_info=%7B%22page_id%22:%22page_ugc_video%22,%22product_name%22:%22m_station%22,%22zt%22:%22default%22%7D&tt_from=pull',
       })
       console.log(result)
       for(var i of result.data){
               if(this.leftHeight<=this.rightHeight){
                   this.leftlist.push(i)
                   this.leftHeight+=i.info.image_list[0].height  
               }else{
                   this.rightlist.push(i)
                   this.rightHeight+=i.info.image_list[0].height
               }
           
       }
    //    console.log(leftHeight,rightHeight)
    //    console.log(this.leftlist)
    //    console.log(this.rightlist)
       let bscroll=new Bscroll('.wrap-con',{
            pullUpLoad:true,
            click:true,
            probeType: 2,
            mouseWheel: true
       })

    bscroll.on('pullingUp',async () =>{
      if(bscroll.y<bscroll.maxScrollY){
        let result2=await get({
          url:'/motor/stream/api/news/feed/web/v47/?aid=1230&channel=m_web&device_platform=wap&category=motor_car_ugc&max_behot_time=0&min_behot_time=1574591936&web_id=6757876708164716035&impression_info=%7B%22page_id%22%3A%22page_ugc_video%22%2C%22product_name%22%3A%22m_station%22%2C%22zt%22%3A%22default%22%7D&tt_from=pull&aid=1230&channel=m_web&device_platform=wap&category=motor_car_ugc&max_behot_time=0&min_behot_time=1574591936&web_id=6757876708164716035&impression_info=%7B%22page_id%22:%22page_ugc_video%22,%22product_name%22:%22m_station%22,%22zt%22:%22default%22%7D&tt_from=pull',
        })
         for(var i of result2.data){
               if(this.leftHeight<this.rightHeight){
                   this.leftlist.push(i)
                   this.leftHeight+=i.info.image_list[0].height  
               }else{
                   this.rightlist.push(i)
                   this.rightHeight+=i.info.image_list[0].height
               }
           
       }
        await this.$nextTick()
        bscroll.refresh()
      }                                                                                                                         
      bscroll.finishPullUp()
    })
       
   }
}
</script>

<style lang="stylus" >
.wrap-con
    width 100%
    height 100%
    overflow hidden
    .video-con
        width 100%
        display flex
        .left-con
            flex 1
            .left-box
                width 1.82rem
                height 3.33rem
                margin-bottom 4px
                img
                    width 100%
                    height 100%
            .left-box1
                width 1.84rem
                height 1.05rem
                margin-bottom 4px
                img
                    width 100%
                    height 100%
        .right-con 
            flex 1
            .right-box 
                width 1.87rem
                height 3.33rem
                margin-bottom 4px
                img 
                   width 1005
                   height 100%
            .right-box1
                width 1.87rem
                height 1.05rem
                margin-bottom 4px
                img
                    width 100%
                    height 100%    
</style>