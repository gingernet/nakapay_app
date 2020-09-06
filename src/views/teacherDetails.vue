<template>
    <div class="wrap">
        <div class="teacher-info" v-if="detail.teacher">
            <div class="m-flex top">
                <div class="person-photo">
                    <img :src="detail.teacher.photo" alt="" srcset="">
                    <h5>{{detail.teacher.name}}</h5>
                </div>
                <div class="person-work">
                    <p>任职单位：天津银行</p>
                    <p>职位：{{detail.teacher.position}}</p>
                    <p>中付商学院签约导师</p>
                </div>
            </div>
            <p>简介：</p>
            <div class="info" v-html="detail.teacher.detail"></div>
        </div>
        <div class="list">
            <div class="m-flex class-item" v-for="(item,index) in classlList" :key="index">
                <img class="right-img" :src="item.img" alt="" srcset="">
                <div class="left-box m-flex" @click="goRoute('classDetails', item.id)">
                    <p class="right-spine"><span v-for="i in item.tag" :key="i.id">{{i.name}}</span></p>
                    <h4>{{item.title}}</h4>
                    <p>发布时间：2020-08-19 12:30</p>
                    <p class="start-num">已有<span>{{item.views}}</span>人学习</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            detail: {},
            classlList:[]
        }
    },
    created(){
        const {teacher_id} = this.$route.query
        if(teacher_id) this.init(teacher_id - 0)
    },
    methods:{
        init(teacher_id){
            this.$http({
                url: '/api/v1/get_teacher_courses',
                method: 'post',
                data: {
                    teacher_id
                }
            }).then(res=>{
                this.detail = res.result[0];
                this.classlList = res.result;
            })
        },
        goRoute(url,course_id){
            this.$router.push({
                path: '/' + url,
                query: {
                    course_id
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>

.wrap {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    .teacher-info {
        .person-photo {
            width: 140px;
            text-align: center;
            img {
                width: 80px;
                height: 80px;
                display: inline-block;
                border-radius: 50%;
                margin: 10px auto 0;
            }
        }
        .person-work {
            flex: 1;
            p {
                margin-top: 5px;
            }
            p:first-child{
                margin-top: 30px;
            }
        }
        .info {
            padding:10px 0;
            border-bottom: 2px solid #ccc;
        }
    }
}
</style>

