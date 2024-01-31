<template>
    <div>
        <div class="all-content"> 
            <Sidebar /> 
                <div class="teste w-100 h-100">
                    <Title class="titulo mx-5 mt-5" :title="title" /> 
                    <div class="column mx-5 h-100 w-10 d-flex justify-content-center"> 
                        <div class="both-sides d-flex justify-content-center">
                            <PersonalizeOrder />
                        </div>            
                        <div id="buttons" class="pt-4">            
                            <button class="btn btn-danger" @click="this.$router.push('/order')">Voltar</button>
                            <button class="btn btn-success" @click="this.$router.push('/order-payment')">Ir para pagamento  <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #ffffff;" /></button>
                        </div>
                    </div> 
            </div>
        </div>
    </div>
</template>

<script>
    
    import PersonalizeOrder from '@/components/PersonalizeOrder.vue';
    import Title from '@/components/Title.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
      data: () => ({
        title: 'Personalizar pedido',
        sabor: null
      }),
      components: {
        PersonalizeOrder,
        Title,
        Sidebar
      }
    }
</script>

<style lang="scss" scoped>


    #buttons {
        position: fixed;
        display: flex;
        bottom: 40px;
        right: 40px;
        gap: 25px;
    } 

   #all-content {
        margin: 0 auto;
        display: flex;
   }

   .column {
        display: flex;
        margin: 0 auto;
        justify-content: center;
   }

   .titulo {
        height: fit-content;
   }

</style>