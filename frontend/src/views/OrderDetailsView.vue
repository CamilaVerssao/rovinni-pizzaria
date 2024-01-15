<template>
    <div>
        <div class="all-content">
            <Sidebar />
            <div class="content mx-5 mt-5">
                <Title :title="title" />
                <div class="column">
                    <OrderDetailsTable />
                </div> 
            </div>
        </div>
    </div>
</template>

<script>

    import Sidebar from '@/components/Sidebar.vue';
    import Title from '@/components/Title.vue';
    import OrderDetailsTable from '../components/tables/OrderDetailsTable.vue';

    export default {
        data: () => ({
            title: 'Resumo do pedido'
        }),
        components: {
            Sidebar,
            Title,
            OrderDetailsTable
        }
    }
</script>

<style lang="scss" scoped>
    .all-content {
        display: flex;
        margin: 0 auto;
        width: 100%;
    }

   .column {
        display: flex;
        flex-direction: column;
        width: 100%;
   }
    
</style>