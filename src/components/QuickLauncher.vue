<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="outlined" size="large">
        Quick
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="qLaunch in quickLaunches"
        :key="qLaunch.display"
        :title="qLaunch.display"
        @click="$emit('launch', qLaunch)"
      />
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { QuickLaunchConfig } from '@/config/types'

defineProps<{
  quickLaunches: QuickLaunchConfig[]
}>()

defineEmits<{
  launch: [qLaunch: QuickLaunchConfig]
}>()
</script>
