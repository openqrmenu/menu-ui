<template>
<!--
  This example requires updating your template:

  ```
  <html class="h-full">
  <body class="h-full">
  ```
-->
<div class="min-h-full">

  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">Checking Auth...</p>
    <p class="mt-6 text-base leading-7 text-gray-600">Please wait..</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go to Login</a>
    </div>
  </div>
</main>
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { checkAuth } from '../utils/api'; 
import router from '../router';
import { useStore } from 'vuex'

const store = useStore()

components:  {
}

onMounted(() => {
  checkAuth().then(function (response) {
    // handle success
    if (response.data.authenticated == true)
    {
      store.commit('setLoggedIn', true);      
      router.push('/dashboard');
    }
    else
    {
      store.commit('setLoggedIn', false);
      console.log("Not logged in...")
      router.push('/login');
    }

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
  });

})

</script>

