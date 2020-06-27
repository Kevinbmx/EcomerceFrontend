import {accesPermissionsByUserTokenUrl,hasThisPermissionUrl} from '../../../packages/config'

const state = {
  rolId:'',
  acceso:[],

}
const getters={
  hasPermission: state => permiso => {
    // console.log(state.acceso)
    return (state.acceso.find(a => a.name === permiso)) ? true : false ;
},
}
const mutations = {
  retrieveAcceso(state, allAcceso) {
    state.acceso = allAcceso
  },
  retrieveRolForUser(state, rolId) {
    state.rolId = rolId
  },
}
const actions = {
  //accesPermissionsByUserToken 
  retrieveAcceso({ dispatch, commit}){
    if(localStorage.getItem('access_token')){
      this.$myApi.get(accesPermissionsByUserTokenUrl)
        .then(response => {
          dispatch('retrieveRolForUser',response.data.role_id)
          commit('retrieveAcceso', response.data.rolePermission)
        });
    }
  },
  retrieveRolForUser(context,roleId){
    localStorage.setItem('role_id', roleId)
    context.commit('retrieveRolForUser', roleId)
  },
  hasThisPermission(context, permission){
    return new Promise((resolve, reject) => {
      this.$myApi.post(hasThisPermissionUrl ,{
        namePermission: permission,
        })
        .then(response => {
          // console.log(response)
          resolve(response.data.hasPermission)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      }
    )}
}

export default{
    state, getters, mutations, actions
  }
  