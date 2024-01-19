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
                    <td>R$ {{ lucro.custo == null ? getCusto(lucro.ingredientes) : lucro.custo }}</td>
                    <td>{{ lucro.volumeVendas }}</td>
                    <td>R$ {{ ((lucro.preco * lucro.volumeVendas) - ( lucro.ingredientes ? getCusto(lucro.ingredientes) : lucro.custo)).toFixed(2)  }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            lucros: null,
            tamanhos: null,
            ingredientes: null,
            pizzaIngred: null
        }),
        props: {
            palavra: ""
        },
        methods: {
            async getProfits() {
                const data = (await Axios.get('/produto')).data;
                this.lucros = data;
            },
            async getIngredients() {
                const data = (await Axios.get('/ingrediente')).data;
                this.ingredientes = data;
            },
            async getPizzaIngrediente() {
                const data = (await Axios.get('/pizza_ingrediente')).data;
                this.pizzaIngred = data;
                console.log(this.pizzaIngred)
            },
            getCusto(arrIngred) {
                if (!arrIngred || arrIngred.length === 0) {
                    return "Array de ingredientes não encontrado";
                }

                let custoTotal = 0.0;

                if (this.ingredientes && this.ingredientes.length > 0) {
                    arrIngred.forEach(item => {
                        const ingrediente = this.ingredientes.find(ingred => ingred.id === item.id);

                        if (ingrediente) {
                            custoTotal += ingrediente.precoRelativo * item.quantidade;
                        }
                    });
                } else {
                    custoTotal = arrIngred.length * 2.5; 
                }

                return custoTotal.toFixed(2);
            },
        },
        computed: {
            filterProfits() {

                if (!this.palavra) {
                    return this.lucros;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();

                return this.lucros.filter(luc =>
                    luc.nome.toLowerCase().includes(lowerCasePalavra)
                );
            },
        },
        mounted() {
            this.getProfits();
            this.getIngredients();
            this.getPizzaIngrediente();
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