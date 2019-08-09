<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="lg12 sm12 xs12">
          <transaction></transaction>
        </app-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Transaction from "Components/Widgets/Transaction";

export default {
  computed: {
    ...mapGetters(["blockchain", "transactionDetail"])
  },
  data() {
    return {};
  },
  components: {
    Transaction
  }
};
</script>