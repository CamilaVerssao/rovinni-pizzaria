<template>
    <div>
        <div id="content-right" class="d-grid gap-4">
            <div class="row d-flex">
                <div class="product-field">
                    <h1 class="field-title">
                        Nome do Produto
                    </h1>
                    <input disabled type="text" :placeholder="this.produtoGetById.produtoNome" class="form-control">
                </div>
                <div class="product-field">
                    <h1 class="field-title">
                        Preço de Venda
                    </h1>
                    <input disabled type="text" :placeholder="this.produtoGetById.preco" class="form-control">
                </div>
            </div>

            
            <div class="row d-flex ">
                <div class="product-field">
                    <h1 class="field-title">
                        Código
                    </h1>
                    <input disabled type="text" :placeholder="this.produtoGetById.codigo" class="form-control">
                </div>

                <div class="product-field">
                    <h1 class="field-title">
                        Categoria
                    </h1>

                    <select disabled name="" class="form-select" aria-placeholder="Digite a categoria" id="category-input disabled">
                        <option value="" disabled selected hidden>{{ this.produtoGetById.categoriaNome }}</option>
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categorias.nome">{{ categoria.nome }}</option>
                    </select>
                </div>
            </div>

            <div class="product-field">
                <h1 class="field-title">
                    Descrição
                </h1>
                <textarea disabled name="desc-field" id="desc-field" cols="30" rows="10" :placeholder="this.produtoGetById.produtoDescricao"></textarea>
            </div>
            <div id="buttons" class="pt-4">
                <button class="btn btn-danger" @click="this.$router.push('/')">Voltar</button>
            </div>      
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            categorias: null,
            produtoGetById: [],
            paramId: null
        }),
        methods: {
            async getProducts() {
                const data = (await Axios.get('/categoria')).data;
                this.categorias = data;
            },
            async getProductById(id) {
                const data = (await Axios.get(`/produto/${id}`)).data;
                this.produtoGetById = data;
                console.log(this.produtoGetById)
            }
        },
        mounted() {            
            this.paramId = this.$route.params.id;    
            this.getProducts();
            this.getProductById(this.paramId); 
        }
    }
</script>

<style lang="scss" scoped>

    .product-field {
        width: 470px;
    }

    .row {
        width: 80vw;
    }

    .field-title {
        font-size: 25px;
    }

    #check-ativo {
        display: flex;
        width: 150px;
        justify-content: space-between;
        align-items: center;
        padding: 40px 0 0 0;
    }

    #discount-area {
        padding-left: 30px;
        height: fit-content;
        width: 600px;
    }

    #discount-area p {
        padding: 20px 0 5px 0;
        border-bottom: 1px solid black;
    }

    #discount-area button {
        padding: 5px;
        background-color: #ee991a;
        color: white;
    }

    #gerar-cupom {
        display: flex;
        justify-content: space-between;
    }

    #gerar-cupom input disabled {
        width: 430px;
    }

    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

    .product-field #desc-field {
        height: 100px;
        overflow-y: auto;
        border: 1px solid #DEE2E6;
        border-radius: 10px;
    }

    .product-field textarea {
        width: 48vw;
    }

</style>