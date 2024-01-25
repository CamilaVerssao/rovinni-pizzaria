<template>   
    <div>     
        <h1 class="order-number mx-5">Pedido #{{ this.orders.id }}</h1>
        <div class="d-flex justify-content-center flex-column align-items-center text-center">
            <div class="row d-flex flex-column align-items-center">
                <div class="table-content my-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Produto</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Qtd.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">   
                                <td>{{ item.nome }} {{ item.tamanho }}</td>
                                <td>R${{ item.preco }}</td>
                                <td>{{ item.quantidade }}</td>   
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-content w-75">
                    <table class="table">
                        <tbody>
                            <tr>     
                                <td class="total-field fw-bold">Total</td>
                                <td class="total-field fw-bold">R${{ this.orders.total }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="resume-table d-flex justify-content-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Data</th>
                            <th scope="col">Forma de pagamento</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td>{{ formatData(this.orders.createdAt) }}</td>
                            <td>{{ this.orders.pagamento }}</td>
                            <td>{{ this.orders.status }}</td>   
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="buttons position-fixed bottom-0 d-flex gap-3 my-3 mx-3">
                <button class="btn btn-danger" @click="this.$router.push('/order-list')">Voltar</button>
                <button class="btn btn-success">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';
    import  moment from 'moment';

    export default {
        data: () => ({
            paramId: null,
            orders: {},
            items: null
        }),
        methods: {
            async getOrderById(id) {
                const data = (await Axios.get(`/pedido/${id}`)).data;
                this.orders = data;
            },
            async getPedidoItems(id) {
                const data = (await Axios.get(`/pedido_item?pedido=${id}`)).data;
                this.items = data;
                console.log(this.items)
            },
            formatData(data) {
                return moment(data).format('DD/MM/YYYY');
            }
        },
        async mounted() {
            this.paramId = this.$route.params.id;
            await this.getOrderById(this.paramId);
            await this.getPedidoItems(this.paramId);
        }
    }
</script>

<style lang="scss" scoped>

    .order-number {
        font-size: 2.5vh;
        margin-top: 14vh;
    }

    .table-content {
        width: 40vw;
    }

    .total-field {
        font-size: 3.5vh;
    }

    .resume-table {
        width: 50vw;
        margin-top: 17vh;
    }

    .buttons {
       right: 0;
    }

</style>