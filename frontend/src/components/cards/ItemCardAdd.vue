<template>
    <div>
        <div id="card-content" v-for="produto in filterProduct" :key="produto.produtoId" @click="addItemToCart(produto)">
            <div class="card-img"></div>
            <div class="card-info">
                <h1>{{ produto.nome }} {{ produto.tamanho }}</h1>
                <h2>R$ {{ produto.preco }}</h2>
            </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';
    
    export default {
        data: () => ({
           cart: null,
           qtd: 0,
           tamanhos: null,
        }),
        props: {
            produtos: {
                type: Array
            },
            palavra: {
                type: String
            },
            selSize: {
                type: String
            }
        },
        methods: {
            addItemToCart(produto) {

                if (!sessionStorage.getItem(produto.produtoId)) {
                    produto.quantity = 1;
                } else {
                    const storedProduto = JSON.parse(sessionStorage.getItem(produto.produtoId));
                    produto.quantity = storedProduto.quantity + 1;
                }

                produto.totalCart = produto.preco * produto.quantity;
                const produtoString = JSON.stringify(produto);
                sessionStorage.setItem(produto.produtoId, produtoString);

                window.location.reload();
            }
            
        },
        computed: {
            filterProduct() {

            if (!this.palavra) {
                return this.produtos;
            }

            const lowerCasePalavra = this.palavra.toLowerCase();

            return this.produtos.filter(prod =>
                prod.nome.toLowerCase().includes(lowerCasePalavra)
            );

            }
        },
        mounted() { 
            this.qtd = 0;
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
        transition: all 2s;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        margin: 40px 0 0 40px;
        padding: 8px;
        padding-bottom: 70px;
    }

    #card-content:hover {
        box-shadow: 0px 1px 13px rgba(0,0,0,0.4);
    }

    #card-content::after {
        content: "Adicionar";
        padding-top: 20px;
        position: absolute;
        left: 0;
        bottom: -60px;
        background: #00AC7C;
        color: #fff;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        text-align: center;
        justify-content: center;
        height: 70px;
        width: 100%;
        transition: all 300ms;
        font-weight: 600;
        text-transform: uppercase;
        opacity: 0;
    }

    #card-content:hover::after {
        bottom: 0;
        opacity: 1;
    }

    #card-content:active {
        transform: scale(0.98);
    }

    #card-content:active::after {
        content: "Added !";
        height: 3.125em;
    }

    .card-img {
        background: rgb(241, 241, 241);
        background-image: url("https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3277542:1663012513/Pizza%20de%20Calabresa.jpg?f=4x3&$p$f=eceb3e7");
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
    }

    .card-info h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        position: absolute;
        left: 0.625em;
        bottom: 1.875em;
        font-weight: 400;
        color: #000;
    }

    .card-info h2{
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

    #trashIcon, #editIcon {
        padding: 3px;
        border-radius: 5px;
    }

    #trashIcon {
        margin-bottom: 10px;
        background-color: red;
    }

    #editIcon {
        background-color: #0085ff;
    }

</style>