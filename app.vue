<template>
  <v-app>
    <NuxtLayout><NuxtLoadingIndicator /><NuxtPage /></NuxtLayout>
  </v-app>
</template>

<script setup>
const title = ref("Fantom Realm");
const description = ref("Price chart for tokens on Fantom Opera Network");

useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
});
</script>
