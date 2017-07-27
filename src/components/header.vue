<template>
    <div class="header">
        <h1>{{ title }}</h1>
        <div class="icon_line" @click="modelShow">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            title: '记事本'
        }
    },
    methods: {
        modelShow() {
            this.$emit('modelShow')
        }
    }
}
</script>