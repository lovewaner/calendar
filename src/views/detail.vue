<template>
	<div class="detail">
		<secHeader :msg="title"></secHeader>
		<div class="detail">
			
		</div>
	</div>
</template>
<script type="text/javascript">
import secHeader from '../components/secHeader'
export default{
	components: {
		secHeader
	},
	data() {
		return {
			title: '订单详情'
		}
	}
}
</script>