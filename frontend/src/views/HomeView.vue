<template>
  <div >  
    <div class="all-content d-flex">
      <Sidebar />
      <div class="column d-flex">
        <div class="top mt-5">
          <div class="title-field d-flex mx-5">
              <Title :title="title"/> 
              <div id="search-bar" class="d-flex">
                <div class="input-group" id="search-input">
                  <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                  <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra" />       
                </div>
                <button @click="this.$router.push('/new-product')" id="add-btn"><font-awesome-icon :icon="['fas', 'circle-plus']" size="xl" style="color: #000000;" /> Novo</button>
              </div>
          </div>
        </div>
          <div class="cards">
            <ItemCard :produtos="produto" :detailHref="'/product-details'" :palavra="palavra" />
          </div>
      </div>
    </div>       
  </div>
</template>

<script>
import { Axios } from '@/configAxios';

import Sidebar from '@/components/Sidebar.vue';
import Input from '@/components/Input.vue';
import ItemCard from '../components/cards/ItemCard.vue';
import Title from '@/components/Title.vue';
import InputProduct from '@/components/InputProduct.vue';

export default {
  name: 'HomeView',
  data: () => ({
    title: 'Produtos',
    produto: null,
    palavra: ""
  }),
  props: {

  },
  methods: {
    async getProducts() {
      const data = (await Axios.get('/produto')).data;
      this.produto = data;
    }
  },
  components: {
    Sidebar,
    ItemCard,
    Input,
    Title,
    InputProduct
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<style >

  .title-field {
    height: fit-content;
  }

  .all-content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
  }

    .column {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    #search-input {
        width: 100%;
        max-width: 450px;
        max-height: 40px;
        height: 100%;
        
    }

    #search-bar {
        margin: 0 auto;
        width: 30vw;
        height: fit-content;
        gap: 30px;
    }

    #search-bar h1 {
        font-size: 25px;       
    }

    #search-bar button {
        background-color: transparent;
        border: 1px solid #DEE2E6;
        border-radius: 10px;  
        height: 40px;
        width: 150px;
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }

    #search-bar #add-btn {
        background-color: transparent;
        border: 0;
    }

    .cards {
      max-height: 80vh;
      height: fit-content;
      max-width: 100%;
    }

</style>

