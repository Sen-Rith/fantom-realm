<template>
  <div>
    <ClientOnly>
      <v-container class="d-flex justify-center align-center">
        <iframe
          v-if="!$vuetify.display.mobile"
          data-aa="2065715"
          src="//ad.a-ads.com/2065715?size=970x90"
          style="
            width: 970px;
            height: 90px;
            border: 0px;
            padding: 0;
            overflow: hidden;
            background-color: transparent;
          "
        ></iframe>
        <iframe
          v-if="$vuetify.display.mobile"
          data-aa="2067202"
          src="//ad.a-ads.com/2067202?size=250x250"
          style="
            width: 250px;
            height: 250px;
            border: 0px;
            padding: 0;
            overflow: hidden;
            background-color: transparent;
          "
        ></iframe>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            v-if="!$vuetify.display.mobile"
            cols="2"
            class="d-flex justify-center align-center"
            ><iframe
              data-aa="2065700"
              src="//ad.a-ads.com/2065700?size=160x600"
              style="
                width: 160px;
                height: 600px;
                border: 0px;
                padding: 0;
                overflow: hidden;
                background-color: transparent;
              "
            ></iframe
          ></v-col>
          <v-col>
            <iframe
              loading="lazy"
              :src="src"
              width="100%"
              height="600px"
              frameborder="0"
              scrolling="no"
              align="center"
            >
            </iframe>
          </v-col>
          <v-col
            v-if="!$vuetify.display.mobile"
            cols="2"
            class="d-flex justify-center align-center"
            ><iframe
              data-aa="2065700"
              src="//ad.a-ads.com/2065700?size=160x600"
              style="
                width: 160px;
                height: 600px;
                border: 0px;
                padding: 0;
                overflow: hidden;
                background-color: transparent;
              "
            ></iframe
          ></v-col>
        </v-row>
      </v-container>
      <v-container
        v-if="$vuetify.display.mobile"
        class="d-flex justify-center align-center"
        ><iframe
          data-aa="2067202"
          src="//ad.a-ads.com/2067202?size=250x250"
          style="
            width: 250px;
            height: 250px;
            border: 0px;
            padding: 0;
            overflow: hidden;
            background-color: transparent;
          "
        ></iframe
      ></v-container>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const token = ref(route.params.id);

const src = `https://kek.tools/t/${token.value}/chart?accent=BB86FC`;
</script>
