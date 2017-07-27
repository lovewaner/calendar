<template>
    <div class="dialog" v-if="dialogShow">
        <div class="dialog_body">
            <h3>提示</h3>
            <span>{{ dialogText }}</span>
            <div>
                <button class="determine" @click="sureEvent">确定</button>
                <button class="cancal" @click="cancalEvent">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dialogShow: {
            type: Boolean,
            default: false
        },
        dialogText: {
            type: String,
            default: '您确定要清空所有数据吗？'
        }
    },
    methods: {
        sureEvent() {
            this.$emit('sureEvent')
        },
        cancalEvent() {
            this.$emit('cancalEvent')
        }
    }
}
</script>