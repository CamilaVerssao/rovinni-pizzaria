<template>
    <div >
        <div class="all-content">
             <Sidebar />       
             <div class="column">
                    <div class="top ">   
                         
                        <div id="search-bar" class="d-flex mt-5 mb-5">
                            <Title :title="title" class="mx-5" />
                          
                            <div class="input-group" id="search-input">
                                <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                                <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra">
                            </div>
                        </div>

                    </div>
                    <div class="left-content justify-content-center d-flex align-items-center">
                        <div class="cards d-flex justify-content-center flex-column">                    
                            <!-- <button @click="this.$router.push('/personalize-order')" id="personalize-btn" class="mb-3">Personalizar</button> -->
                            <ItemCardAdd :produtos="produto" :palavra="palavra" />
                        </div>
                        
                        <div class="right-content d-flex w-50 justify-content-center">
                            <div class="right-side w-75 h-100">
                                <h1 id="itens-number"><font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #000000;" /> {{ numItens }} itens</h1>
                                <div class="top-right">
                                    <div class="item-row d-flex right-position" v-for="carrinho in filterCart" :key="carrinho.produtoId">
                                        <p>{{ carrinho.produtoNome }} {{ carrinho.tamanho }}</p>
                                        <p style="font-weight: bold;">R$ {{ carrinho.preco.toFixed(2) }}</p>
                                        <p style="font-weight: bold;">R$ {{ carrinho.totalCart.toFixed(2) }}</p>
                                        <button @click="deleteItem(carrinho.produtoId)" id="x-btn"><font-awesome-icon :icon="['fas', 'xmark']" style="color: #000000;"/></button>
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
                            <button class="btn btn-success" @click="this.filterCart.length !== 0 ? this.$router.push('/order-payment') : this.alertar('Adicone ao menos um item no carrinho.')">Ir para pagamento  <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #ffffff;" /></button>
                        </div>  
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
            cart: [],
            numItens: 0,
            tamanhos: null,
            total: 0.0,
            selectedSize: null,
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
            alertar(msg) {
                window.alert(msg);
            }
            
        },
        computed: {
            filterCart() {

                if(!this.produto) {
                    return '';
                }

                let subTotal = 0.0;

                const filteredCart = this.produto.filter((prod) => {
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
        async mounted() {
            await this.getProducts();
            this.cart = Object.keys(sessionStorage);
            this.numItens = this.cart.length;
        }
    }
</script>

<style lang="scss" scoped>

    .all-content {
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        display: flex;
    }

   .column button {
        margin-left: 40px;
   }

   .cards {
        height: fit-content;
        max-height: 70vh;
        width: 50vw;
        max-width: 50%;
   }

  .cards div {
    display: flex;
    justify-content: center;
    height: fit-content;
    max-height: 70vh;
    flex-wrap: wrap;
  }

  #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
    }

    #personalize-btn {
        background-color: #ee991a ;
        width: 100px;
        border: 0;
        border-radius: 20px;
        padding: 8px;
        transition: all 0.5s;
    }

    #personalize-btn:hover {
        background-color: #c38222 ;
    }

    .left-content {
        width: 100%;
    }
    .right-content {
        width: 50%;
    }

    #search-input {
        width: 100%;
        max-width: 400px;
        max-height: 40px;
        height: 100%;
        width: 50%;
    }

    #search-bar {
        width: 100%;
        height: fit-content;
        gap: 30px;
        margin: 0;
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

    
    .rifht-content {
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

    .right-position {
        display: flex;
        justify-content: space-between;
    }

    .bottom-right {
        max-height: fit-content;
    }


</style>