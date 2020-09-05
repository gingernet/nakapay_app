import LightCom from './light-component/main.vue'
export default function(Vue) {
    return class Light {
        constructor({}) {
            this.version = '__VUE_LAZYLOAD_VERSION__'
            this.component = null;
            this.ListenerQueue = []
        }

        /*
         * add image listener to queue
         * @param  {DOM} el
         * @param  {object} binding vue directive binding
         * @param  {vnode} vnode vue directive vnode
         * @return
         */
        add(el, binding, vnode, value) {
            if (some(this.ListenerQueue, item => item.el === el)) {}
            console.log(binding)
            Vue.nextTick(() => {
                let len = this.ListenerQueue.length
                el.addEventListener('click', (e) => {
                    const src = this.ListenerQueue[len]
                    this.component.init({
                        list: this.ListenerQueue,
                        index: len
                    });
                    if (document.querySelector('#light')) {
                        document.querySelector('#light').style.display = 'flex'
                    } else document.querySelector('body').appendChild(this.component.$mount().$el);
                })
                this.ListenerQueue.push(binding.value || el.src)
            })
        }

        /**
         * remove listener form list
         * @param  {DOM} el
         * @return
         */
        remove(el) {
            if (!el) return
            const existItem = find(this.ListenerQueue, item => item.el === el)
            if (existItem) {
                remove(this.ListenerQueue, existItem)
            }
        }
    }
}

function find(arr, fn) {
    let item
    for (let i = 0, len = arr.length; i < len; i++) {
        if (fn(arr[i])) {
            item = arr[i]
            break
        }
    }
    return item
}

function remove(arr, item) {
    if (!arr.length) return
    const index = arr.indexOf(item)
    if (index > -1) return arr.splice(index, 1)
}


function some(arr, fn) {
    let has = false
    for (let i = 0, len = arr.length; i < len; i++) {
        if (fn(arr[i])) {
            has = true
            break
        }
    }
    return has
}