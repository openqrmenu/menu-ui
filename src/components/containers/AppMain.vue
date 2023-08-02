<template>
    <div class="py-10">
    <header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Restaurant Menus</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Your content -->

        <div class="relative flex gap-x-3 items-center w-full">
          <button @click="onNewMenuDialog" type="button" class="mb-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Menu</button>
        </div>

       
        <!-- MENU LIST -->
       <MenusList></MenusList>
        <!-- MENU LIST -->      
        
        <!-- NEW MENU DIALOG -->
        <MenuCardDialog @DialogClose="onDialogClose" v-if="showNewMenuDialog" ></MenuCardDialog>
        <!-- NEW MENU DIALOG-->


      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MenusList from './MenusList.vue'
import Menu from './Menu.vue'
import MenuCardDialog from './MenuCardDialog.vue'
import { useStore } from 'vuex'

const showNewMenuDialog = ref(false)
const store = useStore()

function onDialogClose()
{
  showNewMenuDialog.value = false;
}

function onNewMenuDialog()
{
  showNewMenuDialog.value = true;
}


components: {
  MenusList, Menu
}
</script>

