<template>
    <div>        
        <div class="all-content">        
            <Sidebar />
            <div class="column d-flex align-items-center position-relative">
                <div class="top w-100 mb-5 d-flex">
                    <Title :title="title" class="titulo mx-5 position-absolute"/>         
                    <div id="search-bar" class="d-flex align-items-center">
                         <div class="input-group" id="search-input">
                            <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                            <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra" />       
                        </div>
                    </div>
                </div>
                <StockTable :palavra="palavra" />
                <ReturnButton :returnHref="'/'" />
            </div>
        </div>
        
    </div>
</template>

<script>

    import IngredientsTable from '@/components/tables/IngredientsTable.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import StockTable from '@/components/tables/StockTable.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';
    import InputProduct from '@/components/InputProduct.vue';

    export default {
        data: () => ({
            title: 'Estoque',
            palavra: ""
        }),
        components: {
            IngredientsTable,
            Sidebar,
            StockTable,
            ReturnButton,
            Title,
            InputProduct
        },
        methods: {
            goToHome() {
                this.$router.push("/");
            }
        }
    }

</script>

<style lang="scss" scoped>

    h1 {
        margin-left: 300px;
        font-size: 25px;
        margin-top: 30px;
        height: fit-content;
    }

    #return-btn {
        position: fixed;
        bottom: 40px;
        right: 40px;
    }

    .column {
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }

    #search-input {
        width: 100%;
        max-width: 450px;
        max-height: 40px;
        height: 100%;
    }

    #search-bar {
        height: fit-content;
    }

    #search-bar h1 {
        font-size: 25px;       
    }

    #search-bar button {
        background-color: transparent;
        border: 1px solid #DEE2E6;
        border-radius: 10px;  
        height: 40px;
        width: 150px;
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }

    #search-bar #add-btn {
        background-color: transparent;
        border: 0;
    }

</style>