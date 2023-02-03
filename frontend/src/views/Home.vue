<template>
  <div class='w-screen h-screen flex justify-center items-center'>
    <div class="w-full max-w-5xl px-6 flex flex-col gap-16">
      <Header />
      <SummaryTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import SummaryTable from '@/components/SummaryTable.vue';
</script>
