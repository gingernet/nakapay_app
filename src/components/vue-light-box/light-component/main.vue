<template>
    <div id="light" class="lg-wrap" @click="tap">
        <p class="light-top">{{index + 1}}/{{list.length}}</p>
        <div class="light-slide" ref="img">
            <div class="light-slide-item" v-for="item in list" :key="item">
                <img class="lg-wrap-img" :src='item' />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list: [],
            index: 0,
            translate: 0,
            src: '',
            node: null,
        }
    },
    mounted(){
        let startX, moveX, distanceX;
        let imgbox = this.$refs.img;
        let w = window.innerWidth,s=0,et=0;
         console.log('mounted',w,imgbox)
        // 设置宽度
        imgbox.querySelectorAll('.light-slide-item').forEach((item)=> item.style.width = w +'px')
        // 定位起点位置偏移量
        imgbox.style.transform= `translateX(${w * this.index * -1}px)`;
        this.translate = w * this.index * -1;
        // 滚动监听事件
        imgbox.addEventListener('touchstart',  (e)=> {
            s=new Date().valueOf();
            startX = e.targetTouches[0].clientX
            imgbox.style.transition = 'all 0s ease-in-out'
        },true)
    
        imgbox.addEventListener('touchmove',  (e)=> {
            moveX = e.targetTouches[0].clientX
            distanceX = moveX - startX
            imgbox.style.left =  - distanceX + 'px'
            imgbox.style.transform= `translateX(${this.translate + distanceX}px)`;
        })
    
        imgbox.addEventListener('touchend',  (e) =>{
            et=new Date().valueOf();
            imgbox.style.transition = 'all 0.3s ease-in-out'
            console.log('距离',distanceX)
            const abs = distanceX / Math.abs(distanceX);
            if(Math.abs(distanceX) > (w/2) || (et-s) < 400){
                if(this.index - abs > -1 && this.index-abs < this.list.length){
                    this.translate = this.translate + w * abs;
                    imgbox.style.transform= `translateX(${this.translate}px)`;
                    this.index-=abs;
                    s=0
                    et=0
                    return false;
                };
            };
            imgbox.style.transform= `translateX(${this.translate}px)`
    
        },false)
    },

    methods:{
        tap(e){
            let event = e || window.event
            event.stopPropagation()
            event.preventDefault()
            event.stopImmediatePropagation();
            document.querySelector('#light').style.display = 'none'
            return false;
        },

        // 初始化数据
        init(options = {}){
            this.list = options.list
            this.index = options.index
            this.src = this.list[this.index]
            let imgbox = this.$refs.img;
            let w = window.innerWidth;
            // console.log('init')
            // 设置宽度
            if(imgbox){
                 imgbox.querySelectorAll('.light-slide-item').forEach((item)=> item.style.width = w +'px')
                // 定位起点位置偏移量
                imgbox.style.transform= `translateX(${w * this.index * -1}px)`;
                this.translate = w * this.index * -1;
            }
            // console.log(options)
        },

        // 暂时无用
        addImg(type){
            let img = '';
            const html = document.createElement("div")
            html.className="light-slide-item"
            html.style.width = window.innerWidth + 'px'
            const imgHtml = document.createElement("img")
            imgHtml.className = 'lg-wrap-img'
            html.appendChild(imgHtml)
            if(type=='right' && (this.index) < this.list.length){
                html.querySelector('img').src = this.list[this.index]
                this.$refs.img.appendChild(html)
            }
            if(type=='left' && (this.index) > -1){
               html.querySelector('img').src = this.list[this.index]
                this.$refs.img.insertBefore(html,this.$refs.img.childNodes[0])
            }
        },
    }
}
</script>

<style>
.lg-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    color: #fff;
    display: flex;
    align-items: center;
    background-color: rgba(0,0,0,1);
    pointer-events: painted;
    z-index: 9999;
}
.light-top {
    position: absolute;
    top: 30px;
    right: 50%;
    margin-right: -35px;
    width: 60px;
    padding: 5px;
    border-radius: 20px;
    text-align: center;
    z-index: 9;
    background-color: rgba(0,0,0,0.5);
}
.light-slide {
    display: flex;
    justify-content: start;
    align-items: center;
}
.light-slide-item {
    padding: 5px;
    box-sizing: border-box;
}
.light-slide-item .lg-wrap-img {
    width:100%; 
    object-fit: contain;
    border-radius: 5px;
    overflow: hidden;
}
</style>