<template lang="">

  <div class="flex w-full gap-x-3 "> 
   <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          <MenuCard @OnRemoveMenuRequestEvent="onRemoveMenuRequest" v-for="menucard in menucards" :data="menucard" :key="menucard.id"></MenuCard>
    </ul>

    <ConfirmDialog 
      v-if = "removeMenuDialog"
      @OnOK="onRemoveMenu"
      @OnCancel="onRemoveMenuCancel"
      title="Do you want to remove this Menu?" description="Deleting this menu will irrevocably delete this menu. Are you sure you want to continue."></ConfirmDialog>

  </div>

</template>
<script setup>
import { ref, computed } from 'vue';
import MenuCard from './MenuCard.vue'
import { useStore } from 'vuex'
import ConfirmDialog from '../generic/ConfirmDialog.vue';

const store = useStore()

const removeMenuDialog = ref(false)
const currentID = ref(-1)

const count = computed(() => store.state.count)

function increment()
{
  store.commit('increment')
}

const menucards = computed(() => {
    
    return store.getters.getMenu
})

function onRemoveMenu()
{
  store.commit('deleteMenu', currentID.value)
  removeMenuDialog.value = false;
}

function onRemoveMenuRequest(id)
{
  currentID.value = id;
  removeMenuDialog.value = true;
}

function onRemoveMenuCancel()
{
  currentID.value = -1;
  removeMenuDialog.value = false;
}

components: {
  ConfirmDialog, MenuCard
}


</script>


<style lang="">
    
</style>