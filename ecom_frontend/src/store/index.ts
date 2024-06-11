import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      const storedCart = localStorage.getItem('cart');
      const storetoken = localStorage.getItem('token');


      if (storedCart !== null) {
        state.cart = JSON.parse(storedCart);
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      if(storetoken != null){
        state.token = storetoken
        state.isAuthenticated = true
      }else{
        state.token = ''
        state.isAuthenticated = false
      }

    },




    addToCart(state: any, item: { product: { id: number }, quantity: number }) {
      const existingItemIndex = state.cart.items.findIndex((i: { product: { id: number; }; }) => i.product.id === item.product.id);
  
      if (existingItemIndex !== -1) {
          state.cart.items[existingItemIndex].quantity += item.quantity;
      } else {
          state.cart.items.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
  },
  setIsLoading(state, status){
    state.isLoading = status
  },
  setToken(state, token){
    state.token = token
    state.isAuthenticated = true
  },
  removeToken(state){
    state.token = ''
    state.isAuthenticated = false
  },
  clearCart(state) {
    state.cart = { items: [] }

    localStorage.setItem('cart', JSON.stringify(state.cart));
  }
  },


  getters: {},
  actions: {},
  modules: {}
});
