<template>
    <div>   
        <div class="all-content d-flex w-100 justify-content-center">
            <Sidebar />
            <div class="column d-flex w-100 mx-5 mt-5 flex-column">
                <Title :title="title" />
                <div id="all-content">       
                    <div class="product-field d-flex flex-column w-100 mt-4">
                        <h1 class="field-title">Estoque mínimo</h1>
                        <input type="number" class="form-control" placeholder="Digite o preço unitário" v-model="estoqueMinimo">
                    </div>
                    <div class="product-field d-flex flex-column w-100 mt-4">
                        <h1 class="field-title">Estoque atual</h1>
                        <input type="number" class="form-control" placeholder="Digite o preço unitário" v-model="estoqueAtual">
                    </div>
                </div>
                <div id="buttons" class="pt-4 d-flex position-fixed gap-4">
                    <button class="btn btn-danger" @click="this.$router.push('/stock-list')">Voltar</button>
                    <button class="btn btn-success" @click="createStock()">Salvar</button>
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
            title: 'Editar Estoque',
            ingrediente: null,
            estoqueMinimo: null,
            estoqueAtual: null,
            editing: false,
            paramId: null,
            selected: null
        }),
        components: {
            Sidebar,
            Title
        },
        methods: {
            async createStock() {

                const data = {
                    estoque_minimo: this.estoqueMinimo,
                    estoque_atual: this.estoqueAtual
                }

                if(this.$route.params.categoria == 6) {
                    await Axios.put(`/ingrediente/${this.paramId}`, data);
                }
                else {
                    await Axios.put(`/produto/${this.paramId}`, data);
                }

                this.$router.push("/stock-list");
            }
        },
        mounted() {
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

    #buttons {
        bottom: 5vh;
        right: 5vh;
    }

    .form-control {
        min-width: 200px;
    }

</style>