<template>
  <div>
    <Header />
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
          <v-card class="mb-5"
            ><v-card-item class="text-center">
              <v-card-title>Fantom charts</v-card-title>
              <v-card-subtitle
                >View price chart for any token on Fantom Opera
                Network</v-card-subtitle
              >
            </v-card-item>
            <Search />
          </v-card>
          <v-card class="mb-5"
            ><v-card-item>
              <v-card-title
                >Top 10 active tokens today
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" size="x-small">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span
                    >Tokens are ranked by their daily volume from different
                    exchanges like SpookySwap, SpiritSwap, etc.</span
                  >
                </v-tooltip></v-card-title
              >
              <v-card-subtitle
                >Top 10 active tokens today on Fantom Opera
                Network</v-card-subtitle
              >
            </v-card-item>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th v-if="$vuetify.display.mobile" class="text-left">
                    Price change (24hrs)
                  </th>
                  <th class="text-left">Symbol</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Volume (24hrs)</th>
                  <th v-if="!$vuetify.display.mobile" class="text-left">
                    Price change (24hrs)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in topTokens" :key="item.name">
                  <td>
                    <a :href="'/token/' + item.id">
                      <v-avatar class="my-2 mr-4">
                        <v-img
                          :src="getLogo(item.symbol)"
                          width="40"
                          height="40"
                          ><template v-slot:placeholder>
                            <div
                              class="d-flex align-center justify-center fill-height text-h4"
                            >
                              🤔
                            </div>
                          </template></v-img
                        > </v-avatar
                      >{{ item.name }}</a
                    >
                  </td>
                  <td
                    v-if="$vuetify.display.mobile"
                    :class="
                      Number(getPriceChange(item)) < 0
                        ? 'text-red'
                        : Number(getPriceChange(item)) > 0
                        ? 'text-green'
                        : 'text-white'
                    "
                  >
                    {{ getPriceChange(item) }}%
                  </td>
                  <td>{{ item.symbol }}</td>
                  <td>
                    ${{ item.tokenDayData[0].priceUSD.toLocaleString("en-US") }}
                  </td>
                  <td>
                    ${{
                      item.tokenDayData[0].dailyVolumeUSD.toLocaleString(
                        "en-US"
                      )
                    }}
                  </td>
                  <td
                    v-if="!$vuetify.display.mobile"
                    :class="
                      Number(getPriceChange(item)) < 0
                        ? 'text-red'
                        : Number(getPriceChange(item)) > 0
                        ? 'text-green'
                        : 'text-white'
                    "
                  >
                    {{ getPriceChange(item) }}%
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card>
            <v-card-item>
              <v-card-title
                >Top 10 active pairs today
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" size="x-small">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span
                    >Tokens are ranked by their daily volume from different
                    exchanges like SpookySwap, SpiritSwap, etc.</span
                  >
                </v-tooltip></v-card-title
              >
              <v-card-subtitle
                >Top 10 pairs on Fantom Opera Network</v-card-subtitle
              >
            </v-card-item>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Liquidity</th>
                  <th class="text-left">Volume (24hrs)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in topPairs" :key="index">
                  <td>
                    <v-avatar class="my-2">
                      <v-img
                        :src="getLogo(item.token0.symbol)"
                        width="40"
                        height="40"
                        ><template v-slot:placeholder>
                          <div
                            class="d-flex align-center justify-center fill-height text-h4"
                          >
                            🤔
                          </div>
                        </template></v-img
                      > </v-avatar
                    ><v-avatar start class="mr-8">
                      <v-img
                        :src="getLogo(item.token1.symbol)"
                        width="40"
                        height="40"
                        ><template v-slot:placeholder>
                          <div
                            class="d-flex align-center justify-center fill-height text-h4"
                          >
                            🤔
                          </div>
                        </template></v-img
                      > </v-avatar
                    >{{ item.token0.symbol }} - {{ item.token1.symbol }}
                  </td>
                  <td>
                    $ {{ Number(item.reserveUSD).toLocaleString("en-US") }}
                  </td>
                  <td>
                    $ {{ Number(item.dailyVolumeUSD).toLocaleString("en-US") }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col
          v-if="!$vuetify.display.mobile"
          cols="2"
          class="d-flex justify-center align-center"
          ><iframe
            data-aa="2074413"
            loading="lazy"
            src="//ad.a-ads.com/2074413?size=160x600"
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
  </div>
</template>

<script setup lang="ts">
import Search from "~~/components/search.vue";
import Header from "~~/components/header.vue";

const topTokens = (await useFetch("/api/topTokens")).data;
const topPairs = (await useFetch("/api/topPairs")).data;

function getLogo(symbol: string) {
  return `https://assets.spooky.fi/tokens/${symbol}.png`;
}

function getPriceChange(item) {
  const price =
    ((item.tokenDayData[0].priceUSD - item.tokenDayData[1].priceUSD) * 100) /
    item.tokenDayData[1].priceUSD;
  return price > 0
    ? `+${price.toLocaleString("en-US")}`
    : price.toLocaleString("en-US");
}

useHead({
  title: "Fantom Realm",
  meta: [
    {
      name: "description",
      content: "Price chart of tokens on Fantom Opera Network",
    },
    {
      name: "og:title",
      content: "Fantom Realm",
    },
    {
      name: "og:description",
      content: "Price chart of tokens on Fantom Opera Network",
    },
    {
      name: "og:image",
      content: "https://fantom-realm.com/logo.png",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
});
</script>
