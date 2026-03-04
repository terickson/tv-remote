<template>
  <div>
    <v-row class="mb-4">
      <v-col class="d-flex justify-space-between">
        <v-btn size="x-large" @click="roku.back()">
          <v-icon>mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <v-btn size="x-large" @click="roku.home()">
          <v-icon>mdi-home</v-icon>
          Home
        </v-btn>
      </v-col>
    </v-row>

    <DPad
      class="mb-6"
      @up="roku.up()"
      @down="roku.down()"
      @left="roku.left()"
      @right="roku.right()"
      @select="roku.select()"
    />

    <MediaPlayback
      @rewind="roku.reverse()"
      @play="roku.play()"
      @fast-forward="roku.forward()"
    />
  </div>
</template>

<script setup lang="ts">
import DPad from './DPad.vue'
import MediaPlayback from './MediaPlayback.vue'
import { useRokuControl } from '@/composables/useRokuControl'

const props = defineProps<{
  rokuHost: string
  systemPath: string
}>()

const roku = useRokuControl(props.rokuHost, props.systemPath)
</script>
