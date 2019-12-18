import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from 'pages/Index/Layout'
import Article from 'pages/Index/Article'
import carChoose from 'pages/carChoose/carChoose'
import Details from 'pages/Details/details'
import Riders from 'pages/riders/riders'
import carDetails from 'pages/carDetails/carDetails'
import sidersDetails from 'pages/riders/ridersDetails'
import Search from 'pages/Search/Search'
import searchDetails from 'pages/Search/searchDetails'
import smallVideo from 'pages/smallVideo/smallVideo'
import service from 'pages/service/service'
import Banner from 'pages/Banner/banner'

//使用vueRouter插件库
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/article',
  },
  {
    path:'/index',
    name:'index',
    component:Index,
    children:[
      {
        path:'article',
        name:'article',
        component:Article
      },
      {
        path:'carChoose',
        name:'carChoose',
        component:carChoose
      },
      {
        path:'riders',
        name:'riders',
        component:Riders
      },
      { 
        path:'smallVideo',
        name:'smallVideo',
        component:smallVideo
      },
      {
        path:'service',
        name:'service',
        component:service
      },
      {
        name:'banner',
        path:"banner",
        component:Banner
      },
    ]
  },
  {
    name:'Details',
    //布尔模式                                                                                                                                                                                                                                                                                                                                                                                                                                   
    props: true,
    path:'/Details/:id/:type',
    component:Details
  },
  {
    name:'carDetails',
    props:(route)=>{
      return {series_id: route.params.series_id}
    },
    path:'/carDetails/:series_id',
    component:carDetails
  },
  {
    name:'ridersDetails',
    path:'/ridersDetails',
    component:sidersDetails
  },
  {
    name:'Search',
    path:'/Search',
    component:Search,
  },
  {
    name:'searchDetails',
    props:(route)=>{
       return {
         keywords:route.params.keywords
       }
    },
    path:'/searchDetails/:keywords',
    component:searchDetails
  }
]


//创建一个router实例
const router = new VueRouter({
  //使用history路由
  mode: 'history',
  base: process.env.BASE_URL,
  //引入路由表
  routes
})

export default router
