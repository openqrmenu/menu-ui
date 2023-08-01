<template>

    <div class="relative mt-2">
      <button @click="onLangDropdown" type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
        <span class="flex items-center">
          <img src="en.png" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
          <span class="ml-3 block truncate">English</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
  
      <!--
        Select popover, show/hide based on select state.
  
        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <ul ref="modalRef" v-if="showLangDropDown" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
        <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
  
          Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
        -->
        <li  v-for="language in menucard.languages" class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
          <div class="flex items-center">
            <img :src="language.code+'.png'" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
            <span class="font-normal ml-3 block truncate">{{ language.name}}</span>
          </div>
  
        </li>
  
        <!-- More items... -->
      </ul>
    </div>
 
 
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStore } from 'vuex'

const store = useStore()
const showLangDropDown = ref(false);


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
        menucard: {
            type: Object,
            default: (() => { })
        },
    })


onMounted(() => {
    
    console.log(props.menucard);
})

components:  {

}


</script>
