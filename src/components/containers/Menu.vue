<template>
            <header>
          <div class="mx-auto max-w-7xl pt-3">
            <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Menu {{ menucard.name }}</h1>
          </div>
        </header>

        <div class="pl-3 pr-3 w-full">

          
          
          
         





        

        <!-- XX -->

  <div class="flex justify-between gap-x-6 py-5">
        <div class="flex gap-x-4">
            <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/chick65.png" alt=""> -->
            <div class="min-w-0 flex-auto">
              <button @click="onNewCategoryDialog" class="hover: underline text-sm text-gray-500 mb-5">Add New Category</button>
            </div>
        </div>
        <div class="flex items-center gap-x-6">
            <div class="sm:flex sm:flex-col sm:items-end">
                
              <div class="relative flex gap-x-3 items-center w-full">
              <button @click="onNManageLanguageDialog" class="hover: underline text-sm text-gray-500 mb-5">Manage</button>
                        <!-- DROPDOWN -->

          <div>
            <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Switch Language</label>
            
            <LangDropDown :menucard="menucard"></LangDropDown>
            

          </div>
          
          <!-- DROPDOWN-->
          </div>

            </div>

        </div>
    </div>



<!-- XX-->


        <MenuCategory  v-for="menuitem in currentMenu.items"  :data="menuitem"></MenuCategory>

        
        <MenuCategoryDialog @DialogClose="onDialogClose" v-if="showCategoryDialog" :menucard="menucard"></MenuCategoryDialog>
        <ManageLanguageDialog @DialogClose="onLangDialogClose" v-if="showManageLanguageDialog"  :data="menucard"></ManageLanguageDialog>
        <!-- SAMPLE MENU-->

      </div>

</template>
    
<script setup>

import { ref, computed, onMounted } from 'vue';
import MenuCategory from './MenuCategory.vue';
import MenuCategoryDialog from './MenuCategoryDialog.vue';
import ManageLanguageDialog from './ManageLanguageDialog.vue';
import LangDropDown from '../generic/LangDropDown.vue'
import { getMenuCards, addMenuCard, getMenuStore } from '../../utils/api'
import { useStore } from 'vuex'
import { onClickOutside } from '@vueuse/core';


const showCategoryDialog = ref(false);
const showManageLanguageDialog = ref(false);
const store = useStore()
const showLangDropDown = ref(false);
const menucard = store.getters.getMenuForId(props.id);

function onNewCategoryDialog()
{
  showCategoryDialog.value = true
}

function onDialogClose()
{
  showCategoryDialog.value = false;
}

function onNManageLanguageDialog()
{
  showManageLanguageDialog.value = true;
}

function onLangDialogClose()
{
  showManageLanguageDialog.value = false;
}

function onLangDropdown()
{
  showLangDropDown.value = true;
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
    })

const categorydata = {
  category: {
      _id: "1",
      userid: "34343",
      menucardid: "dfkjdf",
      parentid: "",
      type:"category",
      details: [
          {
            language: "en",
            name: "Appetizers",
          }
        ],
  },
  menuitems: [
    {
      _id: "1",
      userid: "34343",
      menucardid: "dfkjdf",
      parentid: "",
      type:"item",
      details: [
        {
          language: "en",
          name: "Chicken Drumsticks",
          description: "Lorem Ipsum eta aldsald sdfkjd skdjs"
        }
      ],
      price: 24.50,
      currency: "usd",
      currencysymbol: "$",
      otherprice: [
        {
          language: "en",
          description: "large",
          price: 43.23
        },
        {
          language: "en",
          description: "kids",
          price: 3.23
        },
      ]
    },
    {
      _id: "2",
      details: [
        {
          language: "en",
          name: "Chicken 65",
          description: "Chicken Chicken Chicken"
        }
      ],
      price: 454.50,
      currency: "usd",
      currencysymbol: "$",
      otherprice: [
        {
          description: "large",
          price: 43.23
        },
        {
          description: "kids",
          price: 3.23
        },
      ]
    }
  ]
}

onMounted(() => {
  getMenuStore(props.id).then(function (response) {
        // handle success
        store.commit("setMenuStore", response.data);
       // currentMenu.value = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
})



const currentMenu = computed(() => {
  return store.getters.getMenuStore;
})
  
components:  {
  MenuCategory, MenuCategoryDialog, ManageLanguageDialog, LangDropDown
    }
    
    
</script>
    