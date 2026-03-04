<template>
  <div>
    <div class="text-subtitle-2 mb-1">Channels</div>
    <div class="d-flex flex-column align-center ga-3 mt-8">
      <v-btn
        icon="mdi-arrow-up-bold"
        size="x-large"
        @click="$emit('channel-up')"
      />
      <v-btn
        icon="mdi-arrow-down-bold"
        size="x-large"
        @click="$emit('channel-down')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'channel-up': []
  'channel-down': []
}>()
</script>
