<template>
    <div class="editData" v-if="TableShow">
        <div class="searchData">
            <select value="筛选类型">
                <option value="1">未完成</option>
                <option value="2">已完成</option>
                <option value="3">已取消</option>
            </select>
            <input type="text" placeholder="筛选关键字">
        </div>
        <div class="editContent">
            <input type="text" v-model="editValue">
            <button>确定</button>
            333
        </div>
        <table>
            <thead>
                <tr>
                    <th class="lest">#</th>
                    <th>所有事项</th>
                    <th>类型</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <transition-group name="fade">
                    <tr v-for="(item,index) in searchData" :key="index">
                        <th>{{ index + 1 }}</th>
                        <th>{{ item.content }}</th>
                        <th>{{ getType(item.type) }}</th>
                        <th>
                            <button class="edit">编辑</button>
                            <button class="delete" @click="deleted(index)">删除</button>
                        </th>
                    </tr>
                </transition-group>
            </tbody>
        </table>
    </div>
</template>
<script>
export default{
    props: {
        TableShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        searchData() {
            return this.$store.state.event
        }
    },
    methods: {
        getType(type){
            let str = ''
            switch (type) {
                case 1:
                    str = '未完成'
                    break;
                case 2:
                    str = '已完成'
                    break;
                case 3:
                    str = '已取消'
                    break;
                default:
                    break;
            }
            return str
        },
        deleted(index){
            this.searchData.splice(index,1)
        }
    }
}
</script>