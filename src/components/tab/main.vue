<template>
    <div>
        <mt-tabbar>
            <ul class="m-flex tab-bar">
                <li @click.stop="go('/')" :class="{'active-tab': name=='cla'}">
                    课程
                </li>
                <li @click.stop="go('/investment')" :class="{'active-tab': name=='inv'}">
                    招商会
                </li>
                <li @click.stop="go('/advertising')" :class="{'active-tab': name=='adv'}">
                    素材
                </li>
            </ul>
            <!-- <mt-tab-item id="课程" @click.stop.native="go('/')">
                <img slot="icon" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761615686,1603926157&fm=26&gp=0.jpg">
                课程
            </mt-tab-item>
            <mt-tab-item id="招商会">
                <img slot="icon" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761615686,1603926157&fm=26&gp=0.jpg">
                招商会
            </mt-tab-item>
            <mt-tab-item id="素材">
                <img slot="icon" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761615686,1603926157&fm=26&gp=0.jpg">
                素材
            </mt-tab-item> -->
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name: 'tab',
    props: {
        name: {
            type: String,
            default: '课程'
        }
    },
    data(){
        return {
        }
    },
    methods:{
        go(name){
            this.$router.push(name)
        }
    }
}
</script>

<style lang="less" scoped>

.mint-tabbar{
  background-color: #fff;
}

.tab-bar {
    padding: 0;
    width: 100%;
    justify-content: space-around;
    height: 44px;
    align-items: center;
    .active-tab {
        color: red;
    }
}
</style>

