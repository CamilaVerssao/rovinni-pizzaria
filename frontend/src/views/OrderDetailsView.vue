<template>
    <div>
        <div class="all-content d-flex w-100">
            <Sidebar />
            <div class="content d-flex w-100 position-relative">
                <Title :title="title" class="titulo position-absolute my-5 mx-5" />
                <div class="column d-flex">
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

    .titulo {
        height: fit-content;
    }
    
</style>