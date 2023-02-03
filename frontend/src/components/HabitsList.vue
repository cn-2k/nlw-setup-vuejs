<template>
  <div class="relative flex flex-col bg-zinc-900 rounded-2xl">
    <div class="mt-6 flex flex-col gap-3">
      <CustomCheckbox
        v-for="(habit, i) in habitsInfo?.possibleHabits"
        :key="habit.id"
        :is-checked="habitsInfo!.completedHabits.includes(habit.id)"
        :label="habit.title"
        :id="i.toString()"
        :disabled="isDateInPast"
        @checked-change="() => handleToggleHabit(habit.id)"
      />
    </div>
    <div
      class="text-center font-bold text-sm"
      v-if="!habitsInfo?.possibleHabits.length"
    >
      Não há hábitos registrados!
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import CustomCheckbox from "./CustomCheckbox.vue";

interface HabitsInfoProps {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

onBeforeMount(() => {
  api
    .get("/day", {
      params: {
        date: props.date.toISOString(),
      },
    })
    .then((response) => {
      habitsInfo.value = response.data;
    });
});

const props = defineProps<{
  date: Date;
}>();

const emit = defineEmits<{
  (e: "onCompletedChanged", completed: number): void;
}>();

const habitsInfo = ref<HabitsInfoProps>();
const isDateInPast = dayjs(props.date).endOf("day").isBefore(new Date());

const handleToggleHabit = async (habitId: string) => {
  const isHabitAlreadyCompleted =
    habitsInfo.value!.completedHabits.includes(habitId);

  await api.patch(`/habits/${habitId}/toggle`);

  let completedHabits: string[] = [];

  if (isHabitAlreadyCompleted) {
    // delete from list
    completedHabits = habitsInfo.value!.completedHabits.filter(
      (id) => id !== habitId
    );
  } else {
    // add on the list
    completedHabits = [...habitsInfo.value!.completedHabits, habitId];
  }

  habitsInfo.value = {
    possibleHabits: habitsInfo.value!.possibleHabits,
    completedHabits,
  };

  emit("onCompletedChanged", completedHabits.length);
};
</script>

<style scoped></style>
