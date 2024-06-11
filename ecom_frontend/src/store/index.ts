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
      if (storedCart !== null) {
        state.cart = JSON.parse(storedCart);
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
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
  }
  
  },
  getters: {},
  actions: {},
  modules: {}
});
