<template>
    <div >
        <div class="all-content">
             <Sidebar />       
             <div class="column">
                    <div class="top">  
                        <Title :title="title" class="mx-5" />
                         
                        <div id="search-bar" class="d-flex">
                            <div class="input-group mb-3" id="search-input">
                                <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                                <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra">
                            </div>
                        </div>

                    </div>
                    <button @click="this.$router.push('/personalize-order')" id="personalize-btn">Personalizar</button>
                    <div class="left-content d-flex">
                        <div class="cards">
                            <ItemCardAdd :produtos="produto" :palavra="palavra" />
                        </div>
                        
                        <div id="all-content">
                            <h1 id="itens-number"><font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #000000;" /> {{ numItens }} itens</h1>
                            <div class="top-right">
                                <div class="item-row d-flex right-position" v-for="carrinho in filterCart" :key="carrinho.id">
                                    <p>{{ carrinho.nome }} {{ getSizeName(carrinho.tamanhoId) }}</p>
                                    <p style="font-weight: bold;">R$ {{ carrinho.preco.toFixed(2) }}</p>
                                    <p style="font-weight: bold;">R$ {{ carrinho.totalCart.toFixed(2) }}</p>
                                    <button @click="deleteItem(carrinho.id)" id="x-btn"><font-awesome-icon :icon="['fas', 'xmark']" style="color: #000000;"/></button>
                                </div> 
                            </div>
                            <hr>
                            <div class="bottom-right">
                                <div class="item-row d-flex right-position">
                                    <p>Subtotal</p>
                                    <p class="right-position">R$ {{ total.toFixed(2) }}</p>
                                </div>
                                <div class="item-row d-flex right-position">
                                    <p style="font-weight: bold; font-size: 28px;">Total</p>
                                    <p class="total" style="font-weight: bold; font-size: 28px;" >R$ {{ total.toFixed(2) }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div id="buttons" class="pt-4">            
                            <button class="btn btn-success" @click="this.$router.push('/order-payment')">Ir para pagamento  <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #ffffff;" /></button>
                        </div>     
                    </div>
             </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import Sidebar from '@/components/Sidebar.vue';
    import OrderSummary from '@/components/OrderSummary.vue';
    import ItemCardAdd from '../components/cards/ItemCardAdd.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';
    import Input from '@/components/Input.vue';

    export default {
        data: () => ({
            title: 'Vender',
            produto: null,
            palavra: "",
            cart: null,
            numItens: 0,
            tamanhos: null,
            total: 0.0,
            selectedSize: null
        }),
        components: {
            ItemCardAdd,
            Sidebar,
            OrderSummary,
            ReturnButton,
            Title,
            Input
        },
        methods: {
            async getProducts() {
                const data = (await Axios.get('/produto')).data;
                this.produto = data;
            },
            deleteItem(id) {
                sessionStorage.removeItem(id);
                window.location.reload();
            },
            async getSizes() {
                const data = (await Axios.get('/tamanho')).data;
                this.tamanhos = data;
            },
            getSizeName(id) {
                if (!this.tamanhos || this.tamanhos.length === undefined) {
                    return "Tamanho não encontrado";
                }

                const size = this.tamanhos.find(size => size.id === id);

                return size ? size.nome : "";
            },
        },
        computed: {
            filterCart() {

                if(!this.produto) {
                    return '';
                }

                let subTotal = 0.0;

                const filteredCart = this.produto.filter((prod) => {
                    for (let i = 0; i < this.cart.length; i++) {
                        if (prod.id == this.cart[i]) {
                            let obj = JSON.parse(sessionStorage.getItem(prod.id));
                            prod.totalCart = obj.totalCart;
                            this.total += prod.totalCart;
                            return true;
                        }
                    }

                    return false;
                });

                console.log(filteredCart)

                return filteredCart;
                
            } 
  },
  mounted() {
    this.getProducts();
    this.getSizes();
    this.cart = Object.keys(sessionStorage);
    this.numItens = this.cart.length;

  },
}
</script>

<style lang="scss" scoped>

   .column button {
    margin-left: 40px;
   }

  .cards div {
    display: flex;
    height: fit-content;
    max-height: 600px;
    overflow-y: auto;
    width: 800px;
    flex-wrap: wrap;
  }

  #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

    #personalize-btn {
        background-color: #ee991a ;
        width: 100px;
        border: 0;
        border-radius: 20px;
        padding: 8px;
        margin-bottom: 30px;
        transition: all 0.5s;
    }

    #personalize-btn:hover {
        background-color: #c38222 ;
    }

    .left-content {
        gap: 200px;
    }

    #search-input {
        width: 100%;
        max-width: 400px;
        max-height: 40px;
        height: 100%;
    }

    #search-bar {
        margin: 0 auto;
        width: 30vw;
        height: 110px;
        gap: 30px;
        padding: 0;
    }

    #search-bar h1 {
        font-size: 25px;       
    }

    #search-bar button {
        background-color: transparent;
        border: 1px solid #DEE2E6;
        border-radius: 10px;  
        height: 40px;
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }

    
    #all-content {
        width: 28vw;
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
        width: fit-content
    }

    .top-right {
        height: fit-content;
        max-height: 200px;
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