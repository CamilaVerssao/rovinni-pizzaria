<template>
    <div>
        <div id="search-bar" class="d-flex">
            <div class="input-group mb-3" id="search-input">
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" /></span>
                <input type="text" class="form-control" placeholder="Pesquise aqui" aria-label="Username" aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
</template>

<script>

    import OrderTable from '@/components/tables/OrderTable.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        components: {
            OrderTable,
            Sidebar
        }
    }
</script>

<style lang="scss" scoped>

    #search-input {
        width: 100%;
        max-width: 400px;
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
    }

    #search-bar button:hover {
        background-color: #c6c6c6;
        border: 1px solid rgb(169, 169, 169);
    }
</style>