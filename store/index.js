export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getProducts(state) {
    return state.products
  },

  getSelectedIsland(state) {
    return state.selectedIsland
  },

  getSelectedProcedure(state) {
    return state.selectedProcedure
  },

  // getProcedures(state) {
  //  return state.procedures.map((item) => {
  //    item._id.match(this.selectedProcedure)
  //  })
  // },
}
