<template>
  <div class="w-full flex">
    <div class="grid grid-rows-7 grid-flow-row gap-3">
      <div
        v-for="(weekDay, index) in weekDays"
        :key="`${weekDay} - ${index}`"
        class="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
      >
        {{ weekDay }}
      </div>
    </div>

    <div v-if="summary.length > 0" class="grid grid-rows-7 grid-flow-col gap-3">
      <HabitDay
        v-for="date in summaryDates"
        :key="date.toString()"
        :date="date"
        :amount="findDayInSummary(date)?.amount"
        :defaultCompleted="findDayInSummary(date)?.completed"
      />
      <div
        v-if="amountOfDaysToFill > 0"
        v-for="(_, i) in Array.from({ length: amountOfDaysToFill })"
        :key="i"
        class="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import HabitDay from "./HabitDay.vue";

onBeforeMount(() => {
  api.get("summary").then((response) => {
    summary.value = response.data;
  });
});

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

const summary = ref<Summary>([]);

const findDayInSummary = computed(() => {
  return (date: Date) => {
    return summary.value.find((day) => {
      return dayjs(date).isSame(day.date, "day");
    });
  };
});
</script>
