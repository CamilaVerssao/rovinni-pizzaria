<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="d-flex flex-column justify-content-between col-auto min-vh-100 align-items-center py-5" id="backgroundSidebar">
                    <a href="/" id="link-logo">
                        <h1 id="logo-name">Rovinni Pizzaria</h1>
                    </a>
                    <ul class="nav nav-pills flex-column mt-sm-0 d-grid gap-1" id="menu">
                        <li class="nav-item">
                            <router-link to="/order" class="nav-link" aria-current="page">
                                <font-awesome-icon :icon="['fas', 'cash-register']" />
                                
                                <span class="ms-2">Vender</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" aria-current="page">
                                <font-awesome-icon :icon="['fas', 'tag']" style="color: #000000;" />
                                <span class="ms-2">Produtos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <router-link to="/order-list" class="nav-link" aria-current="page">
                                <font-awesome-icon :icon="['fas', 'clipboard-list']" style="color: #000000;" />
                                <span class="ms-2">Pedidos</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#sidemenu" data-bs-toggle="collapse" class="nav-link" aria-current="page">
                                <font-awesome-icon :icon="['fas', 'gear']" style="color: #000000;" />
                                <span class="ms-2">Gerenciamento</span>
                            </a>
                            <ul class="list-group list-group-flush collapse" id="sidemenu" data-bs-parent="#menu">
                                <li class="list-group-item">
                                    <router-link to="/category-list" class="nav-link" aria-current="page">Categorias</router-link>  
                                </li>
                                <li class="list-group-item">
                                    <router-link to="/ingredients-list" class="nav-link" aria-current="page">Ingredientes</router-link> 
                                </li>
                                <li class="list-group-item">
                                    <router-link to="/stock-list" class="nav-link" aria-current="page">Estoque</router-link>  
                                </li>
                                <li class="list-group-item">
                                    <router-link to="/profits-list" class="nav-link" aria-current="page">Lucros</router-link>  
                                </li>
                            </ul>
                        </li>
                    </ul>
                <div>
                    <div class="dropdown open">
                        <a class="btn border-none outline-none dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                            <font-awesome-icon :icon="['fas', 'user']" style="color: #000000;" />
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" id="username" href="#">{{ this.funcionario}}</a>
                            <a class="dropdown-item" href="#" @click="logout()">Sair</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { Axios } from '@/configAxios';

    export default {
        data: () => ({
            userValue: null,
            funcionario: null
        }),
        methods: {
            async logout() {
                await Axios.post('/logout');
                localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
            },
            async getFunc() {
                this.funcionario = (await Axios.get(`/funcionario?id=${this.userValue}`)).data[0].username;
            }
        },
        mounted() {
            this.userValue = Object.keys(localStorage)[0];
            this.getFunc();
        }
    }
    
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');

    .container-fluid {
       height: 100vh;
       width: 15vw;
    }

    #backgroundSidebar {
        background-color: #ee991a;
        width: 100vw;
    }
    
    .list-group-item {
        background-color: transparent;
        border: 0;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 1.8rem;
    } 

    .nav-link {
        font-size: 2.5vh;
        color: black;
        transition: 0.2s;
    }

    #backgroundSidebar button {
        top: 20px;
        right: 20px;
        background-color: transparent;
        border: none;
        position: absolute;
    }

    .nav-link:hover {
        color: black;
        font-weight: 700;
    } 
    .nav-item {
        color: black;
    }

    #logo-name {
        font-family: 'Macondo', cursive;
        font-weight: bold;
        font-size: 1.5rem;
    }

    #link-logo {
        text-decoration: none;
        color: black;
    }

    //MediaQuery
    @media only screen and (max-device-width: 1024px) {
        .nav-item span {
            display: none;
        }
    }
    @media only screen and (max-device-width: 1023px) {
        #logo-name {
            font-size: 1rem;    
        }
    }

</style>