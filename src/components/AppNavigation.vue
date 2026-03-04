<template>
  <v-app-bar color="primary" density="comfortable">
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
    <v-app-bar-title>{{ roomName }}</v-app-bar-title>
    <template v-slot:append>
      <div class="d-none d-md-flex">
        <v-btn
          v-for="room in roomList"
          :key="room.id"
          :to="`/room/${room.id}`"
          variant="text"
        >
          {{ room.name }}
        </v-btn>
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item
        v-for="room in roomList"
        :key="room.id"
        :to="`/room/${room.id}`"
        :title="room.name"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { rooms } from '@/config/rooms'

const route = useRoute()
const drawer = ref(false)

const roomList = computed(() =>
  Object.values(rooms).map(r => ({ id: r.id, name: r.name.replace(' Remote', '') }))
)

const roomName = computed(() => {
  const roomId = route.params.roomId as string
  return rooms[roomId]?.name ?? 'TV Remote'
})
</script>
