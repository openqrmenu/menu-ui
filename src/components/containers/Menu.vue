<template>
  <header>
    <div class="mx-auto max-w-7xl pt-3">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ menucard.name }} Menu</h1>
    </div>
  </header>

  <div class="pl-3 pr-3 w-full">
    <!-- XX -->

    <div class="flex justify-between gap-x-6 py-5">
      <div class="flex gap-x-4">
        <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/chick65.png" alt=""> -->
        <div class="min-w-0 flex-auto">
          <button v-if="!public" @click="onNewCategoryDialog" class="hover: underline text-sm text-gray-500 mb-5">Add Category</button>
        </div>
      </div>
      <div class="flex items-center gap-x-6">
        <div class="sm:flex sm:flex-col sm:items-end">

          <div class="relative flex gap-x-3 items-center w-full">

            <!-- DROPDOWN -->

            <div>
              <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Switch Language</label>

              <LangDropDown :menucard="menucard" @LangSelected="onLangSelected" :lang="lang"></LangDropDown>
              <button v-if="!public" @click="onManageLanguageDialog" class="hover: underline text-sm text-gray-500 mb-5">Manage</button>

            </div>

            <!-- DROPDOWN-->
          </div>

        </div>

      </div>
    </div>
    <!-- XX-->

    <MenuCategory v-for="menuitem in currentMenu.items" :data="menuitem" :lang="slang" :public="public"></MenuCategory>
    <MenuCategoryDialog @DialogClose="onDialogClose" v-if="showCategoryDialog" :menucard="menucard" :lang="slang">
    </MenuCategoryDialog>
    <ManageLanguageDialog @DialogClose="onLangDialogClose" v-if="showManageLanguageDialog" :data="menucard">
    </ManageLanguageDialog>
    <!-- SAMPLE MENU-->

  </div>
</template>
    
<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import MenuCategory from './MenuCategory.vue';
import MenuCategoryDialog from './MenuCategoryDialog.vue';
import ManageLanguageDialog from './ManageLanguageDialog.vue';
import LangDropDown from '../generic/LangDropDown.vue'
import { getMenuCards, addMenuCard, getMenuStore, getPublicMenuStore } from '../../utils/api'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core';
import router from '../../router';
import { getSupportedCurrencies } from '../../utils/currency';
const route = useRoute()

const showCategoryDialog = ref(false);
const showManageLanguageDialog = ref(false);
const store = useStore()
const showLangDropDown = ref(false);
const menucard = ref({});
const slang = ref('');

function onNewCategoryDialog() {
  showCategoryDialog.value = true
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

function onLangSelected(code)
{
  router.push({query: {lang: code}});
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
      default:"en"
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
  if (!props.public)
  {
  getMenuStore(props.id).then(function (response) {
    // handle success
    store.commit("setMenuStore", response.data);
    menucard.value = store.getters.getMenuForId(props.id);
    // currentMenu.value = response.data;
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
  }
  else 
  {
    getPublicMenuStore(props.id).then(function (response) {
    // handle success
    store.commit("setMenuStore", response.data);
    store.commit('setMenuCard', response.data);
    //menucard = store.getters.getMenuForId(props.id);
    menucard.value = response.data;
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

components: {
  MenuCategory, MenuCategoryDialog, ManageLanguageDialog, LangDropDown
}


</script>
    