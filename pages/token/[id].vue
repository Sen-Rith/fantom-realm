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
              height: 700px;
              border: 0px;
              padding: 0;
              overflow: hidden;
              background-color: transparent;
            "
          ></iframe
        ></v-col>
        <v-col>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-text>Total Liquidity</v-card-text>
                <v-card-title
                  >$
                  {{
                    Number(
                      data.tokenDayData[0].totalLiquidityUSD
                    ).toLocaleString("en-US")
                  }}
                </v-card-title>
                <v-card-title
                  :class="
                    Number(
                      getChange(
                        data.tokenDayData[0].totalLiquidityUSD,
                        data.tokenDayData[1].totalLiquidityUSD
                      )
                    ) < 0
                      ? 'text-red'
                      : Number(
                          getChange(
                            data.tokenDayData[0].totalLiquidityUSD,
                            data.tokenDayData[1].totalLiquidityUSD
                          )
                        ) > 0
                      ? 'text-green'
                      : 'text-white'
                  "
                  >{{
                    getChange(
                      data.tokenDayData[0].totalLiquidityUSD,
                      data.tokenDayData[1].totalLiquidityUSD
                    )
                  }}
                  %</v-card-title
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-text>Volume (24hrs)</v-card-text>
                <v-card-title
                  >$
                  {{
                    Number(data.tokenDayData[0].dailyVolumeUSD).toLocaleString(
                      "en-US"
                    )
                  }}</v-card-title
                >
                <v-card-title
                  :class="
                    Number(
                      getChange(
                        data.tokenDayData[0].dailyVolumeUSD,
                        data.tokenDayData[1].dailyVolumeUSD
                      )
                    ) < 0
                      ? 'text-red'
                      : Number(
                          getChange(
                            data.tokenDayData[0].dailyVolumeUSD,
                            data.tokenDayData[1].dailyVolumeUSD
                          )
                        ) > 0
                      ? 'text-green'
                      : 'text-white'
                  "
                  >{{
                    getChange(
                      data.tokenDayData[0].dailyVolumeUSD,
                      data.tokenDayData[1].dailyVolumeUSD
                    )
                  }}
                  %</v-card-title
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-text>Transactions (24hrs)</v-card-text>
                <v-card-title>{{
                  Number(data.tokenDayData[0].dailyTxns).toLocaleString("en-US")
                }}</v-card-title>
                <v-card-title
                  :class="
                    Number(
                      getChange(
                        data.tokenDayData[0].dailyTxns,
                        data.tokenDayData[1].dailyTxns
                      )
                    ) < 0
                      ? 'text-red'
                      : Number(
                          getChange(
                            data.tokenDayData[0].dailyTxns,
                            data.tokenDayData[1].dailyTxns
                          )
                        ) > 0
                      ? 'text-green'
                      : 'text-white'
                  "
                  >{{
                    getChange(
                      data.tokenDayData[0].dailyTxns,
                      data.tokenDayData[1].dailyTxns
                    )
                  }}
                  %</v-card-title
                >
              </v-card>
            </v-col>
          </v-row>
          <iframe
            loading="lazy"
            class="my-4"
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
      <v-row>
        <v-card width="100%" class="ma-3"
          ><v-card-item>
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
              >Top 10 pairs today with this token</v-card-subtitle
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
              <tr v-for="(item, index) in data.pairQuote" :key="index">
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
                <td>$ {{ Number(item.reserveUSD).toLocaleString("en-US") }}</td>
                <td>$ {{ Number(item.volume).toLocaleString("en-US") }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card></v-row
      >
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
import Header from "~~/components/header.vue";

const route = useRoute();

const token = ref(route.params.id);

const src = `https://kek.tools/t/${token.value}/chart?accent=BB86FC`;

const { data } = await useFetch(`/api/token/${token.value}`);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Token Not Found' })
}

function getChange(a, b) {
  const change = ((a - b) * 100) / b;
  return change > 0
    ? `+${change.toLocaleString("en-US")}`
    : change.toLocaleString("en-US");
}

function getLogo(symbol: string) {
  return `https://assets.spooky.fi/tokens/${symbol}.png`;
}

useHead({
  title: "Fantom Realm",
  meta: [
    {
      name: "description",
      content: `Price chart of ${data.value.name} on Fantom Opera Network`,
    },
    {
      name: "og:title",
      content: data.value.name,
    },
    {
      name: "og:description",
      content: `Price chart of ${data.value.name} on Fantom Opera Network`,
    },
    {
      name: "og:image",
      content: "https://fantom-realm.com/logo.png",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
});
</script>
