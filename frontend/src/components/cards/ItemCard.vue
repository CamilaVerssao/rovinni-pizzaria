<template>
    <div class="all-content">
        <div id="card-content" v-for="produto in filterProduct" :key="produto.produtoId" @click="this.$emit('produtoClicado', produto)" > <!--se o card for bebida, não aparece a lista de ingredientes para editar-->
            <div class="card-img" @click="goToInfo(produto.produtoId)"></div>
            <div class="card-info" @click="goToInfo(produto.produtoId)">
                <h1>{{ produto.produtoNome }} {{ produto.tamanho }}</h1>
                <h2>R$ {{ produto.preco }}</h2>
            </div>
            <div class="buttons">
                <div id="trashIcon">
                    <button @click="deleteProduct(produto.produtoId)">
                        <font-awesome-icon :icon="['fas', 'trash']" style="color: #000000;" />
                    </button>
                </div>
                <div id="editIcon">
                    <EditButton :href="`/#/edit-product/${produto.produtoId}`" />
                </div>
            </div>  
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    import EditButton from '../buttons/EditButton.vue';
    import Title from '../Title.vue';
    
    export default {
        name: 'ItemCard',
        data: () => ({
            produtos: null,
            tamanhos: null
        }),
        props: {
            detailHref: {
                type: String
            },
            produtos: {
                type: Array
            },
            palavra: {
                type: String
            }
        },
        methods: { 
            goToInfo(id) {
                this.$router.push(`/product-details/${id}`);
            },
            async deleteProduct(id) {

                if (window.confirm("Tem certeza que deseja excluir?") === true) {
                    await Axios.delete(`/produto/${id}`);
                };

                window.location.reload();
            },
            addItem(id, produto) {
                const produtoString = JSON.stringify(produto);
                sessionStorage.setItem(id, produtoString);
            },
            async getProdutos() {
                const data = (await Axios.get('/produto')).data;
                this.produtos = data;
            },
            editProduct(id) {
                this.$emit('editing', id);
            }
        },
        computed: {
            filterProduct() {

                if (!this.palavra) {
                    return this.produtos;
                }

                const lowerCasePalavra = this.palavra.toLowerCase();

                return this.produtos.filter(cat =>
                    cat.produtoNome.toLowerCase().includes(lowerCasePalavra)
                );
            },
        },
        mounted(){
            this.getProdutos();
        },
        components: {
            EditButton,
            Title
        }
    }
</script>

<style lang="scss" scoped>
    #card-content {
        position: relative;
        width: 200px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 0px 1px 13px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 1s;
        background: #fff;
        margin-top: 40px;
        padding: 8px;
        padding-bottom: 70px;
        margin: 35px;
    }

    #card-content:hover {
        box-shadow: 0px 1px 13px rgba(0,0,0,0.4);
    }

    .card-img {
        background: rgb(241, 241, 241);
        background-image: url("https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3277542:1663012513/Pizza%20de%20Calabresa.jpg?f=4x3&$p$f=eceb3e7");
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
    }

    .card-info h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        position: absolute;
        left: 0.625em;
        bottom: 1.875em;
        font-weight: 400;
        color: #000;
    }

    .card-info h2 {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 0.9em;
        position: absolute;
        left: 0.625em;
        bottom: 0.625em;
        color: #000;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        padding-top: 20px;
        padding-right: 20px;
    }

    button {
        background-color: transparent;
        border: 0;
    }

    #trashIcon {
        margin-bottom: 10px;
        background-color: red;    
        padding: 3px;
        border-radius: 5px;
        transition: all 0.5s;
    }

    #trashIcon:hover {
        background-color: rgb(186, 19, 19);
    }

</style>