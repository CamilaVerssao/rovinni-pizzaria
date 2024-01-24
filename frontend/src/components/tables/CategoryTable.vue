<template>
    <div id="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Categoria</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Ativo</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoria in filterCategory" :key="categoria.id" >    
                    <td>{{ categoria.nome }}</td>
                    <td>{{ categoria.descricao }}</td>
                    <td><CheckBox :isChecked="categoria.ativo" :isDisabled="true" /></td>
                    <td id="buttons" class="d-flex gap-3 justify-content-center">
                        <EditButton :href="`/#/edit-category/${categoria.id}`" />
                        <DeleteButton @click="deleteCategory(categoria.id)" />
                    </td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import CheckBox from '../CheckBox.vue';
    import EditButton from '../buttons/EditButton.vue';
    import DeleteButton from '../buttons/DeleteButton.vue';

    export default {
        data: () => ({
            categories: null
        }),
        components: {
            CheckBox,
            EditButton,
            DeleteButton,
        },
        props: {
            categoria: null,
            descricao: null,
            ativo: null,
            palavra: ""
        },
        methods: {
            async getCategories() {
                const data = (await Axios.get('/categoria')).data;
                this.categories = data;
            },
            async deleteCategory(id) {

                if (window.confirm("Tem certeza que deseja excluir?") === true) {
                    await Axios.delete(`/categoria/${id}`);
                }

                this.getCategories();
            }
        },
        computed: {
            filterCategory() {

                if (!this.palavra) {
                    return this.categories;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();

                return this.categories.filter(cat =>
                    cat.nome.toLowerCase().includes(lowerCasePalavra)
                );
            },
        },
        mounted() {
            this.getCategories();
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