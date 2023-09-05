<template>
<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <a href="/"><h2 class="mt-1 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">QR Menu</h2></a>
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="onSignIn">
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

        <div class="flex items-center justify-between">

          <div class="text-sm leading-6">
            <a @click="forgotPasswordDialog = true" class="font-semibold text-gray-400 hover:text-indigo-500">Forgot password?</a>
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
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <div class="mt-2 text-sm text-red-700">
                <ul role="list" class="list-disc space-y-1 pl-5">
                  <li>{{ loginerror }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- ERROR -->

       <!-- FINISHED -->
       <div v-if="onsuccess" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Completed Request OK</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>{{ loginerror }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- FINISHED -->

        <div>
          <button type="submit" class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <div>
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm font-medium leading-6">
            <span class="bg-white px-6 text-gray-900">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 gap-4">
          <a :href="getGoogleSignInUrl()" class="flex w-full items-center justify-center gap-3 rounded-md bg-[#fff] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] border-2">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="32px" height="32px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            <span class="text-sm font-semibold leading-6 text-gray-900">Sign in with Google</span>
          </a>

        </div>
      </div>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <router-link href="#" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-500" to="/createaccount">Create a new free account</router-link>
    </p>
    <p class="mt-2 text-center text-sm text-gray-500"><a href="/" class="hover:text-indigo-500">Go back to Home Page</a></p>
  </div>

  <ConfirmDialog v-if="forgotPasswordDialog" @OnOK="onResetPassword" @OnCancel="forgotPasswordDialog = false"
    :title="`Do you want to reset the password for ${email}`"
    description="Are you sure you want to continue?">
  </ConfirmDialog>
</div>

</template>

<script setup>
import { loginUser, initresetPassword } from '../utils/api'
import { ref, computed } from 'vue';
import router from '../router';
import { useFocus } from '@vueuse/core'
import ConfirmDialog from '../components/generic/ConfirmDialog.vue';

const target = ref()
const { focused } = useFocus(target, { initialValue: true })

const forgotPasswordDialog = ref(false)

const email = ref("")
const password = ref("")
const onerror = ref(false)
const onsuccess = ref(false)
const loginerror = ref("your login failed, please check your credentials")

function getGoogleSignInUrl()
{
  let googleURL = 'http://goqrmenudev.com:3000/auth/login/google';
  if (import.meta.env.PROD)
    googleURL = '/';

  return googleURL;
}

function onSignIn()
{
    onerror.value = false
    onsuccess.value = false
    loginUser(email.value, password.value).then(function (response) {
      // handle success
      if (response.data.status == true)
        router.push('/dashboard');
      else
      {
        onerror.value = true
        loginerror.value = response.data.message
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      onerror.value = true
      loginerror.value = error.response.data.message
    })
    .finally(function () {
    });
}

function onResetPassword()
{
  onsuccess.value = false
  onerror.value = false
  forgotPasswordDialog.value = false;
  if (email.value == "")
  {
    onerror.value = true
    loginerror.value = "No email specified for forgot password, please type in the email address first."
  }
  initresetPassword(email.value).then(function (response) {
      // handle success
      if (response.data.status == true)
       {
        onsuccess.value = true
        loginerror.value = response.data.message
       }
      else
      {
        onerror.value = true
        loginerror.value = response.data.message
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      onerror.value = true
      loginerror.value = error.response.data.message
    })
    .finally(function () {
    });
}

</script>

<style lang="scss" scoped>

</style>