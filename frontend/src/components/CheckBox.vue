<template>
    <div id="all">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" :checked="this.isChecked" :disabled="this.isDisabled" >
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isChecked: {
                Boolean
            },
            isDisabled: {
                Boolean
            }
        }
    }
</script>

<style lang="scss" scoped>

    #all, .form-check {
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;
    }
    
</style>