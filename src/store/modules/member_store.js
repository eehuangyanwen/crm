const state={
    count:100
}
const mutations={
        inc(state){
          state.count++
        },
        dec(state,n){
          state.count+=99
        }
}

export default {
    namespace:true,
    state,
    mutations
}