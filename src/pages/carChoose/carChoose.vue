<template>

  <div class="main-con">
   <div class="scroll-box">
    <div class="explame">
        <div 
        v-for="(item,index) in explame" 
        :key="item.brand_id"
        :item="item"
        :index="index"
        class="explame-item"
        >
          <span class="pic-box">
               <img :src="item.image_url" alt="">
          </span>
          <span class="name-box">
            {{item.brand_name}}
          </span>
        </div>
    </div> 

    <div class="recommend">
      <div
      v-for="(recitem,index) in recommend"
      :key="recitem.series_id"
      :index="index"
      :recitem="recitem" 
      @click="handleclick(recitem.series_id)"
      class="rec-box"  >
          <div class="img-box">
           <img :src="recitem.cover_image" alt="">
          </div>
          <div class="name-box">
           {{recitem.series_name}}
          </div>
      </div>
    </div>

    <div class="choose">
      按照价格、级别、排量等条件选车
      <i class="yo-ico">&#xf07f;</i>
    </div>

   <div class="history">
    我浏览过：
   </div>

   <div v-for="(item,index) in pinyin"
   :key="index"
   class="wrap-con">
     <div  :id="item.info.pinyin" :ref="item.info.pinyin" class="pin">
         {{item.info.pinyin}}
     </div>
     <div
      v-for="(caritem,index) in all"
      :key="index"
      :index="index"
      :caritem="caritem"
      class="car">
      <div class="now" v-if="item.info.pinyin===caritem.info.pinyin && caritem.type!=='1000'">
          <div class="now-img">
            <img :src="caritem.info.image_url" alt="">
          </div>
          <div class="brand-name">
            {{caritem.info.brand_name}}
          </div>
         
      </div>
     </div>
   </div>
   </div>

  <ul class="name-list">
    <li @touchstart="scrollToElement(item.info.pinyin)" v-for="(item,index) in pinyin" 
        :key="index"
        class="frist-name">
        {{item.info.pinyin}}
    </li>
  </ul>

  </div>
</template>

<script>
import {get} from 'utils/http'
import { log } from 'util'
import BScroll from 'better-scroll'
import _ from 'lodash'

export default {
  data(){
    return {
       explame:[],
       recommend:[],
       pinyin:[],
       all:[]
    }
  },
  created() {
    this.bscroll = null
    this.alphaATop = 0
    this.alphaAHeight = 0
    this.alphas = []
  },
  methods:{
    scrollToElement(id){
      let target = this.$refs[id][0]
      this.bscroll.scrollToElement(target)
    },
    // handleTouchMove:_.throttle(function(e) {
    //   console.log(0)
    //   let clientY = e.touches[0].clientY
    //   let height = clientY - this.alphaATop
    //   console.log(clientY,height)
    //   let index = Math.floor(height / this.alphaAHeight)

    //   if (index > -1 && index < this.alphas.length) {
    //     let target = this.$refs[this.alphas[index]][0]
    //     this.bScroll.scrollToElement(target)
    //   }
    // }, 100),

    handleclick(series_id){
       if (this.$route.params.series_id !== series_id) {
        this.$router.push({ name: 'carDetails', params: {series_id}})
      }
    }
  },

  async mounted(){
    let result= await get({
      url:'/motor/brand/m/v1/brand/?device_id=0',
    })
    this.explame=result.data[0].info.brand
    this.recommend=result.data[0].info.series
    this.all=result.data
    for(var i  of result.data){
      if(i.type ==='1000'){
       this.pinyin.push(i)
      }
     }
    
      await this.$nextTick()
      this.bscroll=new BScroll('.main-con',{
      click:true,
      probType:2,
      mouseWheel:true
    })

    let { top, height } = this.$refs['A'][0].getBoundingClientRect()
    this.alphaATop = top
    this.alphaAHeight = height
    console.log(top)
    console.log(height)
    // console.log(this.$route)
    // await this.$nextTick()
    // this.bscroll.refresh()
   }

   

}

</script>

<style lang="stylus">
.main-con
  width 100%
  height 100%
  overflow  hidden
  .scroll-box
    width 100%
    .explame
      width 100%
      height 50px
      padding 15px 10px
      display flex 
      align-items center
      justify-content center
      background #fff
      .explame-item
        flex 1
        height 100%
        .pic-box
          display inline-block
          width 20px 
          height 20px
          img
            width 100%
            height 100%
        .name-box
          height 19px
          line-height 19px
          font-size 14px
          display inline-block
    .recommend
      width 100%
      height 2.08rem
      padding 0 10px 4px
      display flex
      align-items center
      justify-content center
      flex-wrap wrap
      background #fff
      .rec-box
        width 1.18rem
        height .92rem
        margin-top .1rem
        .img-box
          width 1.05rem
          height .7rem
          img 
            width 100%
            height 100%
        .name-box
          width 100%
          height .22rem
          line-height .22rem
          font-size .16rem
          text-align center
    .choose
      width  100%
      height 36px
      line-height 36px
      font-size 14px
      display block 
      text-align center
      background #fff
    .history
      width 100%
      height 47px
      padding 10px 14px 20px
      background #fff
      color rgb(153, 153, 153);
      font-size rgb(153, 153, 153);
    .wrap-con
        .pin
          width 100%
          height 28px
          line-height 20px
          font-size 14px
          padding 4px 15px
          background 	#F5F5F5
        .now
          width 100%
          height 61px
          background #fff
          .now-img
            width 40px
            height 40px
            margin 0 15px
            display inline-block
            img 
              width 100%
              height 100%
          .brand-name
              display inline-block
  .name-list
    position fixed
    top 100px
    right 0
    .frist-name
      width .39rem
      height .2rem
      font-size .09rem
      text-align center
      line-height .2rem
      padding 0 5px 0 15px
      color rgb(42, 144, 215)
      font-weight 700   
</style>