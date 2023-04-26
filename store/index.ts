import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { HouseColor } from '../types/models'

export const state = () => ({
  houseColors: [] as Array<HouseColor>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  houseColors: (state) => state.houseColors,
}

export const mutations: MutationTree<RootState> = {
  delete(state, id: number) {
    const remainingItems = state.houseColors.filter(
      (houseItem) => houseItem.id !== id
    )
    state.houseColors = remainingItems
  },
  update(state, item: HouseColor) {
    const index = state.houseColors.findIndex(({ id }) => id === item.id)
    if (index < 0) return
    state.houseColors[index] = item
    state.houseColors = state.houseColors.slice()
  },
  create(state, item: HouseColor) {
    state.houseColors.push(item)
  },
  setItems(state, items: Array<HouseColor>) {
    state.houseColors = items
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getAll({ commit }, context) {
    const items = await context.$getAllItems()
    commit('setItems', items)
  },
}
