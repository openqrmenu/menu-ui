import * as VueRouter from 'vue-router';
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: DashboardView },
    { path: '/login', component: LoginView },
    { path: '/menu/:id', component: MenuView },
  ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  export default router;