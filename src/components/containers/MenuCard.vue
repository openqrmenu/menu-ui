<template>
        <li class="overflow-hidden rounded-xl border border-gray-200">
            <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <img src="/public/rest.png" alt="Tuple" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
              <div @click="viewMenu" class="text-sm font-medium leading-6 text-gray-900">{{ data.name }}</div>
              <div class="relative ml-auto">
                <button type="button" @click="onShowCardMenu" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open options</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>
        
                <!--
                  Dropdown menu, show/hide based on menu state.
        
                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                <div v-if="showCardMenu" ref="modalRef" class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
                  <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-0">Edit<span class="sr-only">, Tuple</span></a>
                  <a href="#" @click="$emit('OnRemoveMenuRequestEvent', data.id)" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">Delete<span class="sr-only">, Tuple</span></a>
                </div>
              </div>
            </div>
            <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div class="flex justify-between gap-x-4 py-3">
                <dt class="text-gray-500">Updated</dt>
                <dd class="text-gray-700"><time datetime="2022-12-13">{{ data.updated }}</time></dd>
              </div>
              <div class="flex justify-between gap-x-4 py-3">
                <dt class="text-gray-500">Items</dt>
                <dd class="flex items-start gap-x-2">
                  <div class="font-medium text-gray-900">{{ data.count }}</div>
                  
                </dd>
              </div>
            </dl>
          </li>

          
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue'
const router = useRouter()

const showCardMenu = ref(false)

const props = defineProps(
    {
        data: {
            type: Object,
            default: (() => { })
        },
    })

function onShowCardMenu()
{
  showCardMenu.value = !showCardMenu.value;
}

// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showCardMenu.value = false
  },
)


function viewMenu()
{
  router.push('/menu/0')
}

</script>

<style lang="scss" scoped>

</style>