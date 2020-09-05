<template>
  <svg :class="svgClass" aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
 
<script>
export default {
    name: 'svg-icon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        size: {
            type: [Number, String],
            default: 10
        },
        height: {
            type: [Number, String],
            default: null
        },
        width: {
            type: [Number, String],
            default: null
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        },
        icon() {
            if (!this.xml) {
                return {
                    width: 0,
                    height: 0,
                    id: ''
                }
            }
            const viewBox = this.xml.default.viewBox.split(' ')
            return {
                width: viewBox[2] || 0,
                height: viewBox[3] || 0,
                id: '#' + this.xml.default.id
            }
        },
        box() {
            return `0 0 ${this.icon.width} ${this.icon.height}`
        },
    }
}
</script>
 
<style scoped>
.svg-icon {
  /* width: 1em;
  height: 1em; */
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 4px;
}
</style>