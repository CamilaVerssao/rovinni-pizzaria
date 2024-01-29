<template>
    <div> 
        <div class="all-content d-flex w-100 justify-content-center">
            <Sidebar />  
            <div class="top mt-5 ">
                <Title  :title="this.editing ? 'Editar Produto' : 'Novo Produto'" />
            </div>           
            <div class="column d-flex w-100 h-100 flex-column">
                <div id="all-fields">
                    <div class="content-left d-flex gap-2 flex-wrap flex-column justify-content-center align-items-center" >
                        <div id="select-ingredient"  v-if="this.selectedTipo !== null && this.selectedTipo !== 'Bebida'">
                            <select class="form-select" v-model="selected">
                                <option value="" disabled selected hidden>Selecione</option>
                                <option v-for="ingredient in ingredients" :value="ingredient.nome" :key="ingredient.id">{{ ingredient.nome }}</option>
                            </select>
                            <button class="btn btn-primary" @click="addItem">Adicionar</button>
                        </div>

                        <div id="list-ingredient">
                            <ul>
                                <li v-for="(ingredient, index) in selectedIngredients" :key="index">
                                {{ ingredient.nome }}
                                <p v-if="ingredient.estoqueAtual < ingredient.estoqueMinimo" :style="{ color : '#FF0000' }">{{ ingredient.estoqueAtual }} und</p>
                                <p v-else :style="{color : '#35DF5A'}">{{ ingredient.estoqueAtual }} und</p>
                            </li> 
                        </ul>
                    </div>
                </div>

                <div id="content-right" class="d-grid gap-4 w-100 justify-content-center">
                    <div class="row d-flex">
                        <div class="product-field">
                            <h1 class="field-title">
                                Nome do Produto
                            </h1>
                            <input type="text" v-model="nome" :placeholder="this.editing ? filterProduct(this.paramId)?.produtoNome ?? '' : 'Digite o nome'" class="form-control" required>
                        </div>
                        <div class="product-field">
                            <h1 class="field-title">
                                Preço de Venda
                            </h1>
                            <input type="number" step="0.01" :placeholder="this.editing ? filterProduct(this.paramId)?.preco ?? '' : 'Digite o preço'" class="form-control" v-model="preco" required>
                        </div>
                    </div>

                    <div class="row d-flex">
                        <div class="product-field">
                            <h1 class="field-title">
                                Código
                            </h1>
                            <input type="text" :placeholder="this.editing ? filterProduct(this.paramId)?.codigo ?? '' : 'Digite o código'" class="form-control" v-model="codigo" required>
                        </div>

                        <div class="product-field">
                            <h1 class="field-title">
                                Categoria
                            </h1>

                            <select class="form-select" aria-placeholder="Digite o tipo" id="tipo-input" v-model="selectedCategoria" required>
                                <option value="" disabled selected hidden>{{ this.editing ? filterProduct(this.paramId)?.categoriaNome ?? '' : 'Selecione a categoria' }}</option>
                                <option :value="categoria.nome" v-for="categoria in categorias" :key="categoria.id" >{{ categoria.nome }} </option>
                            </select>
                        </div> 
                    </div>

                    <div class="row d-flex">
                        <div class="product-field">
                            <h1 class="field-title">
                                Tipo
                            </h1>

                            <select class="form-select" aria-placeholder="Digite a categoria" id="category-input" v-model="selectedTipo" required>
                                <option value="null" disabled selected hidden>{{ this.editing ? filterProduct(this.paramId)?.tipoNome ?? '' : 'Selecione o tipo' }}</option>
                                <option :value="tipo.nome" v-for="tipo in tipos" :key="tipo.id">{{ tipo.nome }}</option>
                            </select>
                        </div> 

                        <div class="product-field">
                            <h1 class="field-title">
                                Tamanho
                            </h1>

                            <select class="form-select" id="tamanho-input" v-model="selectedTamanho" v-if="this.selectedTipo != 'Bebida'" required>
                                <option value="null" disabled selected hidden>{{ this.editing ? (filterProduct(this.paramId)?.tamanho ?? 'null') : 'Selecione o tamanho' }}</option>
                                <option :value="tamanho.tamanho" v-for="tamanho in tamanhos" :key="tamanho.id">{{ tamanho.tamanho }}</option>
                            </select>

                            <select class="form-select"  id="tamanho-input" v-else required>
                                <option value="null" disabled selected hidden>{{ this.editing ? (filterProduct(this.paramId)?.tamanho ?? '') : 'Selecione o tamanho' }}</option>
                                <option disabled :value="tamanho.tamanho" v-for="tamanho in tamanhos" :key="tamanho.id">{{ tamanho.tamanho }}</option>
                            </select>
                        </div> 
                    </div>

                    <div class="row d-flex">
                        <div class="product-field">
                            <h1 class="field-title">
                                Volume vendas
                            </h1>
                            <input type="number" :placeholder="this.editing ? (filterProduct(this.paramId)?.volumeVendas ?? 'null') : 'Digite o volume de vendas'" class="form-control" v-model="volumeVendas" required>
                        </div>

                        <div class="product-field">
                            <h1 class="field-title">
                                Custo
                            </h1>
                            <input type="number" placeholder="Digite o custo" class="form-control" v-model="custo" v-if="this.selectedTipo === 'Bebida'" required>
                            <input disabled type="number" :placeholder="this.editing ? (filterProduct(this.paramId)?.custo ?? 'null') : 'Digite o custo'" class="form-control" v-else required> 
                        </div>
                    </div>

                    <div class="product-field">
                        <h1 class="field-title">
                            Descrição
                        </h1>
                        <textarea name="desc-field" id="desc-field" cols="30" rows="10" :placeholder="this.editing ? filterProduct(this.paramId)?.produtoDescricao ?? '' : 'Digite a descrição'"  v-model="descricao"></textarea>
                    </div>
                    <div id="buttons" class="pt-4 d-flex position-fixed gap-4">
                        <button class="btn btn-danger" @click="this.$router.push('/')">Voltar</button>
                        <button class="btn btn-success" @click="checkAction()">Salvar</button>
                    </div>      
                </div>
            </div>
            </div> 
        </div>     
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import CardImg from '../../components/cards/ImgCard.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import Title from '@/components/Title.vue';
    
    export default {
        data: () => ({
            selectedCategoria: '',
            selectedTipo: null,
            selected: '',
            selectedTamanho: null,
            selectedTipoId: null,
            selectedTamanhoId: null,
            selectedCategoryId: null,
            selectedIngredients: [],
            ingredients: null,
            categorias: null,
            tipos: null,
            tamanhos: null,
            nome: null,
            preco: null,
            codigo: null,
            descricao: null,
            volumeVendas: null,
            categoria_id: null,
            custo: null,
            estoque_minimo: null,
            estoque_atual: null,
            produtos: null,
            editing: false,
            loadItem: {}
            
        }),
        components: { 
            Sidebar, 
            CardImg,
            Title
        },
        methods: {
            async createProduct() {

                const selectedCategory = this.categorias.find((categoria) => categoria.nome === this.selectedCategoria);
                const selectedTipo = this.tipos.find((tipo) => tipo.nome === this.selectedTipo);
                const selectedTamanho = this.tamanhos.find((tam) => tam.tamanho === this.selectedTamanho);

                if (selectedCategory) {
                    this.selectedCategoryId = selectedCategory.id;
                }

                if (selectedTipo) {
                    this.selectedTipoId = selectedTipo.id;
                }

                if (selectedTamanho) {
                    this.selectedTamanhoId = selectedTamanho.id;
                }

                const data = {
                    nome: this.nome,
                    preco: this.preco,
                    descricao: this.descricao,
                    codigo: this.codigo,
                    volume_vendas: this.volumeVendas,
                    custo: this.custo,
                    categoria_id: this.selectedCategoryId,
                    tipo_id: this.selectedTipoId,
                    tamanho_id: this.selectedTamanhoId
                }

                const createdProduct = (await Axios.post('/produto', data)).data;
                const productId = createdProduct.id;

                let associationPromises = '';

                associationPromises = this.selectedIngredients.map(async (ingredient) => {
                    const associationData = {
                        prod_id: productId,
                        ingred_id: ingredient.id,
                        quantidade: createdProduct.tamanhoId
                    };
                
                    await Axios.post('/pizza_ingrediente', associationData);
                });

                await Promise.all(associationPromises);
 
                this.$router.push("/");
            },
            async updateProduct(id) {

                const selectedCategory = this.categorias.find((categoria) => categoria.nome === this.selectedCategoria);
                const selectedTipo = this.tipos.find((tipo) => tipo.nome === this.selectedTipo);
                const selectedTamanho = this.tamanhos.find((tam) => tam.tamanho === this.selectedTamanho);

                if (selectedCategory) {
                    this.selectedCategoryId = selectedCategory.id;
                }

                if (selectedTipo) {
                    this.selectedTipoId = selectedTipo.id;
                }

                if (selectedTamanho) {
                    this.selectedTamanhoId = selectedTamanho.id;
                }

                const data = {
                    nome: this.nome,
                    preco: this.preco,
                    descricao: this.descricao,
                    codigo: this.codigo,
                    volume_vendas: this.volumeVendas,
                    custo: this.custo,
                    categoria_id: this.selectedCategoryId,
                    tipo_id: this.selectedTipoId,
                    tamanho_id: this.selectedTamanhoId
                }
                

                const createdProduct = (await Axios.put(`/produto/${id}`, data)).data;
                const productId = createdProduct.id;


                let associationPromises = '';

                associationPromises = this.selectedIngredients.map(async (ingredient) => {
                    const associationData = {
                        prod_id: productId,
                        ingred_id: ingredient.id
                    };
                
                    await Axios.put(`/pizza_ingrediente/${id}`, associationData);
                });

                await Promise.all(associationPromises);

                await Axios.put(`/produto/${id}`, data);
                    
                //this.$router.push("/");
            },
            addItem() {
                const selectedIngredient = this.ingredients.find(item => item.nome === this.selected);
                const isAlreadyAdded = this.selectedIngredients.some(item => item.nome === selectedIngredient.nome);
                if (selectedIngredient && !isAlreadyAdded) {
                    this.selectedIngredients.push(selectedIngredient);
                }
                //console.log(this.selectedIngredients)
            },
            async getIngredients() {
                const data = (await Axios.get('/ingrediente')).data;
                this.ingredients = data;
            },
            async getProducts() {
                const data = (await Axios.get('/produto')).data;
                this.produtos = data;
            },
            async getTipos() {
                const data = (await Axios.get('/tipo')).data;
                this.tipos = data;
            },
            async getCategorias() {
                const data = (await Axios.get('/categoria?ativo=1')).data;
                this.categorias = data;
            },
            async getTamanhos() {
                const data = (await Axios.get('/tamanho')).data;
                this.tamanhos = data;
            },
            checkAction() {
                if(this.areAllFieldsFilled()) {
                    if (this.$route.params.id) {
                        this.updateProduct(this.$route.params.id);
                    }     
                    else {
                        this.createProduct();
                    }
                    this.$router.push('/');
                }
                else if(this.preco === 0) {
                    alert('Campo preço de venda não pode ser 0');
                }
                else {
                    alert('Preencha todos os campos.');
                }
            },
            areAllFieldsFilled() {
                return (
                    this.nome &&
                    (this.preco != 0) &&
                    this.codigo &&
                    this.selectedCategoria &&
                    this.selectedTipo &&
                    (this.selectedTipo !== 'Bebida' ? this.selectedTamanho : true) &&
                    this.volumeVendas &&
                    (this.selectedTipo === 'Bebida' ? this.custo : true)
                );
            },  
            async loadItem() {
                const data = (await Axios.get(`/produto/${this.$route.params.id}`)).data;
                this.loadItem = data;
            },
            
            filterProduct(id) {
                if (!this.produtos) return null;

                const filteredProd = this.produtos.filter((prod) => {
                    if(prod.produtoId == id) {
                        return true;
                    }
                    return false;
                });

                //console.log( filteredProd[0])
                
                return filteredProd[0];

            },
        },
        mounted() {
            this.getIngredients();
            this.getCategorias();
            this.getProducts();
            this.getTipos();
            this.getTamanhos();
            this.paramId = this.$route.params.id;

            if(this.paramId) {
                this.editing = true;
            }

        }
        
    }
</script>

<style lang="scss" scoped>

    .top {
        margin-left: 50px;
        width: fit-content;
        height: fit-content;
    }

    #all-fields {
        display: flex;
        width: 100%;
        height: 100vh;
    }

    #title-field {
        font-size: 2.5vh;
        height: fit-content;       
    }

    .content-left select {
        width: 50%;
        min-width: 200px;
    }

    #select-ingredient {
        display: flex;
    }

    #select-ingredient button {
        margin-left: 10px;
    }

    #list-ingredient {
        display: flex;
        flex-direction: row;
        padding: 0;
        justify-content: space-between;
    }

    #list-ingredient p {
        font-weight: bold;
    }

    #content-right {
        margin: auto 0;
    }

    .product-field {
        width: 50%;
    }

    .row {
        width: 50vw;
    }

    .field-title {
        font-size: 2.3vh;
    }

    #buttons {
        bottom: 5vh;
        right: 5vh;
    }

    .product-field textarea {
        width: 48vw;
    }
    

</style>