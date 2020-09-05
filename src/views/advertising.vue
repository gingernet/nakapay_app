<template>
    <div class="wrap">
        <!-- :bottom-method="loadBottom" -->
         <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">

            <div class="notiy-data" v-if="!list.length">
                当前数据为空
            </div>
             <div class="list" >
                <div class="item" v-for="item in list" :key="item.id" @click="goRoute(item.id)">
                    <img :src="item.photo" alt="" srcset="">
                    <h4>{{item.title}}</h4>
                    <p><span>2020-12-11</span><span>{{item.dl_times}}次下载</span></p>
                </div>
            </div>
        </mt-loadmore>
        <Tab name="adv"></Tab>
    </div>
</template>

<script>
import Tab from '../components/tab/main.vue'
export default {
    components: {Tab},
    data(){
        return {
            list:[],
            allLoaded: false,
        }
    },
    created(){
        this.init()
    },
    methods:{
        goRoute(material_id){
            this.$router.push({
                path: '/advertisingDetail',
                query: {
                    material_id
                }
            })
        },
        init(){
            this.$http({
                url: '/api/v1/get_material_list',
                method: 'post',
                data: {
                    page: 1,
                    number: 100
                }
            }).then(res=>{
                this.list = res.result;
                console.log('res',this.list)
            })
        },
        loadTop() {
            // ...// 加载更多数据
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            //   ...// 加载更多数据
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
        }
    }

}
</script>

<style lang="less" scoped>
.mint-loadmore {
    height: calc(100% - 44px);
    overflow-y: auto;
}


.wrap {
    padding: 5px 10px;
    height: 100%;
    .list{
        column-count: 2;
        column-gap: 10px;
        .item {
            width: 100%;
            text-align: center;
            display: inline-block;
            break-inside: avoid;
            img {
                width: 100%;
                border-radius: 3px;
                object-fit: cover;
            }
            p{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>

