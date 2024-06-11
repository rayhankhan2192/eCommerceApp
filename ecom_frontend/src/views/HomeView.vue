<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to MyShop
        </p>
        <p class="subtitle">
          The best cloth store online!
        </p>
      </div>
    </section>

  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered">Latest Products</h2>
    </div>

    <!-- <div class="column is-3" v-for="product in latestProducts" v-bind:key="product.id">
      <div class="box">
        <figure class="image mb-4">
          <img :src= "product.get_thumbnail">
        </figure>
        <h3 class="is-size-4">৳{{ product.price }}</h3>
        <h3 class="is-size-3">{{ product.name }}</h3>

        <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View Details</router-link>
      </div>
    </div> -->
    <ProductBox 
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product" />
  </div>
</div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import ProductBox from '@/components/ProductBox';

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts()
    document.title = 'Home | MyShop'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)
      await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error);
        })
        this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<!-- <style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style> -->
