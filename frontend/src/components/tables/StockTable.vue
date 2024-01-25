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
                    <td>{{ estoque.categoriaId == 6 ? estoque.nome : estoque.produtoNome }} {{ estoque.tamanho }}</td>
                    <td>{{ estoque.estoqueMinimo }}</td>
                    <td v-if="estoque.estoqueAtual < estoque.estoqueMinimo" :style="{ color : '#FF0000' }">{{ estoque.estoqueAtual }}</td>
                    <td style="color: rgb(0, 163, 0)" v-else>{{ estoque.estoqueAtual }}</td>
                    <td>
                        <div class="buttons">
                            <EditButton :href="`/#/edit-stock/${estoque.categoriaId == 6 ? estoque.id : estoque.produtoId}/${estoque.categoriaId}`" />
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
            ingredientes: [],
            produtos: [],
            stock: []
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
        async mounted() {
            await this.getIngredientes();
            await this.getProdutos();
        }
    }
</script>

<style lang="scss" scoped>

    #table-content {
        text-align: center;
        width: 60vw;
        height: fit-content;
        max-height: 70vh;
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