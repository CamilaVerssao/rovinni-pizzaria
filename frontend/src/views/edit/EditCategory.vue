<template>
    <div>
        <div class="all-content d-flex w-100 justify-content-center">
            <Sidebar />
            <div class="column d-flex w-100 mx-5 mt-5 flex-column">
                <Title :title="this.editing ? 'Editar Categoria' : 'Nova Categoria'"/>
                <div id="all-content">
                    <div class="row d-flex w-100">
                        <div class="product-field d-flex flex-column w-100 mt-4">
                            <h1 class="field-title">
                                Nome da Categoria
                            </h1>
                            <input type="text" :placeholder="this.editing ? filterCategory(this.paramId)?.nome ?? '' : 'Digite a categoria'" class="form-control" v-model="categoria">
                        </div>
                        <div class="product-field d-flex flex-column w-100 mt-4">
                            <div class="form-check d-flex gap-3 align-content-center" id="check-ativo">
                                <h1 class="field-title">Ativo</h1>
                                <CheckBox :isDisabled="false" :isChecked="this.editing ? filterCategory(this.paramId)?.ativo ?? '' : false" @click="this.ativo = !this.ativo" />
                            </div>
                        </div>    
                    </div>
                    <div class="product-field d-flex flex-column w-100 mt-4">
                        <h1 class="field-title">Descrição</h1>
                        <textarea name="desc-field" id="desc-field" cols="30" rows="10" :placeholder="this.editing ? filterCategory(this.paramId)?.descricao ?? '' : 'Digite a categoria'" v-model="descricao"></textarea>
                    </div>
                </div> 
                <div id="buttons" class="pt-4 d-flex position-fixed gap-4">
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

    .product-field {
        max-width: 30%;
    }

    .product-field textarea {
        width: 40vw;
    }

    .field-title {
        font-size: 2.3vh;
    }

    #check-ativo {
        margin-top: 40px;
    }

    #buttons {
        bottom: 5vh;
        right: 5vh;
    }

    .form-control {
        min-width: 200px;
    }

</style>