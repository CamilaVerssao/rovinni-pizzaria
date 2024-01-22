<template>
    <div>
      <div class="all-content">
          <div class="left-side d-flex">
              <div class="left-content">
                  <div class="title-content">
                      <p id="subtitle">Crie sua conta</p>
                      <h1>Rovinni Pizzaria</h1>
                  </div>

                  <div class="input-field input-group mb-3">    
                      <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'user']" style="color: #000000;" /></span>
                      <input type="text" class="form-control" placeholder="Digite um nome de usuário" aria-label="Username" aria-describedby="basic-addon1" v-model="username" required>
                  </div>      
  
                  <div class="input-field input-group mb-3">
                      <span class="input-group-text" id="basic-addon1"><font-awesome-icon :icon="['fas', 'lock']" style="color: #000000;" /></span>
                      <input type="password" class="form-control" placeholder="Digite a senha" aria-label="Username" aria-describedby="basic-addon1" v-model="senha" required>
                  </div>    
                  <div class="botao d-grid gap-2">
                      <button class="btn btn-primary btn-lg" type="button" @click="cadastrar()">Cadastrar</button>
                  </div>
  
                  <div class="options-content">
                      <p>Já tem uma conta? <a href="#/login">Log in</a></p>
                  </div>
              </div>
          </div>
          <div class="right-side d-flex"></div>
      </div>
    </div>
  </template>
  
  <script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            username: null,
            senha: null
        }),
        methods: {
            async cadastrar() {

                const data = {
                    username: this.username,
                    senha: this.senha
                }

                if(this.username && this.senha) {
                    await Axios.post('/funcionario', data);
                    this.userValue = (await Axios.post('/login', data)).data;
                    const userString = JSON.stringify(this.userValue);
                    localStorage.setItem(this.userValue.id, userString);
                    
                    this.$router.push('/');
                }
                else {
                    alert('Preencha todos os campos.');
                }
            }
        }
  }
  </script>
  
  <style lang="scss" scoped>
      @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
  
      .all-content {
          width: 100vw;
          height: 100vh;
      }
  
      .left-side {
          width: 50vw;
      }
  
      .left-content {
          margin: auto;
          width: 40%;
      }
  
      .right-side {
          width: 50vw;
          background-image: url("../assets/pizza-img.png");
          background-position: center;
          background-size: cover;
      }
  
      .botao .btn {
          background-color: black;
          color: white;
          font-size: 18px;
          border: 0;        
          transition: 0.6s;
          margin-top: 10px;
      }
  
      .botao .btn:hover {
          background-color: #EE991A;
          color: black;
          border: 0;
      }
  
      .title-content {
          text-align: center;
          margin-bottom: 40px;
      }
  
      .title-content p {
          color: gray;
          font-size: 18px;
      }
  
      .title-content h1{
          font-family: 'Macondo', cursive;
          font-weight: bold;
          font-size: 40px;
      }
  
      .input-field {
          height: 45px;
      }
  
      .options-content p {
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
      }
  
      .options-content a{
          font-weight: bold;
          color: black;
          text-decoration: none;
      }
  
  
  </style>