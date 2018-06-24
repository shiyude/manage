const mutations = {
    changeTerminal(state,data){
        state.terminalMessages = data
    },
    changeUser(state,data){
        state.userDatas = data
    },
    changeAlert(state,data){
      state.isAlert = data
    }
};
export default mutations
