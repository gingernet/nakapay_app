<template>
    <div class="wrap">
        <mt-navbar v-model="selected">
            <mt-tab-item id="Market" @click.native = "lookClass('yingList')">营销课程</mt-tab-item>
            <mt-tab-item id="Profession" @click.native = "lookClass('zhuanList')">专业课程</mt-tab-item>
            <mt-tab-item id="teacher" @click.native = "getTecher()">讲师课程</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="./../img/1.jpeg" alt="" srcset="">
            </mt-swipe-item>
            <mt-swipe-item><img src="./../img/2.jpeg" alt="" srcset=""></mt-swipe-item>
            <mt-swipe-item><img src="./../img/3.jpg" alt="" srcset=""></mt-swipe-item>
        </mt-swipe>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="Market">
                <div class="notiy-data" v-if="!yingList.length">
                    当前数据为空
                </div>
                <div class="m-flex class-item" v-for="item in yingList" :key="item.id">
                    <img class="right-img" :src="item.img" alt="" srcset="">
                    <div class="left-box m-flex" @click="goRoute('classDetails',item.id)">
                        <p class="right-spine">
                            <span v-for="i in item.tag" :key="i.id">{{i.name}}</span>
                        </p>
                        <h4>{{item.title}}</h4>
                        <p>发布时间：2020-08-19 12:30</p>
                        <p class="start-num">已有<span>{{item.views}}</span>人学习</p>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="Profession">
                <div class="notiy-data" v-if="!zhuanList.length">
                    当前数据为空
                </div>
                <div class="m-flex class-item" v-for="item in zhuanList" :key="item.id">
                    <img class="right-img" :src="item.img" alt="" srcset="">
                    <div class="left-box m-flex" @click="goRoute('classDetails', item.id)">
                        <p class="right-spine">
                            <span v-for="i in item.tag" :key="i.id">{{i.name}}</span>
                        </p>
                        <h4>{{item.title}}</h4>
                        <p>发布时间：2020-08-19 12:30</p>
                        <p class="start-num">已有<span>{{item.views}}</span>人学习</p>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="teacher">
                <div class="notiy-data" v-if="!teacherList.length">
                    当前数据为空
                </div>
                <div class="m-flex class-item" v-for="item in teacherList" :key="item.id">
                    <img class="right-img" :src="item.photo" alt="" srcset="">
                    <div class="left-box m-flex" @click="goRouteTeacher(item.id)">
                        <h4>{{item.name}}</h4>
                        <p>任职单位：暂无</p>
                        <p>职位: {{item.position}}</p>
                        <p class="right-spine">
                            <span v-for="i in item.tag" :key="i.id">{{i.name}}</span>
                            <span v-if="!item.tag.length" >新人</span>
                        </p>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>

        <Tab name="cla"></Tab>
    </div>
</template>

<script>
import Tab from '../components/tab/main.vue'
export default {
    components: {Tab},
    data(){
        return {
            selected: 'Market',
            tab: '课程',
            yingList:[],
            zhuanList:[],
            teacherList:[]
        }
    },
    mounted(){
        this.init('yingList');
    },
    methods:{
        goRoute(url,course_id){
            this.$router.push({
                path: '/' + url,
                query: {
                    course_id
                }
            })
        },
        goRouteTeacher(teacher_id){
            this.$router.push({
                path: '/teacherDetails',
                query: {
                    teacher_id
                }
            })
        },
        init(list){
            this.$http({
                url: '/api/v1/get_course_list',
                method: 'post',
                data: {
                    page: 1,
                    number:100,
                    type: this.selected // 非专业课
                }
            }).then(res=>{
                this[list] = res.result;
            })
        },
        lookClass(list){
            if(!this[list].length){
                this.init(list)
            }
        },
        getTecher(){
            this.$http({
                url: '/api/v1/get_techer_list',
                method: 'post',
                data: {
                    page: 1,
                    number: 100 // 非专业课
                }
            }).then(res=>{
                this.teacherList = res.result;
                console.log(this.teacherList)
            })
        },
    }
}
</script>

<style lang="less" scoped>

.mint-swipe {
  height: 180px;
  padding: 5px 0;
  .mint-swipe-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
}

.mint-tab-container {
  height: calc(100% - 290px);
  overflow: auto;
}

.mint-navbar {
  margin-bottom: 3px;
  .mint-tab-item {
    //   padding: 13px 0;
    font-size: 15px;
    font-weight: 500;
  }
}

.mint-tabbar{
  background-color: #fff;
}

.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
//   border-top: 1px solid #eaeaea;
//   box-sizing: border-box;
}

.wrap {
    padding: 0 5px;
    height: 100%;
}
</style>

