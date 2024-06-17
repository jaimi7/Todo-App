<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Todo App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in linksList"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMeta } from "quasar";

defineOptions({
  name: "MainLayout",
});

const metaData = {
  title: "Todo App",
};

useMeta(metaData);

const linksList = [
  {
    label: "Todo",
    icon: "list",
    to: "/",
  },
  {
    label: "Settings",
    icon: "settings",
    to: "/settings",
  },
];
</script>
