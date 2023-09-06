"use strict";

<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>


    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">


          <!-- FORM -->

          <form>
            <fieldset>
              <legend class="text-base font-semibold leading-6 text-gray-900">Languages</legend>


              <!-- DROPDOWN-->
              <div class="flex">
                <div class="flex">
                  <div class="grow relative mt-2 mr-10">
                    <input readonly id="combobox" :value="selectedName" type="text"
                      class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      role="combobox" aria-controls="options" aria-expanded="false">
                    <button @click="showAllLangs" type="button"
                      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>

                    <ul ref="modalRef" v-if="showLangList"
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      id="options" role="listbox">
                      <!--
          Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Active: "text-white bg-indigo-600", Not Active: "text-gray-900"
        -->
                      <li @click="onLangSelected(lang.code, lang.name)" v-for="lang in availablelanguages"
                        class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="option-0"
                        role="option" tabindex="-1">
                        <!-- Selected: "font-semibold" -->
                        <div class="flex">
                        <p :class="getCountryClass(lang.code)"></p>
                        <p class="ml-2 block truncate">{{ lang.name }}</p>
                        </div>
                      </li>

                      <!-- More items... -->
                    </ul>

                  </div>
                  <div class="">
                    <button @click="addLanguage" class="hover: underline text-sm text-gray-500 mb-5">Add </button>
                  </div>
                </div>


              </div>

              <!-- DROPDOWN-->

              <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">

                <div v-for="language in localdata.languages" class="relative flex items-start py-4">
                  <div class="min-w-0 flex-1 text-sm leading-6">
                    <span :class="getCountryClass(language.code)"></span>
                    <label for="person-1" class="ml-3 select-none font-medium text-gray-900">{{ language.name }} </label>
                  </div>
                  <div class="ml-3 flex h-6 items-center">
                    <button @click="removeLanguage(language.code)"
                      class="hover: underline text-sm text-gray-500 mb-5">Remove</button>
                  </div>
                </div>

              </div>
            </fieldset>


            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" @click="onSave"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">OK</button>
            </div>
          </form>

          <!-- FORM -->


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'
import { useFocus } from '@vueuse/core'

const emit = defineEmits(['DialogClose'])
import { onClickOutside } from '@vueuse/core';
import { addMenuLanguage, removeMenuLanguage } from '../../utils/api';
import { getAllLanguages, getCountryCode } from '../../utils/lang'


const store = useStore()
const menuname = ref('')
const description = ref('')
const target = ref()

const showLangList = ref(false)

const selectedName = ref('Select')
const selectedCode = ref('');

//const localData = ref({})


// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    showLangList.value = false
  },
)

function getCountryClass(code)
{
  const country = getCountryCode(code);
  return  "fi fi-" + country;
}


function showAllLangs() {
  showLangList.value = true
}

function onLangSelected(code, name) {
  console.log('Selected ' + code + ' ' + name)
  showLangList.value = false
  selectedName.value = name
  selectedCode.value = code;
}

function addLanguage() {
  addMenuLanguage(localdata.value._id, selectedCode.value, selectedName.value).then(function (response) {
    // handle success
    localdata.value.languages.push({ code: selectedCode.value, name: selectedName.value, })
    store.commit('setMenuCard', localdata.value)
    selectedName.value = 'Select'
    selectedCode.value = ""
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
}


function removeLanguage(code) {
  removeMenuLanguage(localdata.value._id, code).then(function (response) {
    // handle success
    const index = localdata.value.languages.findIndex(item => item.code === code)
    if (index !== -1)
      localdata.value.languages.splice(index, 1)
    store.commit('setMenuCard', localdata.value)
  })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
}


const availablelanguages = computed(() => {

  let available = getAllLanguages().filter(x => {
    const index = localdata.value.languages.findIndex(item => item.code === x.code)
    if (index !== -1)
      return false;

    return true;
  });
  return available;
})


const { focused } = useFocus(target, { initialValue: true })

const props = defineProps(
  {
    data: {
      type: Object,
      default: (() => { })
    },
  })

const localdata = ref(props.data);

function onSave() {
  emit('DialogClose')
}

</script>

<style lang="scss" scoped></style>