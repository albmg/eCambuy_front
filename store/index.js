export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  // showMunicipalities(state) {
  //  console.log(state.municipalities)
  //  console.log('paquete', state.selectedIsland)
  //  return state.municipalities.filter(
  //    (item) => item.islandCode._id === state.selectedIsland
  //  )
  // },
}
