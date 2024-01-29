<template>
    <div id="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Venda</th>
                    <th scope="col">Custos</th>
                    <th scope="col">Volume vendas</th>
                    <th scope="col">Lucros</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lucro in filterProfits" :key="lucro.produtoId">
                    <td>{{ lucro.produtoNome }} {{ lucro.tamanho }}</td>     
                    <td>R$ {{ lucro.custo == null ?  getCusto(lucro.produtoId) : lucro.custo }}</td>
                    <td>{{ lucro.volumeVendas }}</td>
                    <td>R$ {{ lucro.custo == null ? (lucro.preco * lucro.volumeVendas) - (getCusto(lucro.produtoId) * lucro.produtoEstoqueAtual) : (lucro.preco * lucro.volumeVendas) - (lucro.custo * lucro.produtoEstoqueAtual) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            tamanhos: null,
            ingredientes: null,
            pizzaIngred: null
        }),
        props: {
            palavra: ""
        },
        methods: {
            async getIngredients() {
                const data = (await Axios.get('/ingrediente')).data;
                this.ingredientes = data;
            },
            async getPizzaIngrediente() {
                const data = (await Axios.get('/pizza_ingrediente')).data;
                this.pizzaIngred = data;
            },
            getCusto(produtoId) {
                if (!this.pizzaIngred) {
                    return "Array de pizzaIngred não encontrado";
                }

                const ingredientsForProduct = this.pizzaIngred.filter(item => item.produtoId === produtoId);

                if (!ingredientsForProduct || ingredientsForProduct.length === 0) {
                    return "Array de ingredientes não encontrado";
                }

                let custoTotal = 0.0;

                if (this.pizzaIngred.length > 0) {
                    ingredientsForProduct.forEach(item => {
                        switch(item.tamanhoId) {
                            case 1:
                                custoTotal = item.precoRelativo * 2;
                                break;
                            case 2:
                                custoTotal = item.precoRelativo * 3;
                                break;
                            case 3:
                                custoTotal = item.precoRelativo * 4;
                                break;
                            case 4:
                                custoTotal = item.precoRelativo * 5;
                                break;
                        }
                    });
                }
                return custoTotal;
            },
        },
        computed: {
            filterProfits() {

                if (!this.palavra) {
                    return this.pizzaIngred;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();

                return this.pizzaIngred.filter(luc =>
                    luc.produtoNome.toLowerCase().includes(lowerCasePalavra)
                );
            },
        },
        async mounted() {
            await this.getIngredients();
            await this.getPizzaIngrediente();
            await this.getCusto();

            this.pizzaIngred = await Promise.all(
                this.pizzaIngred.map(async (lucro) => ({
                    ...lucro,
                    custo: lucro.custo == null ? await this.getCusto(lucro.produtoId) : lucro.custo
                }))
            );

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

</style>