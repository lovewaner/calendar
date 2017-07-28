<template>
    <div class="header">
        <svg class="icon" aria-hidden="true" @click="goBack">
            <use xlink:href="#icon-iconfontunie61e"></use>
        </svg>
        <h1>{{ msg }}</h1>
        <div></div>
    </div>
</template>
<script>
export default{
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
    methods: {
        goBack() {
             history.back()
        }
    }
}
</script>
<style scoped lang="less">
.header{
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #999;
    border-bottom: 1px solid #ccc;
    box-shadow: 1px 1px 20px -3px #616161;  
}
h1{
    font-size:0.36rem;
    font-weight: normal;
}
svg{
    width: 0.36rem;
    height: 0.36rem;
    margin-top: 0.26rem;
}
</style>