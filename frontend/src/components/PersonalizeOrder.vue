<template>
    <div>
       <div id="all-content">
        <div id="left-content">
            <h1 id="add-pizza">Pizza
                <button>
                    <font-awesome-icon :icon="['fas', 'circle-plus']" style="color: #000000;" />
                </button>
            </h1>
            <hr>
            <div class="row d-flex" id="pizza-orders">
                <p>Tamanho</p>
                <select class="form-select" v-model="tamanhoSelected" @change="console.log(this.tamanhoSelected)">
                    <option disabled selected hidden>Selecione</option>
                    <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho">{{ tamanho.tamanho }}</option>
                </select>      
            </div>
            <div class="row d-flex">
                <p>Número de sabores</p>
                <select name="num-sabores" id="num-sabores" class="form-control" v-model="numSaboresSelected">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> 
            </div>
            <div class="row">
                <p>Sabores</p>
                <div class="check-ingredient d-flex" v-for="sabor in sabores" :key="sabor.id">

                    <div class="checkbox-field">
                        <input type="checkbox" :value="sabor" v-model="checkedProducts" @change="console.log(this.checkedProducts)" >
                    </div>

                    <p>{{ sabor.produtoNome }}</p>
                </div>
                <button class="pizzaAdd" @click="addToCart(this.checkedProducts)">Adicionar</button>
            </div>
            <hr>
        </div>  
        <div id="right-content">
            <div id="header-bebida" class="d-flex">
                <h1>Bebida</h1>

                <div id="search-bar" class="d-flex">
                    <div class="input-group mb-3" id="search-input">
                        <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                        <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra">
                    </div>
                </div>

            </div> 
            <div class="class-field"> 
                <div class="row d-flex pt-3 teste" v-for="bebida in bebidas" :key="bebida.id"> 
                    <p>{{ bebida.produtoNome }}</p>
                    <p style="font-weight: bold;">R$ {{ bebida.quantity ? bebida.preco * bebida.quantity : bebida.preco }}</p>
                    <input type="number" min="0" class="form-control" v-model="bebida.quantity">
                    <button class="add-btn" @click="addToCart(bebida)"><font-awesome-icon :icon="['fas', 'plus']" size="s" style="color: #000000;" /></button>
                </div>
            </div> 
        </div> 
       </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import CheckBox from './CheckBox.vue';
    import Input from './Input.vue';

    export default {
        data: () => ({
            title: 'Personalizar pedido',
            sabores: {},
            bebidas: null,
            tamanhos: null,
            tamanhoSelected: null,
            numSaboresSelected: null,
            palavra: "",
            checkedProducts: [],
            pizzaCustom: {
                nomeProduto: "",
                tamanho: "",
                numSabores: 0,
                totalCart: 0
            }
        }),
        components: {
            CheckBox,
            Input
        },
        methods: {
            async getFlavors() {
                const data = (await Axios.get('/produto?tipo=2')).data;
                this.sabores = data;
            },
            async getBebidas() {
                const data = (await Axios.get('/produto?tipo=1')).data;
                this.bebidas = data;
            },
            async getTamanhos() {
                const data = (await Axios.get('/tamanho')).data;
                this.tamanhos = data;
            },
    
                filterProductsByTamanho() {
                if (!this.tamanhoSelected || !this.tamanhoSelected.id) {
                    // Se nenhum tamanho estiver selecionado, retorna todos os produtos
                    return this.sabores;
                }

                // Filtra os produtos com tamanhoId igual ao tamanho selecionado
                return this.sabores.filter(sabor => sabor.tamanhoId === this.tamanhoSelected.id);
                },
            
            addToCart(produto) {

                if (produto.tipoId != 1) {
                    if (Array.isArray(this.checkedProducts)) {
                        const selectedFlavorsNames = this.checkedProducts.map(sabor => sabor.produtoNome);
                        const selectedSize = this.checkedProducts.map(size => size.tamanhoId);
                        console.log(selectedSize)

                        this.pizzaCustom.nomeProduto = selectedFlavorsNames.join(', ');
                        this.pizzaCustom.tamanho = this.tamanhoSelected.tamanho;
                        this.pizzaCustom.numSabores = parseInt(this.numSaboresSelected);
                        console.log(this.pizzaCustom)

                        const produtoString = JSON.stringify(this.pizzaCustom);
                        sessionStorage.setItem(produto.id, produtoString);

                         /*this.pizzaCustom.totalCart = this.checkedProducts
                            .filter(sabor => sabor.tamanhoId === selectedSize)
                            console.log(this.pizzaCustom.totalCart)

                            this.pizzaCustom.totalCart = produto.preco * produto.quantity;*/
                    }
                }
                else {
                      produto.totalCart = produto.preco * produto.quantity;

                const produtoString = JSON.stringify(produto);
                sessionStorage.setItem(produto.produtoId, produtoString);

                const storedProdutoString = sessionStorage.getItem(produto.produtoId);
                }

              
            },
            getCategoryName(id) {
                if (!this.tamanhos || this.tamanhos.length === 0) {
                    return "Tamanho não encontrado";
                }

                const size = this.tamanhos.find(size => size.tamanhoId === id);
                return size ? size.tamanho : "";
            }
        },
        mounted() {
            this.getFlavors();
            this.getTamanhos();
            this.getBebidas();
        },
    }
</script>

<style lang="scss" scoped>

    #all-content {
        margin-top: 50px;
        width: 70vw;
        display: flex;
    }

    #left-content {
        margin-left: 80px;
        align-items: center;
    }

    #add-pizza {
        font-size: 25px;
    }

    #add-pizza button {
        background-color: transparent;
        border: 0;
    }

    hr {
        width: 350px;
    }

    .row p {
        width: 200px;
    }

    .row select, .row .form-control {
        width: 100px;
    }

    .row {
        align-items: center;
        margin-bottom: 20px;
    }

    .check-ingredient p  {
       padding-left: 10px;
    }

    #right-content h1 {
        font-size: 25px;
    }

    #pizza-orders {
        overflow-y: hidden;
    }

    #header-bebida h1 {
        margin-right: 30px;
    }

    .add-btn {
        background-color: #4adaa6;
        border: 0;
        border-radius: 5px;
        width: 37px;
        height: 37px;
        margin-left: 27px;
        transition: all 0.5s;
    }

    .add-btn:hover {
        background-color: #4fae8b;

    }

    .class-field  {
        height: fit-content;
        max-height: 550px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 20px;
    }

    #search-input {
        width: 100%;
        max-width: 400px;
        max-height: 40px;
        height: 100%;
    }

    #search-bar {
        margin: 0 auto;
        width: 30vw;
        height: 110px;
        gap: 30px;
        padding: 0;
    }

    #search-bar h1 {
        font-size: 25px;       
    }

    #search-bar button {
        background-color: transparent;
        border: 1px solid #DEE2E6;
        border-radius: 10px;  
        height: 40px;
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }

    .teste {
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;
    }

</style>