<template>
  <div class="d-flex justify-center ga-6">
    <v-btn
      icon="mdi-rewind"
      size="x-large"
      @click="$emit('rewind')"
    />
    <v-btn
      icon="mdi-play"
      size="x-large"
      @click="$emit('play')"
    />
    <v-btn
      icon="mdi-fast-forward"
      size="x-large"
      @click="$emit('fast-forward')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  rewind: []
  play: []
  'fast-forward': []
}>()
</script>
