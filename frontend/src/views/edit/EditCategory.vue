<template>
    <div>
        <div class="all-content">
            <Sidebar />
            <div class="column mx-5">
                <div class="top">
                    <Title :title="this.editing ? 'Editar Categoria' : 'Nova Categoria'"/>
                </div>
                <div id="all-content">
                    <div class="row d-flex">
                        <div class="product-field">
                            <h1 class="field-title">
                                Nome da Categoria
                            </h1>
                            <input type="text" :placeholder="this.editing ? filterCategory(this.paramId)?.nome ?? '' : 'Digite a categoria'" class="form-control" v-model="categoria">
                        </div>
                        <div class="product-field">
                            <div class="form-check d-flex" id="check-ativo">
                                <h1 class="field-title">Ativo</h1>
                                <CheckBox :isDisabled="false" :isChecked="this.editing ? filterCategory(this.paramId)?.ativo ?? '' : false" @click="this.ativo = !this.ativo" />
                            </div>
                        </div>    
                    </div>
                    <div class="product-field">
                        <h1 class="field-title">Descrição</h1>
                        <textarea name="desc-field" id="desc-field" cols="30" rows="10" :placeholder="this.editing ? filterCategory(this.paramId)?.descricao ?? '' : 'Digite a categoria'" v-model="descricao"></textarea>
                    </div>
                </div> 
                <div id="buttons" class="pt-4">
                    <button class="btn btn-danger" @click="this.$router.push('/category-list')">Voltar</button>
                    <button class="btn btn-success" @click="createCategory()">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import Sidebar from '@/components/Sidebar.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';
    import CheckBox from '@/components/CheckBox.vue';
    
    export default {
        data: () => ({
            title: 'Editar Categoria',
            categoria: null,
            descricao: null,
            ativo: false,
            editing: false,
            paramId: null,
            categorias: null
        }),
        components: { 
            Sidebar,
            ReturnButton,
            Title,
            CheckBox
         },
         methods: {
            async getCategorias() {
                const data = (await Axios.get('/categoria')).data;
                this.categorias = data;
            },
            async createCategory() {

                const data = {
                    nome: this.categoria,
                    descricao: this.descricao,
                    ativo: this.ativo
                }

                if(this.areAllFieldsFilled()) {
                    if(this.editing) {
                        await Axios.put(`/categoria/${this.$route.params.id}`, data);
                    }
                    else {
                        await Axios.post('/categoria', data);
                    }

                    this.$router.push("/category-list");
                }
                else {
                    alert('Preencha todos os campos.');
                }
            },
            filterCategory(id) {
                if (!this.categorias) return null;

                const filteredCat = this.categorias.filter((cat) => {
                    if(cat.id == id) {
                        return true;
                    }
                    return false;
                });
                
                return filteredCat[0];
            },
            areAllFieldsFilled() {
                return (
                    this.categoria 
                );
            }
        },
        mounted() {
            this.getCategorias();

            this.paramId = this.$route.params.id;

            if(this.paramId) {
                this.editing = true;
            }
        } 
    }
</script>

<style lang="scss" scoped>

    .all-content {
        width: 100%;
        margin: 0 auto;
        display: flex;
    }

    .column {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .row {
        display: flex;
        width: 100%;
    }

    .product-field {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        width: 100%;
        margin-top: 30px;
    }

    .product-field #desc-field {
        height: 100px;
        overflow-y: auto;
        border: 1px solid #DEE2E6;
        border-radius: 10px;
    }

    .product-field textarea {
        width: 750px;
    }

    .field-title {
        font-size: 25px;
    }

    #check-ativo {
        gap: 50px;
        align-items: center;
        margin-top: 40px;
    }

    #title { 
        margin-left: 300px;
        font-size: 25px;
        margin-top: 30px;
        height: fit-content;     
    }

    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

</style>