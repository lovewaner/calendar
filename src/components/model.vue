<template>
    <transition name="fade" mode="">
        <div class="model" v-if="isShow">
            <div class="model_button">
                <button @click="downData('notepad.txt',getData)">下载数据</button>
                <button @click="editDataEvent">编辑数据</button>
                <button @click="clearData">清空数据</button>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data () {
        return {
            // isShow: false
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clearData() {
            this.$emit('clearData')
        },
        downData(filename,data){
            let a = document.createElement('a')
            let blob = new Blob([data])
            a.download = filename
            a.href = URL.createObjectURL(blob)
            console.log(a.href)
            a.click()
            URL.revokeObjectURL(blob)
        },
        editDataEvent() {
            this.$emit('editDataEvent')
        }
    },
    computed: {
        getData() {
            return JSON.stringify(this.$store.state)
        }
    }
}
</script>