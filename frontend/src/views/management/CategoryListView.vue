<template>
    <div>
        <div class="all-content d-flex">
            <Sidebar />
            <div class="column d-flex align-items-center position-relative">
                <div class="top w-100 mb-5 d-flex">
                    <Title :title="title" class="titulo mx-5 position-absolute" />
                    <div id="search-bar" class="d-flex align-items-center">
                         <div class="input-group" id="search-input">
                            <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                            <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra" />       
                        </div>
                        <button @click="this.$router.push('/new-category')" id="add-btn"><font-awesome-icon :icon="['fas', 'circle-plus']" size="xl" style="color: #000000;" /> Novo</button>
                    </div>
                </div>
                <CategoryTable :palavra="palavra" />
                <ReturnButton :returnHref="'/'" />
            </div>     
        </div> 
    </div>
</template>

<script>

    import CategoryTable from '@/components/tables/CategoryTable.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import InputProduct from '@/components/InputProduct.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';
    
    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            title: 'Categorias',
            categorias: null,
            palavra: ""
        }),
        components: {
            CategoryTable,
            Sidebar,
            InputProduct,
            ReturnButton,
            Title
        },
        methods: {
            goToHome() {
                this.$router.push("/");
            },
            async getCategorias() {
                const data = (await Axios.get('/categoria')).data;
                this.categorias = data;
            }
        },
        mounted() {
            this.getCategorias();
        }
    }
</script>

<style lang="scss" scoped>

    #return-btn {
        position: fixed;
        bottom: 40px;
        right: 40px;
    }

    .titulo {

    }
  
   .all-content .column {
        flex-direction: column;
        width: 100vw;
        height: 100vh;
   }

   #search-input {
        width: 100%;
        max-width: 50vw;
        max-height: 10vh;
        height: 100%;
    }

    #search-bar {
        height: fit-content;
    }

    #search-bar h1 {
        font-size: 2.5vh;       
    }

    #search-bar button {
        background-color: transparent;
        border: 1px solid #DEE2E6;
        border-radius: 10px;  
        width: 10vw;
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }

    #search-bar #add-btn {
        background-color: transparent;
        border: 0;
        height: fit-content;
    }


</style>