<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex justify-start align-center"
        v-if="!$vuetify.display.mobile"
      >
        <v-card
          prepend-avatar="/fantom-logo.png"
          max-height="60"
          class="rounded-pill"
          href="https://www.coingecko.com/en/coins/fantom"
          target="_blank"
          :title="Number(ftmPrice).toLocaleString('en-US') + ' $'"
        >
        </v-card>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <v-card
          max-width="350"
          flat
          style="background-color: transparent"
          @click="navigateTo('/')"
          ><v-img src="/logo.png" alt="FT" max-height="150"></v-img
          ><v-card-title class="text-center">Fantom Realm</v-card-title></v-card
        >
      </v-col>
      <v-col
        class="d-flex justify-end align-center"
        v-if="!$vuetify.display.mobile"
      >
        <v-btn
          v-if="theme.global.current.value.dark"
          @click="toggleTheme"
          variant="outlined"
          color="primary"
          icon="mdi-white-balance-sunny"
        ></v-btn>
        <v-btn
          v-if="!theme.global.current.value.dark"
          @click="toggleTheme"
          variant="outlined"
          color="primary"
          icon="mdi-weather-night"
        ></v-btn>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-space-between align-center pa-2"
      v-if="$vuetify.display.mobile"
    >
      <v-card
        prepend-avatar="/fantom-logo.png"
        max-height="60"
        class="d-inline-flex rounded-pill"
        href="https://www.coingecko.com/en/coins/fantom"
        target="_blank"
        :title="Number(ftmPrice).toLocaleString('en-US') + ' $'"
      >
      </v-card>
      <v-btn
        v-if="theme.global.current.value.dark"
        @click="toggleTheme"
        variant="outlined"
        color="primary"
        icon="mdi-white-balance-sunny"
      ></v-btn>
      <v-btn
        v-if="!theme.global.current.value.dark"
        @click="toggleTheme"
        variant="outlined"
        color="primary"
        icon="mdi-weather-night"
      ></v-btn>
    </v-row>
    <slot />
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();
const ftmPrice = (await useFetch("/api/ftmPrice")).data;

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
