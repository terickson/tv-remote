<template>
  <v-row align="center" class="mb-2">
    <v-col cols="5">
      <v-select
        :model-value="modelValue"
        :items="items"
        item-title="display"
        item-value="value"
        label="Input"
        density="comfortable"
        hide-details
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </v-col>
    <v-col cols="2" class="text-center">
      <v-chip v-if="currentDisplay" color="primary" variant="tonal">
        {{ currentDisplay }}
      </v-chip>
    </v-col>
    <v-col cols="5" class="text-right">
      <slot name="quick-launch" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputConfig } from '@/config/types'

const props = defineProps<{
  modelValue: string | null
  items: InputConfig[]
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const currentDisplay = computed(() => {
  if (props.modelValue === null) return null
  const found = props.items.find(i => i.value === props.modelValue)
  return found?.display ?? null
})
</script>
