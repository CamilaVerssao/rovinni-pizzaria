<template>
    <div id="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Pedido</th>
                    <th scope="col">Data</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Funcionário</th>
                    <th scope="col">Total</th>
                    <th scope="col">Forma de pagamento</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pedido in pedidos" :key="pedido.id">
                    <td> {{ pedido.id }} 
                        <button id="details-btn" @click="this.$router.push(`/order-details/${pedido.id}`)">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass-plus']" style="color: #000000;" />
                        </button>
                    </td>     
                    <td>{{ formatData(pedido.createdAt) }}</td>
                    <td>{{ getClienteId(pedido.clienteId) }}</td>
                    <td>{{ getFuncId(pedido.funcionarioId) }}</td>
                    <td>R${{ pedido.total }}</td>
                    <td>{{ pedido.pagamento }}</td>
                    <td>{{ pedido.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';
    import  moment from 'moment';

    export default {
        data: () => ({
            pedidos: null,
            clientes: null,
            funcionarios: null,
            
        }),
        methods: {
            goToDetails() {
                this.$router.push('/order-details');
            },
            async getOrders() {
                const data = (await Axios.get('/pedido')).data;
                this.pedidos = data;
            },
            async getClients() {
                const data = (await Axios.get('/cliente')).data;
                this.clientes = data;
            },
            async getFuncs() {
                const data = (await Axios.get('/funcionario')).data;
                this.funcionarios= data;
            },
            getClienteId(id) {
                if (!this.clientes || this.clientes.length === undefined) {
                    return "Cliente não encontrado";
                }

                const cliente = this.clientes.find(cliente => cliente.id === id);

                return cliente ? cliente.nome : "";
            },
            getFuncId(id) {
                if (!this.funcionarios || this.funcionarios.length === undefined) {
                    return "Funcionário não encontrado";
                }

                const funcionario = this.funcionarios.find(funcionario => funcionario.id === id);

                return funcionario ? funcionario.username : "";
            },
            formatData(data) {
                return moment(data).format('DD/MM/YYYY');
            }
        },
        mounted() {
            this.getOrders();
            this.getClients();
            this.getFuncs();
        }
    }
</script>

<style lang="scss" scoped>
    #table-content {
        text-align: center;
        width: 60vw;
        margin: 0 auto;
        height: fit-content;
        max-height: 650px;
        overflow-y: auto;
    }

    #details {
        display: flex;  
    }

    #details button {
        background-color: transparent;
        border: 0;
    }

    #details-btn {
        background-color: transparent;
        border: none;
    }

</style>