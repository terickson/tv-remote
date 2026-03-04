<template>
  <div>
    <div class="text-subtitle-2 mb-1">Volume</div>
    <v-btn-toggle
      v-if="intervals && intervals.length > 0"
      :model-value="interval"
      mandatory
      density="compact"
      class="mb-2"
      @update:model-value="$emit('update:interval', $event)"
    >
      <v-btn
        v-for="opt in intervals"
        :key="opt"
        :value="opt"
        size="small"
      >
        {{ opt }}
      </v-btn>
    </v-btn-toggle>
    <div class="d-flex flex-column align-center ga-3">
      <v-btn
        icon="mdi-arrow-up-bold"
        size="x-large"
        @click="$emit('volume-up')"
      />
      <v-btn
        icon="mdi-arrow-down-bold"
        size="x-large"
        @click="$emit('volume-down')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  intervals?: number[]
  interval?: number
}>()

defineEmits<{
  'volume-up': []
  'volume-down': []
  'update:interval': [value: number]
}>()
</script>
