<template>
    <div id="trashIcon">
        <button>
            <font-awesome-icon :icon="['fas', 'trash']" style="color: #000000;" />
        </button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
  
    #trashIcon button {
        background-color: transparent;
        border: 0;
    }

    #trashIcon {
        padding: 3px;
        border-radius: 5px;
        background-color: red;
        width: fit-content;
        transition: all 0.5s;
    }

    #trashIcon:hover {
        background-color: rgb(186, 19, 19);
    }

</style>