<template>
  <div class="px-5">
    <header>
      <div class="mx-auto mt-1 max-w-7xl pt-3">
        <router-link v-if="!public" href="#" class="text-sm text-gray-400 hover:text-gray-800" to="/login">&lt;  Dashboard</router-link>


        <div class="flex">
          <div class="mr-5">
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
          </div>
          <div class="grow 1">
            <h1 class="text-3xl font-bold leading-tight tracking-tight text-transform: uppercase text-gray-900">{{ menuName }} Menu</h1>
            <p class="text-gray-700 leading-tight tracking-tight" style="white-space: pre-line;">{{menuDesc }}
            </p>

            <div class="grow 1">
                <a :href="publicLink" target="_blank" v-if="!public"
                class="hover: underline text-sm text-gray-500 mb-5 mr-4">Public Menu Link</a>
              <button @click="onQRCodeDialog" v-if="!public" class="hover: underline text-sm text-gray-500 mb-5">Download QR
                Code</button>
                 <!-- DROPDOWN -->
              <div class="max-w-xs">
                <LangDropDown :menucard="menucard" @LangSelected="onLangSelected" :lang="lang"></LangDropDown>
                <button v-if="!public" @click="onManageLanguageDialog"
                  class="hover: underline text-sm text-gray-500 mb-5">Edit Languages</button>
              </div>
              <!-- DROPDOWN-->
            
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-7xl">
      <!-- XX -->
      <div class="flex justify-between gap-x-6 py-3">
        <div class="flex gap-x-4">
          <div class="min-w-0 flex-auto">
            <button v-if="!public" @click="onNewCategoryDialog"
              class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
              Category</button>
          </div>
        </div>
        <div class="flex items-center gap-x-6">
          <div class="sm:flex sm:flex-col sm:items-end">
            <div class="relative flex gap-x-3 items-center w-full">
            </div>
          </div>
        </div>
      </div>
      <!-- XX-->

      <draggable v-model="currentMenu.items" :disabled="public" class="list-group" @start="dragging = true"
        @end="onDragComplete" ghost-class="ghost" item-key="_id">
        <template #item="{ element, index }">
          <div class="list-group-item" :class="{ 'not-draggable': false }">
            <MenuCategory :data="element" :lang="slang" :public="public"></MenuCategory>
          </div>
        </template>
      </draggable>



      <!-- EMPTY STATE -->
      <button v-if="empty && !public" @click="onNewCategoryDialog" type="button"
        class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke-width="1.5" stroke="currentColor"
          class="mx-auto h-12 w-12 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span class="mt-0 block text-sm font-semibold text-gray-900">No Categories, Add a new category</span>
      </button>
      <span v-if="empty && public" class="mt-0 block text-sm font-semibold text-gray-900">No items in this menu</span>
      <!-- EMPTY STATE -->


      <!-- DIALOGS -->
      <MenuCategoryDialog @DialogClose="onDialogClose" v-if="showCategoryDialog" :menucard="menucard" :lang="slang">
      </MenuCategoryDialog>
      <ManageLanguageDialog @DialogClose="onLangDialogClose" v-if="showManageLanguageDialog" :data="menucard">
      </ManageLanguageDialog>
      <QRCodeDialog @DialogClose="onQRCodeDialog" v-if="showQRCodeDialog" :url="publicLink"> </QRCodeDialog>


    </div>
  </div>
</template>
    
<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import MenuCategory from './MenuCategory.vue';
import MenuCategoryDialog from './MenuCategoryDialog.vue';
import ManageLanguageDialog from './ManageLanguageDialog.vue';
import QRCodeDialog from './QRCodeDialog.vue';
import LangDropDown from '../generic/LangDropDown.vue'
import { getMenuCards, addMenuCard, getMenuStore, getPublicMenuStore } from '../../utils/api'
import { decodeText } from '../../utils/html';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core';
import router from '../../router';
import { getSupportedCurrencies } from '../../utils/currency';
const route = useRoute()

const showCategoryDialog = ref(false);
const showManageLanguageDialog = ref(false);
const showQRCodeDialog = ref(false)
const store = useStore()
const showLangDropDown = ref(false);
const menucard = ref({});
const slang = ref('');


import draggable from 'vuedraggable'

let dragging = false

const menuName = computed(() => {
  return decodeText(menucard.value.name);
})

const menuDesc = computed(() => {
  return decodeText(menucard.value.description);
})

function onNewCategoryDialog() {
  showCategoryDialog.value = true
}

function onQRCodeDialog() {
  showQRCodeDialog.value = !showQRCodeDialog.value;
}

function onDialogClose() {
  showCategoryDialog.value = false;
}

function onManageLanguageDialog() {
  showManageLanguageDialog.value = true;
}

function onLangDialogClose() {
  showManageLanguageDialog.value = false;
}

function onLangDropdown() {
  showLangDropDown.value = true;
}

function onLangSelected(code) {
  router.push({ query: { lang: code } });
}

function onDragComplete() {
  dragging = false;
  console.log("Dragging complete...");
  store.dispatch("updateMenuCardDnD", store.getters.getMenuStore);
}

// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showLangDropDown.value = false
  },
)

const props = defineProps(
  {
    id: {
      type: String,
      default: ""
    },
    lang: {
      type: String,
      default: "en"
    },
    public: {
      type: Boolean,
      default: false
    }
  })


watch(
  () => route.fullPath,
  async () => {
    slang.value = route.query.lang;
  }
);


onMounted(() => {

  slang.value = props.lang;
  
  if (!props.public) {
    getMenuStore(props.id).then(function (response) {
      // handle success
      store.commit("setMenuStore", response.data);
      menucard.value = store.getters.getMenuForId(props.id);
      document.title = menucard.value.name + " - QR Menu";
      // currentMenu.value = response.data;
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  }
  else {
    getPublicMenuStore(props.id).then(function (response) {
      // handle success
      store.commit("setMenuStore", response.data);
      store.commit('setMenuCard', response.data);
      //menucard = store.getters.getMenuForId(props.id);
      menucard.value = response.data;
      document.title = menucard.value.name + " - QR Menu";;
      // currentMenu.value = response.data;
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  }
})



const currentMenu = computed(() => {
  return store.getters.getMenuStore;
})

const publicLink = computed(() => {
  return '/app/#/public/' + props.id;
})


const empty = computed(() => {
  if (currentMenu.value === undefined)
    return false;

  if (currentMenu.value.items === undefined)
    return true;

  if (currentMenu.value.items.length == 0)
    return true;

  return false;
})

components: {
  MenuCategory, MenuCategoryDialog, ManageLanguageDialog, LangDropDown
}


</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #eee;
}

.not-draggable {
  cursor: no-drop;
}
</style>