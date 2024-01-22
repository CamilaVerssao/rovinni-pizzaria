<template>
    <div id="card-content">
        <div class="card-img">
            <img v-if="imageUrl" alt="Selected" :src="this.imageUrl"/>
            <input type="file" ref="fileInput" @change="onFilePicked" accept="image/*" style="display: none">
            <button class="btn btn-info" @click="onPickFile">Upload File</button>
        </div>
        <div class="card-info">
            <h1>{{ this.nome ? this.nome : 'Nome do produto' }}  {{ this.tamanho ? this.tamanho : '' }}</h1>
            <h2>{{ this.preco ? this.preco.toFixed(2) : 'Preço' }}</h2>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            selectedFile: null,
            image: null
        }),
        methods: {
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked(event) {
                const files = event.target.files;
                if(files.length > 0) {
                    this.image = files[0].name;    
                    this.uploadImage();
                }                
            },
            async uploadImage() {
                const formData = new FormData();
                formData.append('imagem', this.image);
    
                await Axios.post('/produto', formData);
            }
        },
        props: {
            nome: String,
            preco: Number,
            tamanho: String
        }
    }
</script>

<style lang="scss" scoped>
    #card-content {
        position: relative;
        width: 200px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 0px 1px 13px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 2s;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        margin: 40px 0 0 20px;
        padding: 8px;
        padding-bottom: 70px;
    }

    .card-img {
        background: rgb(241, 241, 241);
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
    }

    .card-info h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        position: absolute;
        left: 0.625em;
        bottom: 1.875em;
        font-weight: 400;
        color: #000;
    }

    .card-info h2{
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 0.9em;
        position: absolute;
        left: 0.625em;
        bottom: 0.625em;
        color: #000;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        padding-top: 20px;
        padding-right: 20px;
    }

    button {
        background-color: transparent;
        border: 0;
    }

    #trashIcon, #editIcon {
        padding: 3px;
        border-radius: 5px;
    }

    #trashIcon {
        margin-bottom: 10px;
        background-color: red;
    }

    #editIcon {
        background-color: #0085ff;
    }

</style>