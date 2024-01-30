<template>
    <div class="all-content w-100 d-flex justify-content-start">
        <Sidebar />
        <div class="teste">
            <Title class="mx-5 mt-5" :title="title" />
            <div class="prod-detail mt-5 mx-5">
                <DetailProdField class="d-flex justify-content-center" />
            </div>
        </div>
    </div>
</template>

<script>

    import DetailProdField from '@/components/DetailProdField.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Title from '@/components/Title.vue';

    export default {
        data: () => ({
            title: 'Detalhes'
        }),
        props: {

        },
        components: {
            DetailProdField,
            Sidebar,
            Title
        }
    }
</script>

<style lang="scss" scoped>


</style>