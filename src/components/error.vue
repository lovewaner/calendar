<template>
    <div class="error">
        <div class="error-img">
            <img src="../assets/noContent.png" alt="" />
        </div>
        <p class="error-msg">{{errMsg}}</p>
    </div>
</template>
<script>
export default {
    name: 'error',
    data() {
        return {
        }
    },
    props: {
        errMsg: {
            type: String,
            required: false,
            default: '暂无数据！'
        }
    }
}
</script>
<style lang="less" scoped>
.error {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .error-img {
        display: block;
        width: 4.36rem;
        height: 2.86rem;
        img {
            display: block;
            width: 4.36rem;
            height: 2.86rem;
        }
    }
    .error-msg {
        font-size: 16px;
        text-align: center;
        color: #bdbdbd;
    }
}
</style>