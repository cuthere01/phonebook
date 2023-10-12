import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: [].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    currentid: null,
    category: 'all'
  },
  mutations: {
    // Мутация для добавления нового контакта
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    currId(state, currid){
      state.currentid = currid;
    },
    updateContact(state, updatedContact) {
      const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
      state.contacts[index] = updatedContact;
    },
    deleteContact(state, deleteId) {
      const index = state.contacts.findIndex(contact => contact.id === deleteId);
      state.contacts.splice(index, 1);
    },
    selectCategory(state, category){
      state.category = category;
    }
  },
  actions: {
    // Действие для добавления нового контакта
    addContact({ commit }, contact) {
      // Здесь можно выполнить дополнительные операции, например, валидацию данных
      commit('addContact', contact);
    },
    currId({ commit }, currid){
      commit('currId', currid);
    },
    updateContact({ commit }, updatedContact) {
      commit('updateContact', updatedContact);
    },
    deleteContact({ commit }, deleteId) {
      commit('deleteContact', deleteId);
    },
    selectCategory({ commit }, category) {
      commit('selectCategory', category);
    },
  },
  getters: {
    // Геттер для получения всех контактов
    allContacts(state) {
      return state.contacts;
    },
    selectedCategory(state) {
      return state.category;
    },
  }
})