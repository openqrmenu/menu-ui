<template>
  <!-- SEPARATOR -->
  <div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-3 text-base font-semibold leading-6 text-transform: capitalize  text-gray-900">{{ getName
        }}</span>
      </div>
    </div>
    <div class="relative flex gap-x-3 items-center w-full">
      <button @click="onMenuItemDialog" v-if="!public" class="hover: underline text-sm text-gray-500 mb-5">Add
        Item</button>
      <button @click="onEditCategoryDialog" v-if="!public"
        class="hover: underline text-sm text-gray-500 mb-5">Edit</button>
    </div>
  </div>

  <ul role="list" class="divide-y divide-gray-100">
    <draggable 
  v-model="data.menuitems" 
  :disabled="public"
  class="list-group"
  @end="onDragComplete"
  handle=".draghandle"
  ghost-class="ghost"
  item-key="_id">
  <template #item="{element, index}">
    <div class="list-group-item" :class="{ 'not-draggable': false }">

    <MenuItem  :data="element" :key="index" :lang="lang" :public="public">
    </MenuItem>
    </div>
   </template>
</draggable>
    
  </ul>

  <!-- EMPTY STATE -->
  <button v-if="empty" @click="onMenuItemDialog" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-2 mb-8 text-center hover:border-gray-400">
    <span class="mt-2 block text-sm font-semibold text-gray-900">No Items, Add a new item</span>
  </button>
  <!-- EMPTY STATE -->

  <MenuItemDialog @DialogClose="onMenuItemDialogClose" v-if="showMenuItemDialog" :menucategory="data" :lang="lang">
  </MenuItemDialog>

  <MenuCategoryDialog @DialogClose="onMenuCategoryDialogClose" v-if="showMenuCategoryDialog" :menucard="data" :edit="true"
    :category="data" :lang="lang">
  </MenuCategoryDialog>


</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import MenuItem from './MenuItem.vue'
import MenuItemDialog from './MenuItemDialog.vue'
import MenuCategoryDialog from './MenuCategoryDialog.vue';
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const routeid = route.params.id;
const store = useStore()
const showMenuItemDialog = ref(false)
const showMenuCategoryDialog = ref(false)
const menucard = store.getters.getMenuForId(routeid)
import draggable from 'vuedraggable'

let dragging = false

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

function onEditCategoryDialog()
{
  showMenuCategoryDialog.value = true;
}

function onMenuCategoryDialogClose()
{
  showMenuCategoryDialog.value = false;
}

const empty = computed(() => {
  if (props.data === undefined)
    return false;
  return (props.data.menuitems.length == 0);
})

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
    return props.data.category.details[0].name + (" -");
  return entry.name;
})

const dragOptions = computed(() => {
      return {
        animation: 0,
        group: "description",
        disabled: props.public,
        ghostClass: "ghost"
      };
    });

function onDragComplete()
{
  console.log(props.data);
  console.log(store.getters.getMenuStore);
}    

components:  {
    MenuItem, MenuItemDialog, draggable
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

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>