<template>
    <div>
        <button class="btn btn-danger" id="return-btn" @click="returnHref()">Voltar</button>
    </div>
</template>

<script>
    export default {
        props: {
            returnHref: {
                type: String
            }
        },
        methods: {
            returnHref() {
                window.location.href = this.returnHref;
            }
        }
    }
</script>

<style lang="scss" scoped>

      #return-btn {
            position: fixed;
            bottom: 40px;
            right: 40px;
        }

</style>