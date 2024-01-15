<template>
    <div id="editIcon">
        <button @click="goToHref()">
            <font-awesome-icon :icon="['fas', 'pen']" style="color: #000000;" />
        </button>
    </div>
</template>

<script>
    export default {
        data: () => ({
        }),
        props: {
            href: {
                type: String
            }
        },
        methods: {
            goToHref() {
                window.location.href = this.href
            }
        }
    }
</script>

<style lang="scss" scoped>

    #editIcon button {
        background-color: transparent;
        border: 0;
    }

    #editIcon {
        padding: 3px;
        border-radius: 5px;
        background-color: #0085ff;

        display: flex;
        transition: all 0.5s;
    }

    #editIcon:hover {
        background-color: #196cb9;

    }
</style>