<template>
    <div class="index">
        <Nheader @modelShow="modelShow"></Nheader>
        <model :isShow="isShow" @clearData="clearData" @editDataEvent="editDataEvent"></model>
        <div class="content" :class="{'hide': table}">
            <div class="search">
                <input type="text" placeholder="待办事项" v-model.trim="waitValue" class="n_input" @keyup.enter="add" v-focus>
                <button @click="add">提交</button>
            </div>
            <div class="searchResult">
                <ul class="searchResult_ul">
                    <li class="searchResult_li" >
                        <div class="no_component" >
                            <span>未完成</span>
                        </div>
                        <open class="open">
                            <ul class="cancal">
                                <li v-for="(item,index) in waitList" :key="index">
                                    <input type="checkbox" @click="goDown(item.id,$event)">
                                    <p class="waitText">{{ item.content }}</p>
                                    <button @click="MoveCancal(item.id,$event)">取消</button>
                                </li>
                            </ul>    
                        </open> 
                    </li>
                    <li class="searchResult_li">
                        <div class="no_component">
                            <span>已完成</span>
                        </div>
                        <open class="open">
                            <ul class="cancal">
                                <li v-for="(item,index) in DownList" :key="index">
                                    <input type="checkbox" checked @click="MoveWait(item.id,$event)">
                                    <p class="waitText">{{ item.content }}</p>
                                    <span style="font-size: 14px;">{{ item.time}}</span>
                                </li>
                            </ul>    
                        </open> 
                    </li>
                    <li class="searchResult_li">
                        <div class="no_component">
                            <span>已取消</span>
                        </div>
                        <open class="open">
                            <ul class="cancal">
                                <li v-for="(item,index) in CanaclList" :key="index">
                                    <p class="waitText waitText_color">{{ item.content }}</p>
                                    <button @click="MoveWait(item.id,$event)">恢复</button>
                                </li>
                            </ul> 
                        </open>
                    </li>
                </ul>
            </div>
            <div class="footer">
            	<router-link to="/sigin" tag="div" type="primary" class="footer_sigin">
            		<div class="footer_sigin_r">
            			点击签到
            		</div>
            	</router-link>
            	<router-link to="/order" tag="div" type="primary" class="footer_sigin ">我的订单</router-link>
            </div>
        </div>
        <editData :TableShow="table" @delete="dialogEvent"></editData>
        <dialogs :dialogShow="dialogShow" @sureEvent="sureEvent" @cancalEvent="cancalEvent"></dialogs>
    </div>
</template>
<script>
import Nheader from '../components/header'
import model from '../components/model'
import open from '../components/open'
import dialogs from '../components/dialog'
import editData from '../components/editData'
import { mapActions } from 'vuex'
export default {
    components: {
        Nheader,
        model,
        dialogs,
        editData,
        open
    },
    data () {
        return {
            isShow: false,
            waitValue: '',
            dialogShow: false,
            table: false,
            del_info: {
                index: 0,
                id: 0
            }
        }
    },
    methods: {
        modelShow() {
            if(this.table){
                this.table = !this.table
            }else{
                this.isShow = !this.isShow
            }
        },
        add() {
            let _this = this 
            let param = {
                id: 0,
                type: 1,
                content: '',
                time: ''
            }
            if(_this.waitValue){
                param.content = _this.waitValue
                _this.$store.dispatch('ADDEVENT',param)
            }else{
                alert('请输入您要记录的内容')
            }
            this.componentShow = true
            this.waitValue = ''
        },
        goDown(id,event){
            if(event.target.checked){
                this.$store.dispatch('GODOWN',id)
                event.target.checked = false
                this.componentShow1 = true
            }
            
        },
        MoveWait(id,event){
            if(!event.target.checked && event){
                this.$store.dispatch('GOWAIT',id)
                event.target.checked = true
            }else if(id){
                this.$store.dispatch('GOWAIT',id)
            }
        },
        MoveCancal(id){
            this.$store.dispatch('GOCANCAL',id)
        },
        clearData() {
            this.dialogShow = true
        },
        sureEvent() {
            if(this.$store.state.event){
                this.$store.dispatch('CLEARDATA')
                this.isShow = false

            }else{
                alert('您暂时还没有数据哦!!')
            }
            this.dialogShow = false            
        },
        cancalEvent() {
            this.dialogShow = false
        },
        editDataEvent() {
            this.table = true
            this.isShow = false
        },
        dialogEvent(index,id){
            this.del_info = {
                index: index,
                id: id
            }
            this.$store.dispatch('DELETEEVENT',this.del_info)
        }
    },
    computed: {
        waitList() {
            return this.$store.state.event.filter((res) => {
                if(res.type === 1){
                    return res
                }
            })
        },
        DownList() {
            return this.$store.state.event.filter((res) => {
                if(res.type === 2){
                    return res
                }
            })
        },
        CanaclList() {
            return this.$store.state.event.filter((res) => {
                if(res.type === 3){
                    return res
                }
            })
        }
    }
}
</script>