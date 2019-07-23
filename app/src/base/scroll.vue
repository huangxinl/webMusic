<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            defalse: 1
        },
        click: {
            type: Boolean,
            defalse: true
        },
        data: {
            type: Array,
            defalse: null
        }
    },
    mounted() {
        setTimeout(()=>{
            this._initScroll()
        },20)
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper){
                return 
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType: this.probeType,
                click: this.click
            })
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        say() {
            console.log('he')
        }
    },
    watch: {
        data() {
            setTimeout(()=>{
                this.scroll.refresh()
            },20)
        }
    }
}
</script>

<style>

</style>
