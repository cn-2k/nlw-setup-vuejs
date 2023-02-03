<template>
  <form @submit.prevent="createNewHabit" class="w-full flex flex-col mt-6">
    <label class="font-semibold leading-tight">
      Qual seu comprometimento?
    </label>
    <input
      v-model="title"
      class="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      type="text"
      name=""
      id="title"
      placeholder="ex.: Exercícios, dormir bem, etc..."
    />

    <label class="font-semibold leading-tight mt-4">
      Qual a recorrência?
    </label>
    <div class="flex flex-col gap-2 mt-3">
      <CustomCheckbox
        v-for="(weekDay, i) in avaiableWeekDays"
        :key="weekDay"
        :is-checked="weekDays.includes(i)"
        :label="weekDay"
        :id="i.toString()"
        is-week-days
        @checked-change="() => handleCheckboxChange(i)"
      />
    </div>

    <button
      type="submit"
      class="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-700 hover:bg-green-600 transition-colors"
    >
      <i-ph-check class="w-5 h-5 font-bold" />
      Confirmar
    </button>
  </form>
</template>

<script setup lang="ts">
import { api } from "@/lib/axios";
import CustomCheckbox from "./CustomCheckbox.vue";

const avaiableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const title = ref<string>("");
const weekDays = ref<number[]>([]);

async function createNewHabit() {
  if (!title.value || weekDays.value.length === 0) {
    return;
  }

  await api.post("habits", {
    title: title.value,
    weekDays: weekDays.value,
  });

  title.value = "";
  weekDays.value = [];

  alert("Hábito criado com sucesso!");
}

function handleCheckboxChange(index: number) {
  if (weekDays.value.includes(index)) {
    // remove
    weekDays.value = weekDays.value.filter((day) => day !== index);
  } else {
    // add
    weekDays.value = [...weekDays.value, index];
  }
}
</script>
