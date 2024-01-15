<template>
    <div id="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Estoque mínimo</th>
                    <th scope="col">Estoque atual</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="estoque in filterStock" :key="estoque.id">    
                    <td>{{ estoque.nome }} {{ estoque.tamanho }}</td>
                    <td>{{ estoque.estoqueMinimo }}</td>
                    <td>{{ estoque.estoqueAtual }}</td>
                    <td>
                        <div class="buttons">
                            <EditButton :href="`/#/edit-stock/${estoque.id}`" />
                        </div>
                    </td>   
                </tr>
            </tbody>
        </table>
    </div>        
</template>

<script>

    import { Axios } from '@/configAxios';

    import EditButton from '../buttons/EditButton.vue';

    export default {
        data: () => ({
            ingredientes: null,
            produtos: null,
            stock: {}
        }),
        components: {
            EditButton
        },
        props: {
            palavra: ""
        },
        methods: {
            goToHome() {
                this.$router.push("/");
            },
            async getIngredientes() {
                const data = (await Axios.get('/ingrediente')).data;
                this.ingredientes = data;
            },
            async getProdutos() {
                const data = (await Axios.get('/produto?tipo=1')).data;
                this.produtos = data;
                this.stock = [ ...this.ingredientes, ...this.produtos ];
                console.log(this.stock)
            },
        },
        computed: {
            filterStock() {
                if (!this.palavra) {
                    return this.stock;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();
                
                return this.stock.filter(est =>
                    est.nome.toLowerCase().includes(lowerCasePalavra)
                );
            }
        },
        mounted() {
            this.getIngredientes();
            this.getProdutos();
        }
    }
</script>

<style lang="scss" scoped>

    #table-content {
        text-align: center;
        width: 60vw;
        margin: 0 auto;
        height: fit-content;
        max-height: 660px;
        overflow-y: auto;
    }

    #atual-stock-input {
        width: 80px;   
    }

    
    .buttons {
        display: flex;
        justify-content: center;
        gap: 10px;

    }

</style>