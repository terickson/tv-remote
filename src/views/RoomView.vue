<template>
  <v-container fluid class="pa-4">
    <InputSelector
      :model-value="currentInput"
      :items="room.inputs"
      @update:model-value="changeInput"
    >
      <template #quick-launch>
        <QuickLauncher
          :quick-launches="room.quickLaunches"
          @launch="quickLaunch"
        />
      </template>
    </InputSelector>

    <v-row class="mt-4">
      <v-col cols="6" sm="4">
        <VolumeControls
          :intervals="room.volume.intervals"
          :interval="volumeCtrl.interval.value"
          @volume-up="volumeCtrl.volumeUp()"
          @volume-down="volumeCtrl.volumeDown()"
          @update:interval="volumeCtrl.interval.value = $event"
        />
      </v-col>
      <v-col v-if="currentInput === 'TV'" cols="6" sm="4">
        <ChannelControls
          @channel-up="tv.channelUp()"
          @channel-down="tv.channelDown()"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <TvNavigation
      v-if="currentInput === 'TV'"
      :tv-host="room.tvHost"
    />

    <RokuNavigation
      v-if="currentInput === 'Roku'"
      :roku-host="room.rokuHost"
      :system-path="rokuSystemPath"
    />
  </v-container>
</template>

<script setup lang="ts">
import { rooms } from '@/config/rooms'
import { useInputSwitcher } from '@/composables/useInputSwitcher'
import { useVolumeControl } from '@/composables/useVolumeControl'
import { useTvControl } from '@/composables/useTvControl'
import InputSelector from '@/components/InputSelector.vue'
import QuickLauncher from '@/components/QuickLauncher.vue'
import VolumeControls from '@/components/VolumeControls.vue'
import ChannelControls from '@/components/ChannelControls.vue'
import TvNavigation from '@/components/TvNavigation.vue'
import RokuNavigation from '@/components/RokuNavigation.vue'

const props = defineProps<{
  roomId: string
}>()

const room = rooms[props.roomId]
const volumeCtrl = useVolumeControl(room)
const { currentInput, changeInput, quickLaunch, rokuSystemPath } = useInputSwitcher(room, volumeCtrl.resetVolume)
const tv = useTvControl(room.tvHost)
</script>
