<template>
    <div class="editData" v-if="TableShow">
        <div class="searchData">
            <input type="text" placeholder="筛选关键字" v-model="searchValue">
        </div>
        <div class="editContent" v-if="editShow">
            <input type="text" v-model="editValue" v-focus @keyup.13="sureEvent">
            <button @click="sureEvent">确定</button>
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
                            <button class="edit" @click="edit(index)">编辑</button>
                            <button class="delete" @click="deleted(index,item.id)">删除</button>
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
            var id = this.searchValue
            return this.$store.state.event.filter((res) => {
                return res.content.indexOf(id) !== -1
            })
        }
    },
    data () {
        return {
            editShow: false,
            num: 0,
            searchValue: ''
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
        deleted(index,id){
            this.$emit('delete',index,id)
        },
        edit(index) {
            this.editShow = true
            this.num = index
            this.editValue = this.searchData[index].content          
        },
        sureEvent() {
            if(this.editValue){
                this.searchData[this.num].content = this.editValue   
                this.editShow = false      
            }else{
                alert('编辑内容不能为空')                      
            }
        }
    }
}
</script>