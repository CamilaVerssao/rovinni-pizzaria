import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditProduct from '../views/edit/EditProduct'
import OrderView from '../views/OrderView'
import OrderListView from '../views/OrderListView'
import CategoryListView from '../views/management/CategoryListView'
import IngredientsListView from '../views/management/IngredientsListView'
import StockListView from '../views/management/StockListView'
import EditIngredient from '../views/edit/EditIngredient'
import EditCategory from '../views/edit/EditCategory'
import ProductDetailsView from '../views/ProductDetailsView'
import ProfitsListView from '../views/management/ProfitsListView'
import OrderDetailsView from '../views/OrderDetailsView'
import PersonalizeOrderView from '../views/PersonalizeOrderView'
import OrderPaymentView from '../views/OrderPaymentView'
import EditStock from '../views/edit/EditStock'
import LoginView from '../views/LoginView'
import CadastroView from '../views/CadastroView'

const routes = [ 
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProduct
  },
  {
    path: '/new-product',
    name: 'new-product',
    component: EditProduct
  },
  {
    path: '/edit-ingredient/:id',
    name: 'edit-ingredient',
    component: EditIngredient
  },
  {
    path: '/new-ingredient',
    name: 'new-ingredient',
    component: EditIngredient
  },
  {
    path: '/new-category',
    name: 'new-category',
    component: EditCategory
  },
  {
    path: '/edit-category/:id',
    name: 'edit-category',
    component: EditCategory
  },
  {
    path: '/new-stock',
    name: 'new-stock',
    component: EditStock
  },
  {
    path: '/edit-stock/:id/:categoria',
    name: 'edit-stock',
    component: EditStock
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/order-list',
    name: 'order-list',
    component: OrderListView
  },
  {
    path: '/category-list',
    name: 'category-list',
    component: CategoryListView
  },
  {
    path: '/ingredients-list',
    name: 'ingredients-list',
    component: IngredientsListView
  },
  {
    path: '/stock-list',
    name: 'stock-list',
    component: StockListView
  },
  {
    path: '/product-details/:id',
    name: 'product-details',
    component: ProductDetailsView
  },
  {
    path: '/profits-list',
    name: 'profits-list',
    component: ProfitsListView
  },
  {
    path: '/order-details/:id',
    name: 'order-details',
    component: OrderDetailsView
  },
  {
    path: '/personalize-order',
    name: 'personalize-order',
    component: PersonalizeOrderView
  },
  {
    path: '/order-payment',
    name: 'order-payment',
    component: OrderPaymentView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;