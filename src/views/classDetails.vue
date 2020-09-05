<template>
    <div class="wrap">
        <div class="m-flex class-item">
            <img class="right-img" :src="detail.img" alt="" srcset="">
            <div class="left-box m-flex">
                <p class="right-spine"><span v-for="i in detail.tag" :key="i.id">{{i.name}}</span></p>
                <h4>{{detail.title}}</h4>
                <p>讲师:{{detail.teacher && detail.teacher.name }} {{detail.teacher && detail.teacher.position }}</p>
                <p>学习时长: 20小时</p>
                <!-- <p class="start-num">已有<span>{{detail.views}}</span>人学习</p> -->
            </div>
        </div>
        <h3 class="details-title">{{detail.title}}</h3>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">课程简介</mt-tab-item>
            <mt-tab-item id="2">课程目录</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" v-if="detail.teacher">
                <div v-html="detail.teacher.detail">

                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-for="(n,index) in detail.content" :key="n.id">第{{index + 1}}节: {{n.name}}</div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    data(){
        return {
            selected: '1',
            detail: {}
        }
    },
    created(){
        const {course_id} = this.$route.query
        if(course_id) this.init(course_id - 0)
    },
    methods:{
        init(course_id){
            this.$http({
                url: '/api/v1/course_detail',
                method: 'post',
                data: {
                    course_id
                }
            }).then(res=>{
                this.detail = res.result
            })
        },
    }
}
</script>

<style lang="less" scoped>
.mint-tab-item {
    -webkit-box-flex: inherit;
    -ms-flex: inherit;
    flex: inherit;
    text-decoration: none;
    margin: 0 15px;
}
.wrap {
    padding: 5px 10px 10px;
    height: 100%;
    // 图片 简介组件
    .class-item {
        padding: 5px 0;
        align-items: center;
        height: 150px;
        border-bottom: 0;
        .right-img {
            width: 105px;
            height: 100%;
            object-fit: cover;
            margin-right: 10px;
            border-radius: 3px;
        }
        .left-box {
            flex: 1;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            p.right-spine span{
                display: inline-block;
                padding: 2px 10px;
                border-radius: 15px;
                margin-right: 5px;
                background-color: cyan;
                color: #2c3e50;
            }
            p.start-num span {
                color: red;
                margin: 0 2px;
                font-weight: 500;
            }
        }
    }
    .details-title {
        padding: 5px 0;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
}
</style>

