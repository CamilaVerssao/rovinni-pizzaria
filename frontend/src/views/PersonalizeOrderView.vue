<template>
    <div>
        <div class="all-content"> 
            <Sidebar /> 
            <Title class="mx-5 mt-5" :title="title" /> 
            <div class="column">             
                <PersonalizeOrder></PersonalizeOrder>
                <div id="buttons" class="pt-4">            
                    <button class="btn btn-danger" @click="this.$router.push('/order')">Voltar</button>
                    <button class="btn btn-success" @click="this.$router.push('/order-payment')">Ir para pagamento  <font-awesome-icon :icon="['fas', 'chevron-right']" style="color: #ffffff;" /></button>
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
      }, /*
      methods: {
        async getFlavors() {
            const req = await fetch("http://localhost:3000/pizzas-prontas");
            const data = await req.json();
            this.sabor = data;
        }
      },
      mounted() {
        this.getFlavors();
      }*/
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
        flex-direction: column;
        margin: 0 auto;
        justify-content: center;
        margin-left: -150px;
   }

</style>