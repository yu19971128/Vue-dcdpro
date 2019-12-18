<template>
<div>
  <div class="act-one"  
  v-if="article.info.image_list.length===3"
  v-bind:type="acttype"
  >
     <div class="detailid"  @click="handleClick(article.unique_id_str,article.info.image_type)">
        <p class="title">{{article.info.abstract_content}}</p>
        <!-- <img :src="article.info.image_list[0].url_list[0].url" alt=""> -->
         <ul class="img-list">
            <li>
               <img :src="article.info.image_list[0].url_list[0].url" alt="">
            </li>
            <li>
               <img :src="article.info.image_list[1].url_list[0].url" alt="">
            </li>
            <li>
               <img :src="article.info.image_list[2].url_list[0].url" alt="">
            </li>
         </ul>
         <div class="article-footer">
             <span v-if="article.info.cource!==null">{{article.info.source}}</span>
             <span v-if="article.info.comment_count!==null">{{article.info.comment_count}}评论</span>
             <!-- <span v-if="article.info.auto_label_config.name!==null"><i>#&nbsp;</i>{{article.info.auto_label_config.name}}</span> -->
         </div>
     </div>
  </div>
    <div class="act-two"  
      v-if="article.info.image_list.length===1"
      v-bind:type="acttype"
     >
     <a @click="handleClick(article.unique_id_str,article.info.image_type)">
        <p class="title">{{article.info.abstract_content}}</p>
        
        <!-- <img :src="article.info.image_list[0].url_list[0].url" alt=""> -->
         <div class="article-img">
            <img :src="article.info.image_list[0].url_list[0].url" alt="">
         </div>
          <div class="article-footer">
            <span v-if="article.info.cource!==null">{{article.info.source}}</span>
             <span v-if="article.info.comment_count!==null">{{article.info.comment_count}}评论</span>
             <!-- <span v-if="article.info.auto_label_config.name!==null"><i>#&nbsp;</i>{{article.info.auto_label_config.name}}</span> -->
         </div>
     </a>
  </div>
</div>
</template>

<script>


export default {
  props:{
     article:{
        type:Object
     },
   index:Number
  },
  data(){
   return {
      acttype:'',
   } 
  },
 methods: {
    handleClick(id,type){
       console.log(type)
      if (this.$route.params.id !== id) {
        this.$router.push({ name: 'Details', params: {id,type}})
      }
    },
  },
  mounted(){

  }
}

</script>

<style lang="stylus" scope>
@import "~assets/stylus/border.styl"
.act-one
   .detailid
     width 100%
     height 1.58rem
     padding .13rem .15rem
     background #fff
     $border(0 0 1px 0)
     .title
        overflow: hidden;
        text-overflow: ellipsis;
        white-space nowrap 
        font-size .19rem
        color #333
        line-height .2rem
      .img-list
         width 100%
         height .78rem
         display flex
         margin-top .08rem
         li
           flex 1
           margin-left .02rem
           img 
              width 100%
              height 100%
      .article-footer
         width 100%
         height 16px
         margin-top 8px
         span 
           line-height 16px
           font-size 12px
           color #999
           margin-right 8px
           i
            font-size 12px
            font-style oblique
            color #ffe100    
.act-two
   a
     display block
     width 100%
     height 2.76rem
     padding .13rem .15rem
     background #fff
     $border(0 0 1px 0)
     .title
        overflow: hidden;
        text-overflow: ellipsis;
        white-space nowrap 
        font-size .19rem
        color #333
        line-height .2rem
      .article-img
         width 100%
         height 1.94rem
         margin-top .08rem
         img 
            width 100%
            height 100%
      .article-footer
         width 100%
         height 16px
         margin-top 8px
         span 
           line-height 16px
           font-size 12px
           color #999
           margin-right 8px
           i
            font-style oblique
            color #ffe100          
</style>