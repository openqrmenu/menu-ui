<template>
    <!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img class="mx-auto h-10 w-auto" src="/public/menu.png" alt="Your Company">
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <form v-if="!onsuccess" class="space-y-6" action="#" method="POST" @submit.prevent="onSignUp">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input ref="target" id="email" v-model="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <!-- ERROR -->
        <div v-if="onerror" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Failed to create account:</h3>
              <div class="mt-2 text-sm text-red-700">
                <ul role="list" class="list-disc space-y-1 pl-5">
                  <li>{{ signuperror }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- ERROR -->
      <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create New Account</button>
        </div>
      </form>

      
        <!-- FINISHED -->
        <div v-if="onsuccess" class="rounded-md bg-green-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-green-800">Account Created</h3>
      <div class="mt-2 text-sm text-green-700">
        <p>Your account has been created successfully, continue to login.</p>
      </div>
      <div class="mt-4">
        <div class="-mx-2 -my-1.5 flex">
          <router-link to="/login" type="button" class="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">Go to Login</router-link>
      </div>
      </div>
    </div>
  </div>
</div>
<!-- FINISHED -->


    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Already have an account? 
      <router-link href="#" class="font-semibold leading-6 text-gray-400 hover:text-indigo-500" to="/login">Sign in</router-link>
    </p>
  </div>
</div>

</template>

<script setup>
import { createAccount } from '../utils/api'
import { ref, computed } from 'vue';
import router from '../router';
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target, { initialValue: true })


const email = ref("")
const password = ref("")
const onerror = ref(false)
const onsuccess = ref(false)
const signuperror = ref("Account creation failed")
function onSignUp()
{
    onerror.value = false
    createAccount(email.value, password.value).then(function (response) {
      // handle success
      if (response.data.status == true)
       {
          onsuccess.value = true;
          
        }
      else
      {
        onerror.value = true
        signuperror.value = response.data.message
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      onerror.value = true
      signuperror.value = error.response.data.message
    })
    .finally(function () {
    });
}

</script>

<style lang="scss" scoped>

</style>