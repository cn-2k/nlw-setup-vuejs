<template>
  <div class="w-full max-w-3xl mx-auto flex items-center justify-between">
    <img :src="logoImage" alt="Habits" />
    <button
      type="button"
      @click="toggleModal"
      class="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
    >
      <i-ph-plus class="w-5 h-5 text-violet-500" />
      Novo hábito
    </button>
  </div>

  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="toggleModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="w-screen h-screen bg-black/80 fixed inset-0" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-10 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-3xl leading-tight font-extrabold"
              >
                Criar hábito
                <div
                  class="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200"
                >
                  <i-ph-x
                    class="cursor-pointer w-5 h-5"
                    aria-label="Fechar"
                    @click="toggleModal"
                  />
                </div>
              </DialogTitle>
              <NewHabitForm />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import logoImage from "@/assets/logo.svg";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const isModalOpen = ref<boolean>(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
</script>

<style scoped></style>
