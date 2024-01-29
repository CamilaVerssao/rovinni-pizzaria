<template>
    <div>   
        <div class="all-content d-flex w-100 justify-content-center">
            <Sidebar />
            <div class="column d-flex w-100 mx-5 mt-5 flex-column">
                <Title :title="title" />
                <div id="all-content">       
                    <div class="product-field d-flex flex-column w-100 mt-4">
                        <h1 class="field-title">Nome do ingrediente</h1>
                        <input type="text" class="form-control" :placeholder="this.editing ? filterIngredient(this.paramId)?.nome ?? '' : 'Digite o nome'" v-model="ingrediente">
                    </div>
                    <div class="product-field d-flex flex-column w-100 mt-4">
                        <h1 class="field-title">Preço unitário</h1>
                        <input type="number" step="0.01" class="form-control"  :placeholder="this.editing ? filterIngredient(this.paramId)?.precoRelativo ?? '' : 'Digite o preço unitário'" v-model="precoRelativo">
                    </div>
                </div>
                <div id="buttons" class="pt-4 d-flex position-fixed gap-4">
                    <button class="btn btn-danger" @click="this.$router.push('/ingredients-list')">Voltar</button>
                    <button class="btn btn-success" @click="createIngredient">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import Sidebar from '@/components/Sidebar.vue';
    import Title from '@/components/Title.vue';

    export default {
        data: () => ({
            title: 'Editar Ingrediente',
            ingrediente: null,
            ingredientes: null,
            precoRelativo: null,
            selected: null,
            editing: false,
            paramId: null,
        }),
        components: {
            Sidebar,
            Title
        },
        methods: {
            async getIngredients() {
                const data = (await Axios.get('/ingrediente')).data;
                this.ingredientes = data;
            },
            async createIngredient() {
                
                const data = {
                    nome: this.ingrediente,
                    preco_relativo: this.precoRelativo,
                    categoria_id: 6
                }

                if(this.areAllFieldsFilled()) {
                    if(this.editing) {
                        await Axios.put(`/ingrediente/${this.paramId}`, data);
                    }

                    else {
                        await Axios.post('/ingrediente', data);
                    }

                    this.$router.push("/ingredients-list");
                }
                else if(this.precoRelativo === 0) {
                    alert('Campo preço unitário não pode ser 0');
                }
                else {
                    alert('Preencha todos os campos.');
                }
            },
            filterIngredient(id) {
                if (!this.ingredientes) return null;

                const filteredIng = this.ingredientes.filter((ing) => {
                    if(ing.id == id) {
                        return true;
                    }
                    return false;
                });
                
                return filteredIng[0];
            },
            areAllFieldsFilled() {
                return (
                    this.ingrediente &&
                    this.precoRelativo
                );
            },  
        },
        mounted() {
            this.getIngredients();

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