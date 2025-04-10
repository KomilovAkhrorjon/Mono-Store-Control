import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MainLayout from "@/views/MainLayout.vue";
import LoginView from "@/views/LoginView.vue";
import {Routes} from "@/router/routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: Routes.CATEGORIES,
        name: 'categories',
        component: () => import('@/views/CategoriesView.vue')
      },
      {
        path: Routes.COUNTRIES,
        name: 'countries',
        component: () => import('@/views/CountriesView.vue')
      },
      {
        path: Routes.BRAND,
        name: 'brand',
        component: () => import('@/views/BrandView.vue')
      },
      {
        path: Routes.FEATURE,
        name: 'feature',
        component: () => import('@/views/FeatureView.vue')
      },
      {
        path: Routes.GIFTS,
        name: 'gifts',
        component: () => import('@/views/GiftView.vue')
      },
      {
        path: Routes.SPECIFICATIONS,
        name: 'specifications',
        component: () => import('@/views/SpecificationsView.vue')
      },
      {
        path: Routes.SLIDERS,
        name: 'sliders',
        component: () => import('@/views/SlidersView.vue')
      },
      {
        path: Routes.PRODUCTS,
        name: 'products',
        component: () => import('@/views/ProductsView.vue')
      },
      {
        path: Routes.PRODUCT_MAIN + ":id",
        name: 'productsMain',
        component: () => import('@/views/ProductMainData.vue')
      },
      {
        path: Routes.PRODUCT_SKU + ":id",
        name: 'productSku',
        component: () => import('@/views/ProductSkuView.vue')
      }
    ]
  },
  {
    path: Routes.LOGIN,
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
