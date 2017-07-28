<template>
    <div>
        <svg aria-hidden="true" :class="['icon',{'iconClose': open}]" @click="open = !open">
            <use xlink:href="#icon-jiantou1"></use>
        </svg>
        <div v-if="open">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            open: false
        }
    }
}
</script>