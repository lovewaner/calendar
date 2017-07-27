import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToDou,Timer } from '../units/units.js'

Vue.use(Vuex)

const localEvent = function(item){
    this.get = function () {
        return JSON.parse(localStorage.getItem(item));
    }
    this.set = function (obj) {
        localStorage.setItem(item,JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(item);
    }
}
const local = new localEvent('ty')

const store = new Vuex.Store({
    state: local.get() || {
        event: [],
        count: 0
    },
    mutations: {
        addevent(state,obj) {
            state.count ++
            obj.items.id = state.count
            state.event.unshift(obj.items)
            local.set(state)
        },
        goDown(state, id) {
            for (let i = 0; i < state.event.length; i++) {
                if(state.event[i].id == id){
                    state.event[i].type = 2
                    state.event[i].time = Timer()
                    var item = state.event[i]
                    state.event.splice(i,1)
                }
            }
            state.event.unshift(item)
            local.set(state)
        },
        goWait(state,id){
            for (let i = 0; i < state.event.length; i++) {
                if(state.event[i].id == id){
                    state.event[i].type = 1
                    var item = state.event[i]
                    state.event.splice(i,1)
                }                
            }
            state.event.unshift(item)
            local.set(state)
        },
        goCancal(state,id) {
            for (let i = 0; i < state.event.length; i++) {
                if(state.event[i].id === id){
                    state.event[i].type = 3
                    var item = state.event[i]
                    state.event.splice(i,1)
                }                
            }
            state.event.unshift(item)
            local.set(state)
        },
        clearData(state){
            local.clear()
            state.event = []
        }
    },
    actions:{
        ADDEVENT({commit} ,param){
            commit('addevent',{items: param})
        },
        GODOWN({commit}, id){
            commit('goDown',id)
        },
        GOWAIT({commit}, id){
            commit('goWait',id)
        },
        GOCANCAL({commit},id){
            commit('goCancal',id)
        },
        CLEARDATA({commit}){
            commit('clearData')
        }
    }
})

export default store