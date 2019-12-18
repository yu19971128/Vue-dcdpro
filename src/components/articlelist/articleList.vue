<template>
  <div class="article-wrap" >
  <div v-if="articleList.length!==0" class="article-list" >
     <articleitem
       v-for="(article,index) in articleList"
       :key="article.unique_id"
       :article="article"
       :index="index" 
     ></articleitem>
  </div>
<van-loading v-else type="spinner" color="#999" style="text-align:center;top:250px" />

  </div>
</template>

<script>
import Vue from 'vue'
import articleitem from './articleItem'
import { get } from 'utils/http'
import axios from 'axios'
import BScroll from 'better-scroll'
import {Loading} from 'vant'

Vue.use(Loading);
export default {
    data(){
      return {
        articleList:[]
      }
    },
    components:{
      articleitem
    },
    async mounted() {
  
      let result = await get({
      url: '/ajax',
    })
    console.log(result)
    this.articleList=result.data
    let bScroll = new BScroll('.article-wrap', {
      pullUpLoad:true,
      click:true,
      probeType: 2,
      mouseWheel: true
    })
   
    bScroll.on('pullingUp',async() =>{
      if(bScroll.y<bScroll.maxScrollY){
        let result2=await get({
          url:'/ajax' 
        })
        this.articleList=[...this.articleList,...result2.data]
        await this.$nextTick()
        bScroll.refresh()
      }
      bScroll.finishPullUp()
     })
}
}
</script>

<style lang="stylus" >
.article-wrap
  height 100%
  overflow hidden
</style>