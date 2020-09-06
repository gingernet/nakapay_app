<template>
    <div class="warp" >
        <div v-if='data' class="content">
            <img :src="data.photo" alt="" srcset="">
            <h4 class="title">{{data.title}}</h4>
            <div v-for="item in data.mfile" :key="item.id">
                <p>{{item.content}}</p>
                <mt-button type="primary" size="small" ><a download="图片" :href="item.file">下载</a></mt-button>
            </div>
            <!-- <a href="/images/logo.png" download="/images/logo.png">
                <img border="0" src="/images/logo.png" alt="runoob.com" >
            </a> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:{}
        }
    },
    created(){
        const {material_id} = this.$route.query
        if(material_id) this.init(material_id - 0)
    },
    methods:{
        init(material_id){
            this.$http({
                url: '/api/v1/material_detail',
                method: 'post',
                data: {
                    material_id
                }
            }).then(res=>{
                this.data = res.result
            })
        },
    }
}
</script>
<style lang="less" scoped>
.content {
    width: 100%;
    padding: 10px;
    img{
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
    h4{
        text-align: center;
    }
    div{
        text-align: center;
        p{
            text-align: left;
        }
        a {
            text-decoration: none;
            color: #fff;
        }
    }
}
</style>


