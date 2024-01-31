<template>
    <div>
        <div class="all-content">
            <Sidebar />    
            <div class="teste position-relative w-100">        
            <Title :title="title" id="titulo" class="mx-5 mt-5 position-absolute" />
            <div class="column">
                <div class="content d-flex justify-content-center">
                    <OrderSummary />
                    <div class="form-of-payment">
                        <h1 id="title-right">Forma de pagamento</h1>
                        <hr>
                        <div class="options d-flex">
                            <div class="form-check">
                                <input v-model="payment" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="'Dinheiro'">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Dinheiro
                                </label>
                            </div>
                            <div class="form-check my-2">
                                <input v-model="payment" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="'Cartão de Crédito'">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Cartão de Crédito
                                </label>
                            </div>
                            <div class="form-check my-2">
                                <input v-model="payment" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="'Cartão de Débito'">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Cartão de Débito
                                </label>
                            </div>
                            <div class="form-check my-2">
                                <input v-model="payment" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="'Pix'">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Pix
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="buttons" class="pt-4 d-flex position-fixed gap-4">        
                <button class="btn btn-danger" @click="cancelarPedido">Voltar</button>
                <button class="btn btn-success" @click="confirmPayment">Confirmar pagamento</button>
            </div>
        </div>      
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import Sidebar from '../components/Sidebar.vue'
    import Title from '@/components/Title.vue';
    import OrderSummary from '../components/OrderSummary.vue';

    export default {
        data: () => ({
            title: 'Pagamento',
            payment: null,
            cart: null,
            produto: null,
            total: null,
            status: null,
            pedidos: null,
            cookieValue: null,
            funcionario: null,
            teste: null
        }),
        components: {
            Sidebar,
            Title,
            OrderSummary
        },
        methods: {
            async getProducts() {
                const data = (await Axios.get('/produto')).data;
                this.produto = data;
            },
            async getOrders() {
                const data = (await Axios.get('/pedidos')).data;
                this.pedidos = data;
            },
            async confirmPayment() {

                this.status = 'Concluído';
                const cart = this.filterCart;
                
                const data = {
                    pagamento: this.payment,
                    status: this.status,
                    total: this.total,
                    funcionario_id: this.funcionario.funcionarioId,
                    cliente_id: 1
                }

                if(this.payment) {                 

                    const pedido = (await Axios.post('/pedido', data)).data;
                    const pedidoId = pedido.id;
                    const promises = [];

                    for(let i = 0; i < this.cart.length; i++) {
                        const productId = this.cart[i];                    
                        const productData = JSON.parse(sessionStorage.getItem(productId));

                        const ingredientes = (await Axios.get(`/pizza_ingrediente?produtoId=${productId}`)).data;
                        console.log(ingredientes);

                        const cartItem = {
                            pedido_id: pedidoId,
                            prod_id: productId,
                            quantidade: productData.quantity
                        }

                        promises.push(Axios.post('/pedido_item', cartItem)); 

                        for (let i = 0; i < ingredientes.length; i++) {
                            promises.push(Axios.put(`/ingrediente/${ingredientes[i].ingredienteId}`, { estoqueAtual: ingredientes[i].ingredEstoqueAtual - ingredientes[i].quantidadeIngrediente }));
                        }
                        
                    }

                    console.log( await Promise.all(promises));

                    await Promise.all(promises);

                    sessionStorage.clear();

                    this.$router.push("/order-list");
                }
                else {
                    alert('Escolha uma forma de pagamento.')
                }
                
            },
            async cancelarPedido() {
                this.status = 'Cancelado';

                const data = {
                    pagamento: this.payment,
                    status: this.status,
                    total: 0,
                    funcionario_id: this.funcionario.id,
                    cliente_id: 1
                }

                await Axios.post('/pedido', data);
                
                this.$router.push('/order');
            },
            async getFunc() {
                this.funcionario = (await Axios.get(`/funcionario?id=${this.userValue}`)).data[0];
            }
        },
        computed: {
            filterCart() {

                if(!this.produto) {
                    return '';
                }

                let subTotal = 0.0;
                let total = 0.0;

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

                filteredCart.map((prod) => {
                    total += prod.totalCart;
                })

                this.total = total;
            
                return filteredCart;
            } 
        },
        mounted() {
            this.cart = Object.keys(sessionStorage);            
            this.userValue = Object.keys(localStorage)[0];
            this.getFunc();
            this.getProducts();
        }
    }
</script>

<style lang="scss" scoped>

    .all-content {
        display: flex;
        margin: 0 auto;
        width: 100%;
    }

    .column {
        height: 100vh;
        align-items: center;
        justify-content: center;
    }

    .content {
        display: flex;
        justify-content: space-evenly;
        gap: 10vw;
        align-items: center;
        height: fit-content;
    }

    #titulo {
        height: fit-content;
        left: 0;
    }

    .form-of-payment h1 {
        margin-bottom: 3vh;
    }

    .options button {
        background-color: transparent;
        border: none;
        width: fit-content;
        font-size: 1.7vh;
        transition: all 0.4s;

        &:hover {
            transform: translateY(-5px);
        }
    }

    .options {
        flex-direction: column;
    }



    #title-right {
        font-size: 2.3vh;   
    }

    #buttons {
        bottom: 5vh;
        right: 5vh;
    }

</style>