<template>
  <div>
    <v-row class="mb-4">
      <v-col class="d-flex justify-space-between">
        <v-btn size="x-large" @click="tv.back()">
          <v-icon>mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <v-btn size="x-large" @click="tv.menu()">
          <v-icon>mdi-compass</v-icon>
          Menu
        </v-btn>
      </v-col>
    </v-row>

    <DPad
      class="mb-6"
      @up="tv.up()"
      @down="tv.down()"
      @left="tv.left()"
      @right="tv.right()"
      @select="tv.enter()"
    />

    <v-row class="mb-4">
      <v-col class="d-flex justify-space-between">
        <v-btn size="x-large" @click="tv.exit()">
          <v-icon>mdi-close-circle</v-icon>
          Exit
        </v-btn>
        <v-btn size="x-large" @click="tv.smart()">
          <v-icon>mdi-home</v-icon>
          Smart
        </v-btn>
      </v-col>
    </v-row>

    <MediaPlayback
      @rewind="tv.rewind()"
      @play="tv.play()"
      @fast-forward="tv.fastForward()"
    />
  </div>
</template>

<script setup lang="ts">
import DPad from './DPad.vue'
import MediaPlayback from './MediaPlayback.vue'
import { useTvControl } from '@/composables/useTvControl'

const props = defineProps<{
  tvHost: string
}>()

const tv = useTvControl(props.tvHost)
</script>
