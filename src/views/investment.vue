<template>
    <div class="wrap">
        <!-- :bottom-method="loadBottom" -->
        <mt-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" ref="loadmore">
             <div class="notiy-data" v-if="!list.length">
                当前数据为空
            </div>
            <div class="list">
                <div class="item" v-for="item in list" :key="item.id">
                    <a :href="item.url"><img :src="item.photo" alt="" srcset=""></a>
                    <h4>{{item.title}}</h4>
                    <p><span>2020-12-11</span><span>{{item.views}}人观看</span></p>
                </div>
            </div>
            <!-- <div class="list">
                <div class="item">
                    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1435063610,1481689467&fm=26&gp=0.jpg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1449349041,2952919415&fm=26&gp=0.jpg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="./../img/timg.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="./../img/timg.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598376314805&di=479a2d717d05afb10fc4ef58e01d35fc&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190522%2Fd85b1618bed14de8a2e5919b5bab334b.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2365042503,2675498505&fm=26&gp=0.jpg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1449349041,2952919415&fm=26&gp=0.jpg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="./../img/timg.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="./../img/timg.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598376314805&di=479a2d717d05afb10fc4ef58e01d35fc&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190522%2Fd85b1618bed14de8a2e5919b5bab334b.jpeg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
                <div class="item">
                    <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2365042503,2675498505&fm=26&gp=0.jpg" alt="" srcset="">
                    <h4>8月20号招商会</h4>
                    <p><span>2020-12-11</span><span>10人观看</span></p>
                </div>
            </div> -->
        </mt-loadmore>
        <Tab name="inv"></Tab>
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
        init(){
            this.$http({
                url: '/api/v1/get_meeting_list',
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
            console.log('loadTop')
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            //   ...// 加载更多数据
            console.log('loadBottom')
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

