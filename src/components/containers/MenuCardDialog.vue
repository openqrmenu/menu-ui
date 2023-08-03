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
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">New Menu</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div class="sm:col-span-4">
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Menu Name</label>
                    <div class="mt-2">
                      <input ref="target" v-model="menuname" type="text" name="first-name" id="first-name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About</label>
                    <div class="mt-2">
                      <textarea id="about" v-model="description" name="about" rows="3"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your menu</p>
                  </div>

                  <!-- DROPDOWN-->
                  <div class="col-span-full">
                    <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Currency</label>
                    <div class="flex">
                      <div class="grow relative mt-2 mr-10">
                        <input readonly id="combobox" :value="selectedCurr" type="text"
                          class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          role="combobox" aria-controls="options" aria-expanded="false">
                        <button @click="onShowAllCurrencies" type="button"
                          class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                              clip-rule="evenodd" />
                          </svg>
                        </button>

                        <ul ref="modalRef" v-if="showCurrencyList"
                          class="absolute z-20 mt-1 max-h-20 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          id="options" role="listbox">
                          <!--
          Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Active: "text-white bg-indigo-600", Not Active: "text-gray-900"
        -->
                          <li @click="onCurrencySelected(currency.code, currency.name)"
                            v-for="currency in availablecurrencies"
                            class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="option-0"
                            role="option" tabindex="-1">
                            <!-- Selected: "font-semibold" -->
                            <span class="block truncate">{{ currency.name }} - ( {{ currency.code }})</span>

                          </li>

                          <!-- More items... -->
                        </ul>

                      </div>
                    </div>


                  </div>

                  <!-- DROPDOWN-->


                </div>
              </div>

            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" @click="$emit('DialogClose')"
                class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
              <button type="button" @click="onSave"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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
import { ref, onMounted } from 'vue'
import { useFocus } from '@vueuse/core'
import { getCurrencyArray } from '../../utils/currency';
import { _  } from 'lodash';

const emit = defineEmits(['DialogClose'])

const store = useStore()
const menuname = ref('')
const description = ref('')
const target = ref()
import { onClickOutside } from '@vueuse/core';

const showCurrencyList = ref(false)

const availablecurrencies = getCurrencyArray();
const selectedCurr = ref('US dollars');
const selectedCode = ref('USD');

// ... Click Handling to close the menu when clicked outside
const modalRef = ref(null)
onClickOutside(
  modalRef,
  (event) => {
    onShowAllCurrencies();
  },
)

const props = defineProps(
  {
    edit: {
      type: Boolean,
      default: false
    },
    menucard: {
      type: Object,
      default: (() => { })
    }
  })

function onShowAllCurrencies() {
  showCurrencyList.value = !showCurrencyList.value;
}

onMounted(() => {
  if (props.edit) {
    menuname.value = props.menucard.name;
    description.value = props.menucard.description;
    selectedCode.value = props.menucard.currency;
    const curr = availablecurrencies.find(curr => curr.code == props.menucard.currency);
    selectedCurr.value = curr.name;
  }
})


function onCurrencySelected(code, name) {
  console.log('Selected ' + code + ' ' + name)
  onShowAllCurrencies();
  selectedCurr.value = name
  selectedCode.value = code;
}

const { focused } = useFocus(target, { initialValue: true })

function onSave() {
  if (!props.edit) {
    store.dispatch("addNewMenuCard", {
      name: menuname.value,
      description: description.value,
      currency: selectedCode.value,
      languages: [ { code: "en", name: "English"}]
    }
    );
  }
  else {
    const copy = _.cloneDeep(props.menucard);
    copy.name =  menuname.value,
    copy.description=  description.value,
    copy.currency =  selectedCode.value
    
    store.dispatch("updateMenuCard", copy);
  }
  emit('DialogClose')
}



</script>

<style lang="scss" scoped></style>