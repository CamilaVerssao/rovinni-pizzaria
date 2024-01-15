<template>
    <div>
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>

    h1 {
        font-size: 25px;
        height: fit-content; 
    }
   
</style>