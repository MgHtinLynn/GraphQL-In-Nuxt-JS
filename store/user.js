import Vue from 'vue'
import usersQuery from '~/apollo/queries/users'

export const state = () => ({
  users: []
})

export const getters = {
  users (state) {
    return state.users
  }
}

export const mutations = {
  SET_USERS (state, payload) {
    Vue.set(state, 'users', payload)
  }
}

export const actions = {
  async setUsers (context) {
    const { data } = await this.app.apolloProvider.defaultClient.query({
      query: usersQuery,
      fetchPolicy: 'network-only'
    })
    context.commit('SET_USERS', data.users)
  }
}
