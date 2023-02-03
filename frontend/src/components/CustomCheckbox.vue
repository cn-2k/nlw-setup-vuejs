<template>
  <div class="flex items-center gap-2">
    <input
      name="checkbox"
      :id="props.id"
      type="checkbox"
      class="accent-green-600 w-5 h-5"
      :aria-label="props.label"
      :aria-checked="props.isChecked"
      :tabIndex="0"
      :checked="props.isChecked"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <label :for="id" :class="labelClass">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
interface CustomCheckboxProps {
  label: string;
  id: string;
  isWeekDays?: boolean;
  weekDays?: number[];
  isChecked: boolean;
  disabled?: boolean;
  onCheckedChange?: (index: number) => void;
}

const props = defineProps<CustomCheckboxProps>();

const checked = ref<boolean>(props.isChecked || false);

const labelClass = computed(() =>
  checked.value && !props.isWeekDays
    ? "font-semibold text-xl text-zinc-400 leading-tight line-through"
    : props.isWeekDays
    ? "text-white leading-tight"
    : "font-semibold text-xl text-white leading-tight"
);

const handleChange = (event: Event) => {
  checked.value = (event.target as HTMLInputElement).checked;
  props.onCheckedChange && props.onCheckedChange(event as any);
};
</script>

<style lang="scss" scoped></style>
