// CMD > npm i vuex@next --save
import { createStore } from "vuex";

export default createStore({

    // 상태변수(전역변수)
    // 그 어떤  컴포넌트에서도 바꿀 수 있는 변수
    // 공통적으로 써야하는 변수 정의
    state : {
        counter : 20,
        menu : 'home', 
        
        // 더 추가 가능
    },

    // 결과값을 가지고 가는 메소드
    getters : {
        getMenu(state){
            return state.menu;
        },

        getCounter(state){  // 그대로 값
            return state.counter;
        },

        getCounter1 : state => {  // 가공된 값
            return state.counter * 2;
        }
    },

    // 결과값을 바꾸는 것(동기=순차적으로 시행한다. 효율이 떨어짐)
    mutations:{
        setMenu : (state, value) => {
            state.menu = value;
        },


        setCounter : (state, value) => {
            state.counter = value;
        },

        setCounter1(state, value){
            state.counter = value + 100;
        }

    },

    // 결과값을 바꾸는 것(비동기=시작은 순서대로 끝나는 순서는 달라진다.)
    // getters가 있어야 이 부분이 사용 가능
    actions:{
        actionCounter(context, payload){
            const value = payload.counter;
            // 위에 생성되어 있는 setCounter를 호출함
            context.commit('setCounter', value);
            
        }


    }

});