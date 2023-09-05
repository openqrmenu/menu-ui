<template lang="">

  <div class="flex w-full gap-x-3 "> 
   <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 xl:gap-x-8">
          <MenuCard @OnRemoveMenuRequestEvent="onRemoveMenuRequest" v-for="menucard in menucards" :data="menucard" :key="menucard._id"></MenuCard>
    </ul>


  </div>

  <ConfirmDialog 
      v-if = "removeMenuDialog"
      @OnOK="onRemoveMenu"
      @OnCancel="onRemoveMenuCancel"
      title="Do you want to remove this Menu?" description="Deleting this menu will irrevocably delete this menu. Are you sure you want to continue."></ConfirmDialog>


   <!-- EMPTY STATE -->
   <button v-if="menucards.length == 0" @click="$emit('onNewMenu')" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
        <span class="mt-0 block text-sm font-semibold text-gray-900">No menus.. Start by adding a new menu</span>
    </button>
      <!-- EMPTY STATE -->

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuCard from './MenuCard.vue'
import { useStore } from 'vuex'
import ConfirmDialog from '../generic/ConfirmDialog.vue';
import { deleteMenuCard } from '../../utils/api.js'

const store = useStore()

const removeMenuDialog = ref(false)
const currentID = ref(-1)

const count = computed(() => store.state.count)

const emit = defineEmits(['onNewMenu'])

onMounted(() => {
  store.dispatch("refreshMenuCards")
})


function increment() {
  store.commit('increment')
}

const menucards = computed(() => {

  return store.getters.getMenu
})

function onRemoveMenu() {
  deleteMenuCard(currentID.value).then(function (response) {
    // handle success
    store.commit('deleteMenu', currentID.value)
    removeMenuDialog.value = false;
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });

}

function onRemoveMenuRequest(id) {
  currentID.value = id;
  removeMenuDialog.value = true;
}

function onRemoveMenuCancel() {
  currentID.value = -1;
  removeMenuDialog.value = false;
}

components: {
  ConfirmDialog, MenuCard
}


</script>


<style lang="">
    
</style>