<template>
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <a href="#">
              <h3 class="font-bold text-3xl">Open QR Menu</h3>
            </a>
          </div>
       </div>
        <div class="ml-6 flex items-center">

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <IconEllipsis @IconButtonClicked="onAccountButtonClicked"></IconEllipsis>

            <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div v-if="showAccountMenu" ref="modalRef"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" tabindex="-1"
                to="/login" @click="onAccountLogout">Sign out</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import IconEllipsis from '../generic/IconEllipsis.vue';
import { logoutUser } from '../../utils/api'
import router from '../../router';

const showAccountMenu = ref(false)

function onAccountButtonClicked() {
  showAccountMenu.value = !showAccountMenu.value;
}

// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showAccountMenu.value = false
  },
)

function onAccountLogout() {
  logoutUser().then(function (response) {
    // handle success
    document.title = "QR Menu";
    if (response.data.status == false)
      router.push('/');
    else {
      console.log("Error");
    }

  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
}

components: {
  IconEllipsis
}

</script>