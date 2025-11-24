import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ProductPage from '../views/ProductPageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FavoritesView from '../views/FavoritesView.vue'

import ComponentShowcase from '../views/ComponentShowcase.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/product/:id', 
    name: 'Product', 
    component: ProductPage, 
    props: true 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView 
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: RegisterView 
  },
  { 
    path: '/favorites', 
    name: 'Favorites', 
    component: FavoritesView 
  },
  { path: '/components', name: 'Showcase', component: ComponentShowcase }
]

export default createRouter({
  history: createWebHistory(),
  routes
})