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
                    </div>
                </div>
                <OrderTable :palavra="palavra" />
                <ReturnButton :returnHref="'/'" />
            </div>  
        </div>
    </div>
</template>

<script>
    import OrderTable from '@/components/tables/OrderTable.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';

    export default {
        data: () => ({
            title: 'Pedidos',
            palavra: null
        }),
        components: {
            OrderTable,
            Sidebar,
            ReturnButton,
            Title
        }
    }
</script>

<style lang="scss" scoped>

   .column {
        flex-direction: column;
        width: 100vw;
        height: 100vh;
   }
   
   #search-bar {
        height: fit-content;
    }

</style>