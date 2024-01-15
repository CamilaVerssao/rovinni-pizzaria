<template>
    <div>   
        <div class="all-content">
            <Sidebar />
            <div class="column mx-5">
                <Title class="mt-5" :title="title" />
                <div id="all-content">       
                    <div class="product-field">
                        <h1 class="field-title">Estoque mínimo</h1>
                        <input type="number" class="form-control" placeholder="Digite o preço unitário" v-model="estoqueMinimo">
                    </div>
                    <div class="product-field">
                        <h1 class="field-title">Estoque atual</h1>
                        <input type="number" class="form-control" placeholder="Digite o preço unitário" v-model="estoqueAtual">
                    </div>
                </div>
                <div id="buttons" class="pt-4">
                    <button class="btn btn-danger" @click="this.$router.push('/ingredients-list')">Voltar</button>
                    <button class="btn btn-success" @click="createStock()">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

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
                    nome: this.stock,
                    estoqueMinimo: this.estoqueMinimo,
                    estoqueAtual: this.estoqueAtual
                }

                await Axios.put(`/ingrediente/${this.paramId}`, data);
                await Axios.put(`/produto/${this.paramId}`, data);


                this.$router.push("/stock-list");
                }
        },
        mounted() {
            this.paramId = this.$route.params.id;

            if(this.paramId) {
                this.editing = true;
            }

            console.log()

        }
    }
</script>

<style lang="scss" scoped>

        #all-content {
            width: 80vw;
            flex-wrap: wrap;        
        }

        .column {
            display: flex;
            margin: 0 auto;
            flex-direction: column;
        }

        #title { 
            margin-left: 300px;
            font-size: 25px;
            margin-top: 30px;
            height: fit-content;     
        }

        .product-field {
            display: flex;
            flex-direction: column;
            max-width: 600px;
            width: 100%;
            margin-top: 50px;
        }

        .field-title {
            font-size: 25px;
        }

        #buttons {
            position: fixed;
            display: flex;
            bottom: 40px;
            right: 40px;
            gap: 25px;
        }

</style>