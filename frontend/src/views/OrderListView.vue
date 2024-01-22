<template>
    <div>
        <div id="all-content">
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

</style>