<template>
    <div>
        <div id="all-content">
            <Sidebar /> 
            <div class="column">
                <div class="top">
                    <Title :title="title" />
                    <Input />
                </div>
                <OrderTable />
                <ReturnButton :returnHref="'/'" />
            </div>  
        </div>
    </div>
</template>

<script>
    import OrderTable from '@/components/tables/OrderTable.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Input from '@/components/Input.vue';
    import ReturnButton from '@/components/buttons/ReturnButton.vue';
    import Title from '@/components/Title.vue';

    export default {
        data: () => ({
            title: 'Pedidos'
        }),
        components: {
            OrderTable,
            Sidebar,
            Input,
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