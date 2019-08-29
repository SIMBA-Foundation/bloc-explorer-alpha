<template>
  <v-list v-if="transactions.length > 0" class="list-aqua-ripple">
  <v-list-tile
        v-for="transaction in transactions"
        ripple
        class="news-content"
        :key="transaction.hash"
      >
        <div class="mr-3 img-wrap">
          <v-icon>ti-receipt</v-icon>
        </div>
        <v-list-tile-content class="text-content mx-4">
          <h6 class="mb-2">
            <v-btn
              flat
              small
              :to="`${'/blockchain/transaction/' + transaction.hash}`"
            >{{transaction.hash }}</v-btn>
          </h6>
          <div class="d-custom-flex fs-12 fw-light grey--text">
            <span class="mx-1 hash-tag">From
              <v-btn
                flat
                small
                :to="`${'/blockchain/address/' + transaction.from}`"
              >{{ transaction.from }}</v-btn>
            </span>
            <span class="mx-1 hash-tag">To
              <v-btn
                flat
                small
                :to="`${'/blockchain/address/' + transaction.to}`"
              >{{ transaction.to }}</v-btn>
            </span>
          </div>
        </v-list-tile-content>
        <v-list-tile-action class="list-time fs-12 grey--text">{{datediff(transaction.timestamp)}}</v-list-tile-action>
      </v-list-tile>
  </v-list>
</template>

<script>
import { getDateDiff } from "Helpers/helpers";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["transactions"])
  },
  methods: {
    datediff(timestamp) {
      return getDateDiff(timestamp);
    }
  }
};
</script>
