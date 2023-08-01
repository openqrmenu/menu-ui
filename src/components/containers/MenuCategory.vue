<template>

<!-- SEPARATOR -->
<div class="relative">
  <div class="absolute inset-0 flex items-center" aria-hidden="true">
    <div class="w-full border-t border-gray-300"></div>
  </div>
  <div class="relative flex justify-center">
    <span class="bg-white px-3 text-base font-semibold leading-6 text-gray-900">{{ getName }}</span>
  </div>
</div>

<div class="relative flex gap-x-3 items-center w-full">
  <button @click="onMenuItemDialog" class="hover: underline text-sm text-gray-500 mb-5">Add Item</button>
  <p class="hover: underline text-sm text-gray-500 mb-5">Edit Category</p>
</div>



<!-- SEPARATOR -->

<!-- SAMPLE MENU -->

<ul role="list" class="divide-y divide-gray-100">

  <MenuItem v-for="menuitem in data.menuitems" :data="menuitem" :key="menuitem._id" :lang="lang"></MenuItem>

  <MenuItemDialog @DialogClose="onMenuItemDialogClose" v-if="showMenuItemDialog" :menucategory="data"></MenuItemDialog>

</ul>


<!-- SAMPLE MENU-->

</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import MenuItem from './MenuItem.vue'
import MenuItemDialog from './MenutemDialog.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const routeid = route.params.id;
const store = useStore()
const showMenuItemDialog = ref(false)
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
    }
  })

onMounted(() => {
 // slang.value = props.lang;
    //console.log(props.data);
//    menucard = store.getters.getMenuForId(props.id)

})


const currentMenu = computed(() => {
  return store.getters.getMenuStore;
})

function onMenuItemDialog()
{
    showMenuItemDialog.value = true
}

function onMenuItemDialogClose()
{
    showMenuItemDialog.value = false;
}

const getName = computed(() => {
  const entry = props.data.category.details.find(item => 
  { 
    if (item.language == props.lang)
    {
      return true;
    }
    return false;
  });
  if (entry == undefined)
    return ("-") + props.data.category.details[0].name + ("-");
  return entry.name;
})

components:  {
    MenuItem, MenuItemDialog
}
    
</script>
