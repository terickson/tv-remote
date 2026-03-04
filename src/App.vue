<template>
  <v-app>
    <AppNavigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppNavigation from '@/components/AppNavigation.vue'
</script>
