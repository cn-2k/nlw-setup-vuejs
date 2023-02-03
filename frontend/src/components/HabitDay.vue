<template>
  <Popover>
    <Float
      placement="bottom"
      :offset="15"
      :shift="6"
      :flip="10"
      arrow
      portal
      enter="transition duration-200 ease-out"
      enter-from="opacity-0 -translate-y-1"
      enter-to="opacity-100 translate-y-0"
      leave="transition duration-150 ease-in"
      leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 -translate-y-1"
    >
      <PopoverButton
        :class="[
          'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
          habitDayClassObject,
        ]"
      />

      <PopoverPanel
        class="min-w-[320px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg focus:outline-none"
      >
        <FloatArrow
          class="absolute bg-zinc-900 w-5 h-5 rotate-45 border border-zinc-800"
        />
        <div class="relative flex flex-col bg-zinc-900 p-6 rounded-2xl">
          <span class="font-semibold text-zinc-400">{{ dayOfWeek }}</span>
          <span class="mt-1 font-extrabold leading-tight text-3xl">{{
            dayAndMonth
          }}</span>
          <ProgressBar :progress="completedPercentage" />
          <HabitsList
            :date="date"
            @onCompletedChanged="handleCompletedChanged"
          />
        </div>
      </PopoverPanel>
    </Float>
  </Popover>
</template>

<script setup lang="ts">
import { Float, FloatArrow } from "@headlessui-float/vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import dayjs from "dayjs";
import ProgressBar from "./ProgressBar.vue";

const props = withDefaults(
  defineProps<{
    date: Date;
    defaultCompleted?: number;
    amount?: number;
  }>(),
  {
    defaultCompleted: 0,
    amount: 0,
  }
);

const completed = ref(props.defaultCompleted);

const completedPercentage = computed(() =>
  props.amount > 0 ? Math.round((completed.value / props.amount) * 100) : 0
);

const dayAndMonth = dayjs(props.date).format("DD/MM");
const dayOfWeek = dayjs(props.date).format("dddd");

const habitDayClassObject = computed(() => {
  return {
    "bg-zinc-900 border-zinc-800": completedPercentage.value === 0,
    "bg-violet-900 border-violet-700":
      completedPercentage.value > 0 && completedPercentage.value < 20,
    "bg-violet-800 border-violet-600":
      completedPercentage.value >= 20 && completedPercentage.value < 40,
    "bg-violet-700 border-violet-500":
      completedPercentage.value >= 40 && completedPercentage.value < 60,
    "bg-violet-600 border-violet-500":
      completedPercentage.value >= 60 && completedPercentage.value < 80,
    "bg-violet-500 border-violet-400": completedPercentage.value >= 80,
  };
});

function handleCompletedChanged(completedHabit: number) {
  completed.value = completedHabit;
}
</script>
