<template>
	<div class="order">
		<secHeader :msg="title"></secHeader>
		<div class="order_content">
			<ul class="order_type">
				<li :class="{ active: currentIndex === item.index }" @click="checkout({index:item.index,type:item.type})" v-for="(item,index) in switchItem">{{item.type}}</li>
			</ul>
			<div class="order_info">
				<h2>预约信息</h2>
				<div class="order_info_type">
					<span>维修代步车</span>
					<span>{{currentIndex === 0 ? '预计到店' : ''}} {{currentIndex === 1 ? '预计还车' : ''}} {{currentIndex === 2 ? '实际还车' : ''}}</span>
				</div>
				<ul class="order_info_ul">
					
					<router-link v-for="(item,index) in order" :key="index" :to="{path:`/detail/${item.Server_ID}`}" tag="li">
						<span class="storeName">{{ item.Customer_Name }}</span>
						<div class="order_r">
							<span>{{ item.DownOrder_Time }}</span>
							<svg class="icon" aria-hidden="true">
					            <use xlink:href="#icon-jiantou1"></use>
					        </svg>
						</div>
					</router-link>
				</ul>
			</div>
		</div>
		<loading :loadingShow="loadingShow"></loading>
		<error  v-if="order.length==0"></error>
	</div>
</template>
<script type="text/javascript">
import secHeader from '../components/secHeader'
import loading from '../components/loading'
import Error from '../components/error'
export default {
	components: {
		secHeader,
		loading,
		Error
	},
	data() {
		return {
			title: '我的订单',
			currentIndex: 0,
			order: [],
			switchItem:[
				{
					index: 0,
					type:'待处理'
				},
				{
					index: 1,
					type:'进行中'
				},
				{
					index: 2,
					type:'已完成'
				}
			],
			loadingShow: false
		}
	},
	created() {
		this.getOrder('待处理')
	},
	methods: {
		checkout(val){
			this.order = []
			this.currentIndex = val.index
			this.loadingShow = true
			this.getOrder(val.type)
		},
		getOrder(orderType) {
			var typeStr
			switch(orderType){
				case '待处理':
					typeStr = '待处理'
					break
				case '进行中':
					typeStr = '出租中'
					break
				case '已完成':
					typeStr = '已完成'
					break
			}
			setTimeout(() => {
				this.$axios(`business/plan?type=${typeStr}`).then((res) => {
					if(res.data.errcode === 0){
						this.order = res.data.data
						this.loadingShow = false
					}
				})
			},300)
		}
	}
}
</script>