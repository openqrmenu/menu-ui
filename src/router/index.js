import * as VueRouter from 'vue-router';
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
import AuthCheckView from '../views/AuthCheckView.vue'
import AccountCreationView from '../views/AccountCreation.vue'
import { useStore } from 'vuex'
import { isLoggedIn } from '../utils/api'; 

const store = useStore()

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: AuthCheckView, 
      meta:  {
         allowAnonymous: true
        } 
    },
    { path: '/dashboard', component: DashboardView },
    { path: '/login', component: LoginView, 
      meta:  {
        allowAnonymous: true
      }
    },
    { path: '/createaccount', component: AccountCreationView, 
      meta:  {
        allowAnonymous: true
      }
    },
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

router.beforeEach((to, from) => {
    if (
      // make sure the user is authenticated
      !to.meta.allowAnonymous && !isLoggedIn() &&
      // ❗️ Avoid an infinite redirect
      to.path !== '/'
    ) {
      // redirect the user to the auth check page
      return { path: '/' }
    }

    if (to.path == '/login' && isLoggedIn())
    {
      return { path: '/'}
    }
  })
  
//  router.replace("/");

  export default router;