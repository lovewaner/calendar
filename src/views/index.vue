<template>
    <div class="index">
        <Nheader @modelShow="modelShow"></Nheader>
        <model :isShow="isShow" @clearData="clearData" @editDataEvent="editDataEvent"></model>
        <div class="content" :class="{'hide': table}">
            <div class="search">
                <input type="text" placeholder="待办事项" v-model.trim="waitValue" class="n_input" @keyup.enter="add">
                <button @click="add">提交</button>
            </div>
            <div class="searchResult">
                <ul class="searchResult_ul">
                    <li class="searchResult_li" >
                        <div class="no_component" @click="componentShow = !componentShow">
                            <span>未完成</span>
                            <svg aria-hidden="true" :class="['icon',{'iconClose': componentShow}]">
                                <use xlink:href="#icon-jiantou1"></use>
                            </svg>
                        </div>
                         <ul class="cancal" v-if="componentShow">
                            <li v-for="(item,index) in waitList" :key="index">
                                <input type="checkbox" @click="goDown(item.id,$event)">
                                <p class="waitText">{{ item.content }}</p>
                                <button @click="MoveCancal(item.id,$event)">取消</button>
                            </li>
                        </ul> 
                    </li>
                    <li class="searchResult_li">
                        <div class="no_component" @click="componentShow1 = !componentShow1">
                            <span>已完成</span>
                            <svg aria-hidden="true" :class="['icon',{'iconClose': componentShow1}]">
                                <use xlink:href="#icon-jiantou1"></use>
                            </svg>
                        </div>
                         <ul class="cancal" v-if="componentShow1">
                            <li v-for="(item,index) in DownList" :key="index">
                                <input type="checkbox" checked @click="MoveWait(item.id,$event)">
                                <p class="waitText">{{ item.content }}</p>
                                <span style="font-size: 14px;">{{ item.time}}</span>
                            </li>
                        </ul> 
                    </li>
                    <li class="searchResult_li">
                        <div class="no_component" @click="componentShow2 = !componentShow2">
                            <span>已取消</span>
                            <svg aria-hidden="true" :class="['icon',{'iconClose': componentShow2}]">
                                <use xlink:href="#icon-jiantou1"></use>
                            </svg>
                        </div>
                         <ul class="cancal" v-if="componentShow2">
                            <li v-for="(item,index) in CanaclList" :key="index">
                                <p class="waitText">{{ item.content }}</p>
                                <button @click="MoveWait(item.id,$event)">恢复</button>
                            </li>
                        </ul> 
                    </li>
                </ul>
            </div>
        </div>
        <editData :TableShow="table"></editData>
        <dialogs :dialogShow="dialogShow" @sureEvent="sureEvent" @cancalEvent="cancalEvent"></dialogs>
    </div>
</template>
<script>
import Nheader from '../components/header'
import model from '../components/model'
import dialogs from '../components/dialog'
import editData from '../components/editData'
import { mapActions } from 'vuex'
export default {
    components: {
        Nheader,
        model,
        dialogs,
        editData
    },
    data () {
        return {
            isShow: false,
            waitValue: '',
            componentShow: false,
            componentShow1: false,
            componentShow2: false,
            dialogShow: false,
            table: false
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
                this.isLength()
            }
            
        },
        MoveWait(id,event){
            if(!event.target.checked && event){
                this.$store.dispatch('GOWAIT',id)
                event.target.checked = true
            }else if(id){
                this.$store.dispatch('GOWAIT',id)
            }
            this.isLength()
        },
        MoveCancal(id){
            this.$store.dispatch('GOCANCAL',id)
            this.isLength()
        },
        isLength(){
            if(this.waitList.length !== 0){
                this.componentShow = true
            }else{
                this.componentShow = false
            }
            if(this.DownList.length !== 0){
                this.componentShow1 = true
            }else{
                this.componentShow1 = false
            }
            if(this.CanaclList.length !== 0){
                this.componentShow2 = true
            }else{
                this.componentShow2 = false
            }
        },
        clearData() {
            this.dialogShow = true
        },
        sureEvent() {
            if(this.$store.state.event){
                this.$store.dispatch('CLEARDATA')
                this.isShow = false
                this.isLength()
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
    },
    created () {
        this.isLength()
    }
}
</script>