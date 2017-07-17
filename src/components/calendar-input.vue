<template>
    <div class="calendar-input-container" v-show="show">
        <label for="calendar-input">
            <input type="text" ref="mainInput" v-model="selectValue" class="calendar-input">
        </label>
        <transition name="fade">
            <div id="calendar" v-show="changeShowCalendar">
                <div id="calendar-header">
                    <span class="arrow" @click="subMonth">&lt;</span>
                    <span id="date-box">
                        {{trueSelectYear}} 年 {{trueSelectMonth}} 月
                    </span>
                    <span class="arrow" @click="addMonth">&gt;</span>
                </div>
                <div class="week">
                    <span v-for="(item,index) in week" :key="index">{{item}}</span>
                </div>
                <div class="day">
                    <span v-for="(item,index) in renderData" :class="{
                        unselect: unselectArr.includes(index),
                        select: index === trueSelectDay + firstDayInWeek - 1,
                        }" @click="changeSelectDay(index)" :key="index">{{item}}</span>
                </div>
                <button @click='checkIn' v-if="!signin">点击签到</button>    
                <button @click='checkIn' v-if="signin">已签到</button>   
                <div>222222222222222</div> 
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            changeShowCalendar: true,
            week:["日", "一", "二", "三", "四", "五", "六"],
            date: new Date(),
            selectYear: new Date().getFullYear(),
            selectMonth: (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1),
            selectDay: new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate(),
            limit:{
                minYear: 1970,
				minMonth: 1,
				minDay: 1,
				maxYear: 2030,
				maxMonth: 3,
				maxDay: 23
            },
            show: true,
            signin: false
        }
    },
    methods: {
        focus () {
            this.changeShowCalendar = !this.changeShowCalendar
        },
        subMonth(){
            if(this.selectMonth === 1){
                this.selectMonth = 12
                this.selectYear --
            }else{
                this.selectMonth --
            }
            if(this.selectYear < this.limit.minYear) this.selectYear = this.limit.minYear
            if(this.selectYear === this.limit.minYear && this.selectMonth <= this.limit.minMonth){
                this.selectMonth = this.limit.minMonth
            }
        },
        addMonth(){
            if(this.selectMonth === 12){
                this.selectMonth = 1
                this.selectYear ++
            }else{
                this.selectMonth ++
            }
            if(this.selectYear > this.limit.maxYear){
                this.selectYear = this.limit.maxYear
            }
            if(this.selectYear === this.limit.maxYear && this.selectMonth >= this.limit.maxMonth){
                this.selectMonth = this.limit.maxMonth
            }
        },
        changeSelectDay(index){
            if (this.unselectArr.includes(index)) return false
            this.selectDay = index - this.firstDayInWeek + 1
            if(this.selectDay !== new Date().getDate()){
                this.signin = false
            }
        },
        checkIn(){
            var _this = this
            let Data = new Date()
            if(this.selectDay === Data.getDate()){
                if(this.signin){
                    weui.alert('今天已签到，明天再来哦(*^__^*) ')
                }else{
                    weui.dialog({
                        content: '签到成功！获得1积分！',
                        buttons:[{
                            label: '确定',
                            onClick: function () { 
                                _this.signin = true
                            }
                        }]
                    })
                }
            }else if(this.selectDay > Data.getDate() || this.selectMonth > (Data.getMonth() + 1) || this.selectYear > Data.getFullYear){
                weui.alert('还没到时间')
            }else{
                weui.dialog({
                    content: '是否需要补签 ?',
                    buttons:[{
                        label: '取消',
                        type: 'default'
                    },{
                        label: '确定',
                        type: 'primary',
                        onClick: function () { 
                            _this.signin = true
                        }
                    }]
                })
            }
        }
    },
    computed: {
        trueSelectYear() {
            if(this.selectYear < this.limit.minYear) return this.limit.minYear
            if(this.selectYear > this.limit.maxYear) return this.limit.maxYear
            return this.selectYear
        },
        trueSelectMonth() {
            if(this.selectYear === this.limit.minYear && this.selectMonth < this
            .limit.minMonth) return this.limit.minMonth
            if(this.selectYear === this.limit.maxYear && this.selectMonth > this
            .limit.maxMonth) return this.limit.maxMonth
            return this.selectMonth
        },
        trueSelectDay(){
            if(this.selectYear === this.limit.minYear && this.selectMonth === this.limit.minMonth && this.selectDay < this.limit.minDay) return this.limit.minDay
            if(this.selectYear === this.limit.maxYear && this.selectMonth === this.limit.maxMonth && this.selectDay > this.limit.maxDay) return this.limit.maxDay
            if(this.selectDay > this.dayCount) return this.dayCount
            return this.selectDay
        },
        selectValue(){
            return this.trueSelectYear + '-' + this.trueSelectMonth + '-' + this.trueSelectDay;
        },
        dayCount(){
            return new Date(this.trueSelectYear,this.trueSelectMonth,0).getDate()
        },
        firstDayInWeek(){
            return new Date(this.trueSelectYear,this.trueSelectMonth - 1 ,1).getDay()
        },
        lastMonthDay(){
            let lastNum = this.firstDayInWeek
            let lastDays = []
            if(lastNum === 0) return lastDays
            let lastDayNum = new Date(this.trueSelectYear, this.trueSelectMonth - 1, 0).getDate()
            for (let i = 0; i < lastNum; i++) {
                lastDays.unshift(lastDayNum)
                lastDayNum--
            }
            return lastDays
        },
        nextMonthDay(){
            let num = 42 - this.lastMonthDay.length - this.dayCount
            let nextDays = []
            if(num === 0) return nextDays
            for (var i = 1; i <= num; i++) {
                nextDays.push(i)            
            }
            return nextDays
        },
        renderData(){
            let nowDays = []
            for (var i = 1; i <= this.dayCount; i++) {
                nowDays.push(i)
            }
            return [...this.lastMonthDay,...nowDays,...this.nextMonthDay]
        },
        unselectArr(){
           let arr = []
           let index = 0
           if(this.trueSelectYear === this.limit.minYear && this.trueSelectMonth === this.limit.minMonth){
                for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
                    arr.push(index)
                }
            }else{
                for (; index < this.firstDayInWeek; index++) {
                    arr.push(index)       
                }
            }
            if(this.trueSelectYear === this.limit.maxYear && this.trueSelectMonth === this.limit.maxMonth){
                index = this.firstDayInWeek + this.limit.maxDay
                for (; index < 42; index++) {
                    arr.push(index);                
                }
            } else {
                index = this.firstDayInWeek + this.dayCount;
                for (; index < 42; index++) {
                    arr.push(index);
                }
            }
            return arr
        }
    }
}
</script>

<style scoped>
.calendar-input-container{
    width: 100%;
}
.calendar-input{
    width: 100%;
    height: 30px;
    font-size: 100%;
    text-align: center;
    color: #333;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
#calendar-header{
    display: flex;
    justify-content: space-between;
    line-height: 300%;
    margin: 10px 0;  
}
#calendar-header .arrow{
    font-size: 200%;
    color: #999;   
    cursor: pointer; 
    transition: color .5s;
}
#calendar-header .arrow:hover{
    color: #666;
}
#date-box{
    color: #999;
}
.week span{
    float: left;
    width: 14.285%;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
.day span{
    float: left;
    width: 14.285%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    transition: all .5s;
}
.day span:hover{
    background-color: #fa86a2;
    color: #fff;  
}
.day span.unselect:hover{
    background-color: #fff;
    color: #ccc;  
}
.select{
    color: #f00;
}
.unselect{
    background-color: #fff;
    color: #ccc;
}

button{
    padding: 10px 15px;
    background: #fff;
    border: none;
    border: 1px solid #fa86a2;
    color: #fa86a2;
    border-radius: 5px;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-top: 20px;
}
button:hover{
    background: #fa86a2;
    color: #fff;
}
</style>

