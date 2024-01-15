<template>
    <div>
        <div class="all-content">        
            <Sidebar />
            <div class="column">
                <div class="top">
                    <Title :title="title" /> 
                    <div id="search-bar" class="d-flex">
                         <div class="input-group mb-3" id="search-input">
                            <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                            <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1" v-model="palavra" />       
                        </div>

                    </div>
                </div>
                <ProfitsTable :palavra="palavra" />
                <div id="buttons" class="pt-4">        
                    <button class="btn btn-danger" @click="this.$router.push('/')">Voltar</button>
                    <button class="btn btn-success">Salvar</button>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>

    import ProfitsTable from '@/components/tables/ProfitsTable.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Title from '@/components/Title.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import InputProduct from '@/components/InputProduct.vue';

    export default {
        data: () => ({
            title: 'Lucros',
            palavra: ""
        }),
        components: {
            ProfitsTable,
            Sidebar,
            Title,
            ReturnButton,
            InputProduct
        },
        methods: {
    
        }
    }
</script>

<style lang="scss" scoped>

    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    }

    #all-content {
        margin: 0 auto;
        display: flex;
   }

   .column {
        display: flex;
        flex-direction: column;
        width: 100%;
   }

   .top {
        margin-left: 50px;
   }

   #search-input {
        width: 100%;
        max-width: 450px;
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