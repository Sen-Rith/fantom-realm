<template>
  <div>
    <v-card class="mb-4" flat>
      <v-text-field
        class="mx-4"
        v-model="searchText"
        label="Enter token name or address"
        hide-details="auto"
        :loading="pending"
        color="primary"
        clearable
        prepend-inner-icon="mdi-database-search"
        @update:model-value="searchTokens()"
        @click:clear="
          () => {
            tokens = [];
            search = '';
          }
        "
      ></v-text-field>
      <v-list v-if="tokens.length > 0">
        <v-list-subheader
          >Results
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small">
                mdi-information-outline
              </v-icon>
            </template>
            <span
              >We only show tokens that have enough liquidity to make
              trades</span
            >
          </v-tooltip></v-list-subheader
        >
        <v-list-item v-for="token in tokens" :key="token.id"
          ><template v-slot:prepend>
            <v-avatar class="my-2 mr-4">
              <v-img :src="getLogo(token.symbol)" width="40" height="40"
                ><template v-slot:placeholder>
                  <div
                    class="d-flex align-center justify-center fill-height text-h4"
                  >
                    🤔
                  </div>
                </template></v-img
              >
            </v-avatar>
          </template>
          <a :href="'/token/' + token.id"
            ><v-list-item-title v-text="token.name"></v-list-item-title
          ></a>
          <v-list-item-subtitle v-text="token.id"></v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const { $_ } = useNuxtApp();

const search = ref("");

const searchText = ref("");

const { data: tokens, pending } = await useFetch(
  () => `/api/searchTokens/${search.value}`
);

const searchTokens = $_.debounce(async () => {
  if (searchText.value.length < 2) return;
  search.value = searchText.value;
}, 1500);

function getLogo(symbol: string) {
  return `https://assets.spooky.fi/tokens/${symbol}.png`;
}
</script>
