<template>
  <div>
      <div id="all-content" class="mt-5">
          <h1 id="itens-number"><font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #000000;" /> {{ numItens }} itens</h1>
          <div class="top-right">
              <div class="item-row d-flex right-position" v-for="carrinho in filterCart" :key="carrinho.id"> <!--adicionar para cada entrada pelo botão lateral dos cards-->
                  <p>{{ carrinho.produtoNome }} {{ carrinho.tamanho }}</p>
                  <p style="font-weight: bold;">R$ {{ carrinho.preco.toFixed(2) }}</p>
                  <p style="font-weight: bold;">R$ {{ carrinho.totalCart.toFixed(2) }}</p>
                  <button @click="deleteItem(carrinho.produtoId)" id="x-btn"><font-awesome-icon :icon="['fas', 'xmark']" style="color: #000000;"/></button>
              </div> 
          </div>
          <div class="bottom-right">
              <div class="item-row d-flex right-position">
                  <p>Subtotal</p>
                  <p class="right-position">R$ {{ total.toFixed(2) }}</p>
              </div>
              <hr>
              <div class="item-row d-flex right-position">
                  <p style="font-weight: bold; font-size: 28px;">Total</p>
                  <p style="font-weight: bold; font-size: 28px;" class="right-position totalValue">R$ {{ total.toFixed(2) }}</p>
              </div>

          </div>
              
      </div>
  </div>
</template>

<script>

import { Axios } from '@/configAxios';

export default {
  data: () => ({
    cart: null,
    produtos: null,
    numItens: 0,
    tamanhos: null,
    total: 0.0
  }), 
  methods: {
    async getProducts() {
      const data = (await Axios.get('/produto')).data;
      this.produtos = data;
    },
    deleteItem(id) {
      sessionStorage.removeItem(id);
      window.location.reload();
    }
  },
  computed: {
    filterCart() {
      if(!this.produtos) {
        return '';
      }

      const filteredCart = this.produtos.filter((prod) => {
        for (let i = 0; i < this.cart.length; i++) {
          if (prod.produtoId == this.cart[i]) {
            let obj = JSON.parse(sessionStorage.getItem(prod.produtoId));
            prod.totalCart = obj.totalCart;
            this.total += prod.totalCart;
            return true;
          }
        }
        return false;
      });
      return filteredCart;
    }
  
  },
  mounted() {
    this.getProducts();
    this.cart = Object.keys(sessionStorage);
    this.numItens = this.cart.length;
  },
};
</script>


<style lang="scss" scoped>

  #all-content {
      width: 28vw;
      height: 100%;
  }

  #itens-number {
      font-size: 25px;
      margin-bottom: 50px;
  }

  #x-btn {
      background-color: transparent;
      border: 0;
  }

  .item-row {
      margin-bottom: 20px;
      justify-content: space-between;
  }

  .item-row p {
      width: fit-content;
  }

  .input-qty {
      width: 60px;
  }

  hr {
      width: 100%;
  }

  .top-right {
      max-height: 240px;
      height: fit-content;
      overflow-y: auto;
  }

  #discount-paragraph {
      display: flex;
      justify-content: flex-end;
      color: #4adaa6;
  }

  .right-position {
      display: flex;
      justify-content: space-between;
  }

  .bottom-right {
      max-height: fit-content;
  }

</style>