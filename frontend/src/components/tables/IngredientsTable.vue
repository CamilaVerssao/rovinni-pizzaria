<template>
    <div id="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Ingrediente</th>
                    <th scope="col">Preço relativo</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in filterIngredients" :key="ingredient.id">   
                    <td>{{ ingredient.nome }}</td>
                    <td>R$ {{ ingredient.precoRelativo.toFixed(2) }}</td>
                    <td id="buttons">
                        <EditButtonVue :href="`/#/edit-ingredient/${ingredient.id}`" />
                        <DeleteButtonVue @click="deleteIngredient(ingredient.id)" />
                    </td>   
                </tr>
            </tbody>
        </table>
    </div>        
</template>

<script>

    import { Axios } from '@/configAxios';

    import CheckBox from '../CheckBox.vue';
    import DeleteButtonVue from '../buttons/DeleteButton.vue';
    import EditButtonVue from '../buttons/EditButton.vue';

    export default {
        data: () => ({
            ingredients: null,
            tamanhos: null
        }),
        components: {
            CheckBox,
            EditButtonVue,
            DeleteButtonVue
        },
        props: {
            palavra: ""
        },
        methods: {
           async getIngredients() {
            const data = (await Axios.get('/ingrediente')).data;
            this.ingredients = data;
           },
           async deleteIngredient(id) {
                if (confirm("Deseja mesmo excluir?") === true) {
                    await Axios.delete(`/ingrediente/${id}`);
                    this.getIngredients();
                }
           }
        },
        computed: {
            filterIngredients() {

                if (!this.palavra) {
                    return this.ingredients;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();

                return this.ingredients.filter(ing =>
                    ing.nome.toLowerCase().includes(lowerCasePalavra)
                );
            }
        },
        mounted() {
            this.getIngredients();
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

    #buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
</style>