<template>
    <div>
        <div class="all-content">
            <Sidebar />
            <div class="column mx-5 mt-5">
                <Title :title="title" />
                <div class="content d-flex">
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
            <div id="buttons" class="pt-4">        
                <button class="btn btn-danger" @click="cancelarPedido">Voltar</button>
                <button class="btn btn-success" @click="confirmPayment">Confirmar pagamento</button>
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
            funcionario: null
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
                
                const data = {
                    pagamento: this.payment,
                    status: this.status,
                    total: this.total,
                    funcionario_id: this.funcionario.id,
                    cliente_id: 1
                }

                const pedido = (await Axios.post('/pedido', data)).data;
                const pedidoId = pedido.id;

                for(let i = 0; i < this.cart.length; i++) {
                    const productId = this.cart[i];
                    const productData = JSON.parse(sessionStorage.getItem(productId));

                    const cartItem = {
                        pedido_id: pedidoId,
                        prod_id: productId,
                        quantidade: productData.quantity
                    }

                    await Axios.post('/pedido_item', cartItem);
                }

                sessionStorage.clear();

                this.$router.push("/order-list");
            },
            async cancelarPedido() {
                this.status = 'Cancelado';

                const data = {
                    pagamento: this.payment,
                    status: this.status,
                    total: this.total,
                    funcionario_id: this.funcionario.id,
                    cliente_id: 1,
                    deleted_at: new Date()
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
                        if (prod.id == this.cart[i]) {
                            let obj = JSON.parse(sessionStorage.getItem(prod.id));
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

    .content {
        display: flex;
        margin: 0 auto;
        justify-content: space-evenly;
        gap: 400px;
        align-items: center;
        height: 100%;
        margin-top: -80px;
    }

    .form-of-payment { 
        margin-top: 40px;
    }

    .form-of-payment h1 {
        margin-bottom: 20px;
    }

    .options button {
        background-color: transparent;
        border: none;
        width: fit-content;
        font-size: 17px;
        transition: all 0.4s;

        &:hover {
            transform: translateY(-5px);
        }
    }

    .options {
        flex-direction: column;

    }
    .icons {
        margin-top: 5px;
        width: fit-content;

    }

    #title-right {
        font-size: 25px;   
    }

    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

</style>