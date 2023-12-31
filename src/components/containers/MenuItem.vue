<template>
  <li class="flex justify-between gap-x-6 py-5">



    <div class="flex gap-x-4">
      <div class="cursor-move" v-if="!public">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grip-vertical draghandle" width="24"
          height="24" viewBox="0 0 24 24" stroke-width="1" stroke="gray" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
      </div>
      <div class="min-w-0 flex-auto">
        <p :class="[props.data.enabled ? 'font-semibold text-transform: capitalize leading-6 text-gray-900' : 'font-semibold text-transform: capitalize leading-6 text-gray-400 italic']">
          {{ getName }}
        </p>
        <p class="mt-1 flex text-xs leading-5 text-gray-500">
          {{ getDescription }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-x-6">
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900 whitespace-nowrap">{{ formattedPrice }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">{{ otherpricing }}</p>
      </div>
      <div class="relative flex-none">
        <IconEllipsis v-if="!public" @IconButtonClicked="onMenuItemOptions"></IconEllipsis>

        <div v-if="showMenuItemOptions" ref="modalRef"
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
          <!-- Active: "bg-gray-100", Not Active: "" -->
          <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" tabindex="-1"
            to="/login" @click="onEditMenuItem">Edit</button>
          <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2" tabindex="-1"
            to="/login" @click="removeMenuItemDialog = true">Delete</button>
        </div>
        <!--
              Dropdown menu, show/hide based on menu state.
    
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
        <!-- 
            <div class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
              <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-0">View profile<span class="sr-only">, Leslie Alexander</span></a>
              <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">Message<span class="sr-only">, Leslie Alexander</span></a>
            </div>
            -->
      </div>
    </div>
  </li>

  <MenuItemDialog @DialogClose="onMenuItemDialogClose" v-if="showMenuItemDialog" :menucategory="data" :lang="lang"
    :edit="true" :menuitem="data"></MenuItemDialog>

    <ConfirmDialog v-if="removeMenuItemDialog" @OnOK="onDeleteMenuItem" @OnCancel="removeMenuItemDialog = false"
    title="Do you want to remove this Item?"
    description="Deleting this item is irrevocable. Are you sure you want to continue.">
  </ConfirmDialog>

  <!-- SAMPLE MENU-->
</template>
    
<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import IconEllipsis from '../generic/IconEllipsis.vue';
import { deleteMenuItem } from '../../utils/api.js'
import MenuItemDialog from './MenuItemDialog.vue';
import ConfirmDialog from '../generic/ConfirmDialog.vue';

const showMenuItemOptions = ref(false);
const store = useStore()
let showMenuItemDialog = ref(false)
let removeMenuItemDialog = ref(false)

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const routeid = route.params.id;

const menucard = store.getters.getMenuForId(routeid)

const props = defineProps(
  {
    data: {
      type: Object,
      default: (() => { })
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

onMounted(() => {

})

const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showMenuItemOptions.value = false
  },
)

function onMenuItemOptions() {
  showMenuItemOptions.value = true;
}

function onMenuItemDialogClose() {
  showMenuItemDialog.value = false;
}

const getName = computed(() => {
  const extra = !props.data.enabled ? ' UNAVAILABLE ' : '';
  const entry = props.data.details.find(item => {
    if (item.language == props.lang) {
      return true;
    }
    return false;
  });
  if (entry == undefined)
    return props.data.details[0].name + extra + (" -");
  return entry.name + extra;
})

const getDescription = computed(() => {
  const entry = props.data.details.find(item => {
    if (item.language == props.lang) {
      return true;
    }
    return false;
  });
  if (entry == undefined)
    return props.data.details[0].description + (" -");
  return entry.description;
})


const otherpricing = computed(() => {
  var combined = "";
  var otherprice;
  if (props.data.otherprice === undefined)
    return combined;
  for (otherprice of props.data.otherprice) {
    combined = combined + " " + otherprice.description + " : " + props.data.currencysymbol + otherprice.price
  }
  return combined
})

function onDeleteMenuItem() {


  deleteMenuItem(props.data._id).then(function (response) {
    store.dispatch("getCurrentMenu", props.data.menucardid);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
  showMenuItemOptions.value = false;
}

function onEditMenuItem() {
  showMenuItemDialog.value = true;
}

const formattedPrice = computed(() => {
  if (!props.data.enabled)
    return "NOT AVAILABLE";
  const curr = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: menucard.currency,
  }).format(props.data.price);

  return curr;
})


components: {
  MenuItemDialog
}


</script>
    