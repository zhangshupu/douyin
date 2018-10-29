import axios from 'axios'
const state = {
  list: {}
}
const mutations = {
  updataData(state, payload) {
    console.log(payload)
    state.list = payload
  },
  changePinglun(state, payload) {
    state.list.isShow = !state.list.isShow
  },
  changeDianzan(state, payload) {
    if (state.list.isSelect) {
      state.list.dianzan += 1;
      state.list.isSelect = false;
    } else {
      state.list.dianzan -= 1;
      state.list.isSelect = true;
    }
  },
  changeList(state, payload) {
    if (payload) {
      let arr = state.list.list;
      let obj = {
        name: '呵呵',
        text: payload,
        dianzan: 0,
        time: +new Date,
        isSelect: true
      }
      arr.unshift(obj);
      state.list.list = arr
    }
  },
  changeListDianzan(state, payload) {
    let arr = state.list.list;
    console.log(arr[payload].isSelect)
    if (arr[payload].isSelect) {
      arr[payload].dianzan += 1;
      arr[payload].isSelect = false;
    } else {
      arr[payload].dianzan -= 1;
      arr[payload].isSelect = true;
    }
  }
}
const actions = {
  getData({
    commit
  }) {
    axios('https://www.easy-mock.com/mock/5bd5983582302f7129a27f94/example/api')
      .then(res => {
        commit('updataData', res.data)
      })
  }
}



export default {
  namespaced: true,
  state,
  actions,
  mutations
}