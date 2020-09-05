import Light from './light.js'
import lightComponent from './light-component/main.vue'

export default {
    /*
     * install function
     * @param  {Vue} Vue
     * @param  {object} options  lightBox options
     */
    install(Vue, options = {}) {
        let LightClass = Light(Vue)
        const light = new LightClass(options)
        const isVue2 = Vue.version.split('.')[0] === '2'
        let Constroll = Vue.extend(lightComponent)
        let component = new Constroll();
        light.component = component;
        if (isVue2) {
            Vue.directive('light', {
                bind: light.add.bind(light),
                unbind: light.remove.bind(light)
            })
        }
    }
}