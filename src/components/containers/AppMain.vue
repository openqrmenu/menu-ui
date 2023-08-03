<template>
    <div class="py-10">
    <header>
      <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Restaurant Menus</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl">
        <!-- Your content -->

        <div class="relative flex gap-x-3 items-center w-full py-3">
          <button @click="onNewMenuDialog" type="button" class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Menu</button>
        </div>

       
        <!-- MENU LIST -->
       <MenusList @onNewMenu="onNewMenuDialog"></MenusList>
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

