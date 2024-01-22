<template>
    <div>
        <h1 id="order-number">Pedido #{{ this.orders.id }}</h1>
        <div class="row d-flex">
            <div class="table-content">
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
            <div class="table-content">
                <table class="table">
                    <tbody>
                        <tr>     
                            <td class="total-field">Total</td>
                            <td class="total-field">R${{ this.orders.total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="resume-table">
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
        <div id="buttons" class="pt-4">
            <button class="btn btn-danger" @click="this.$router.push('/order-list')">Voltar</button>
            <button class="btn btn-success">Salvar</button>
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

    #order-number {
        margin-top: 50px;
        font-size: 24px;
    }

    .row {
        width: 70vw;
        margin: 0 auto;
        align-items: center;
    }

     .table-content {
        text-align: center;
        width: 470px;
        margin: 0 auto;
        margin-top: 50px;
    }

    .total-field {
        font-size: 25px;
        font-weight: bold;
    }

    #resume-table {
        text-align: center;
        width: 50vw;
        margin: 0 auto;
        margin-top: 150px;
    }

    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

</style>