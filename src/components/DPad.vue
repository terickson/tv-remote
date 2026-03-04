<template>
  <div class="dpad-grid">
    <v-btn
      icon="mdi-arrow-up-bold"
      size="x-large"
      class="dpad-up"
      @click="$emit('up')"
    />
    <v-btn
      icon="mdi-arrow-left-bold"
      size="x-large"
      class="dpad-left"
      @click="$emit('left')"
    />
    <v-btn
      size="x-large"
      class="dpad-center"
      @click="$emit('select')"
    >
      {{ centerLabel }}
    </v-btn>
    <v-btn
      icon="mdi-arrow-right-bold"
      size="x-large"
      class="dpad-right"
      @click="$emit('right')"
    />
    <v-btn
      icon="mdi-arrow-down-bold"
      size="x-large"
      class="dpad-down"
      @click="$emit('down')"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  centerLabel?: string
}>(), {
  centerLabel: 'Enter',
})

defineEmits<{
  up: []
  down: []
  left: []
  right: []
  select: []
}>()
</script>

<style scoped>
.dpad-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  justify-items: center;
  align-items: center;
  max-width: 240px;
  margin: 0 auto;
}
.dpad-up { grid-column: 2; grid-row: 1; }
.dpad-left { grid-column: 1; grid-row: 2; }
.dpad-center { grid-column: 2; grid-row: 2; }
.dpad-right { grid-column: 3; grid-row: 2; }
.dpad-down { grid-column: 2; grid-row: 3; }
</style>
