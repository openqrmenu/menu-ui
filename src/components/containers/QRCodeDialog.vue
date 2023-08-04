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
                <div class="border-b border-gray-900/10 pb-12" id="qrdiv">
                    <qrcode-vue :value="url" :size="300" level="H" 
                    id="qrblock"
                    ref="qrcode"
                    />
                </div>
  
              </div>

              <div v-if="showSuccess" class="rounded-md bg-green-50 mt-4 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">Copied To Clipboard</p>
                    </div>
                    <div class="ml-auto pl-3">
                    <div class="-mx-1.5 -my-1.5">
                        <button @click="showSuccess = false " type="button" class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
  
              <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" @click="$emit('DialogClose')"
                  class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="button" @click="copyToClipboard"
                  class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Copy to Clipboard</button>
                <button type="button" @click="downloadQR"
                  class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Download</button>  
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
  import QrcodeVue from 'qrcode.vue'
  
  const showSuccess = ref(false);
  const emit = defineEmits(['DialogClose'])
  
  const url = ref('https://kaizen.ist')

  
  components:  {
    QrcodeVue
}
  
  const props = defineProps(
    {
      url: {
        type: String,
        default: ""
      },
    })
  
  onMounted(() => {
  })
  
  
function copyToClipboard() {
    const canvas = document.getElementById('qrblock');
    canvas.toBlob(function(blob) { 
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]); 
    //emit('DialogClose');
    showSuccess.value = true;
});
 }


  function downloadQR()
  {
    const canvas = document.getElementById('qrblock');
    let aEl = document.createElement("a");
    aEl.href = canvas.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    emit('DialogClose');
}
 
  </script>
  
  <style lang="scss" scoped></style>