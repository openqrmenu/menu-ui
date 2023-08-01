<template>

<!-- SEPARATOR -->
<div class="relative">
  <div class="absolute inset-0 flex items-center" aria-hidden="true">
    <div class="w-full border-t border-gray-300"></div>
  </div>
  <div class="relative flex justify-center">
    <span class="bg-white px-3 text-base font-semibold leading-6 text-gray-900">{{ data.category.details[0].name }}</span>
  </div>
</div>

<div class="relative flex gap-x-3 items-center w-full">
  <button @click="onMenuItemDialog" class="hover: underline text-sm text-gray-500 mb-5">Add New Item</button>
  <p class="hover: underline text-sm text-gray-500 mb-5">Edit Category</p>
</div>



<!-- SEPARATOR -->

<!-- SAMPLE MENU -->

<ul role="list" class="divide-y divide-gray-100">

  <MenuItem v-for="menuitem in data.menuitems" :data="menuitem" :key="menuitem._id"></MenuItem>

  <MenuItemDialog @DialogClose="onMenuItemDialogClose" v-if="showMenuItemDialog" :menucategory="data"></MenuItemDialog>

</ul>


<!-- SAMPLE MENU-->

</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
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
    })

onMounted(() => {
    console.log(props.data);
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

components:  {
    MenuItem, MenuItemDialog
}
    
</script>
