<template>
	<transition name="fadeLoading">
		<div class="loading" v-if="loadingShow">
            <img src="http://img.chezhentong.com/loading-spokes.svg" alt="">
            <p style="color:#fff;">数据加载中....</p>
		</div>	
	</transition>
</template>
<script type="text/javascript">
export default {
	props:{
        loadingShow: {
            type: Boolean,
            required: false
        },
    }
}
</script>
<style lang="less" scoped>
.fadeLoading-enter-active, .fadeLoading-leave-active {
  transition: opacity 0.3s;
  opacity: 0.5;
}
.fadeLoading-enter, .fadeLoading-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
.loading{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #000;
    opacity: 0.5;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
}
img{
    width:24px;
    height:24px;
}
p{
    color: #dde4eb;
    font-size: 12px;
}
</style>