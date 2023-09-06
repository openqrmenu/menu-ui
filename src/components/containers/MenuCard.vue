<template>
  <li class="overflow-hidden rounded-xl border border-gray-200">

    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
      <button @click="viewMenu">

        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-soup" width="48" height="48"
          viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z">
          </path>
          <path d="M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
          <path d="M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
          <path d="M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
        </svg>
      </button>
      <button @click="viewMenu" class="text-sm font-medium leading-6 text-gray-900 ">{{ data.name }}</button>
      <a @click="viewMenu" class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </a>


      <div class="relative ml-auto">
        <button type="button" @click="onShowCardMenu" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500"
          id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
          <span class="sr-only">Open options</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
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
        <div v-if="showCardMenu" ref="modalRef"
          class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
          role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
          <button @click="onShowMenuCardDialog" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem"
            tabindex="-1" id="options-menu-0-item-0">Edit<span class="sr-only">, Tuple</span></button>
          <button @click="$emit('OnRemoveMenuRequestEvent', data._id)"
            class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1"
            id="options-menu-0-item-1">Delete<span class="sr-only">, Tuple</span></button>
        </div>
      </div>
    </div>

    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
      <div class="flex justify-between gap-x-4 py-3">
        <dt class="text-gray-500">Created</dt>
        <dd class="text-gray-700"><time datetime="2022-12-13">{{ getDateString() }}</time></dd>
      </div>
      <div class="flex justify-between gap-x-4 py-3">
        <dt class="text-gray-500">Items</dt>
        <dd class="flex items-start gap-x-2">
          <div class="font-medium text-gray-900">{{ data.count }}</div>

        </dd>
      </div>
    </dl>
  </li>

  <MenuCardDialog @DialogClose="onShowMenuCardDialog" v-if="showMenuCardDialog" :edit="true" :menucard="data">
  </MenuCardDialog>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core';
import MenuCardDialog from './MenuCardDialog.vue'
import { ref } from 'vue'
const router = useRouter()

const showCardMenu = ref(false)
const showMenuCardDialog = ref(false)

const emit = defineEmits(['OnRemoveMenuRequestEvent'])

const props = defineProps(
  {
    data: {
      type: Object,
      default: (() => { })
    },
  })

function onShowCardMenu() {
  showCardMenu.value = !showCardMenu.value;
}

function onShowMenuCardDialog() {
  showMenuCardDialog.value = !showMenuCardDialog.value;
}

// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showCardMenu.value = false
  },
)

function getDateString() {
  const dt = new Date(props.data.updated);
  return dt.toDateString();
}


function viewMenu() {
  router.push('/menu/' + props.data._id)
}

components: {
  MenuCardDialog
}

</script>