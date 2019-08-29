<template>
  <div>
    <v-container fluid px-6 py-6>
      <v-layout row wrap>
        <app-card
          :heading="$t('message.codag')"
          :fullScreen="false"
          :fullBlock="true"
          colClasses="lg12 sm12 xs12"
        >
          <co-dag></co-dag>
        </app-card>
      </v-layout>
    </v-container>
        <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card
          :heading="$t('message.blocks')"
          :fullScreen="false"
          :fullBlock="true"
          :footer="true"
          colClasses="xl6 lg6 md6 sm12 xs12 top-blocks-widget"
        >
          <top-blocks></top-blocks>
          <div slot="footer">
            <v-btn small color="primary" to="/blockchain/block">{{$t('message.viewAll')}}</v-btn>
          </div>
        </app-card>
        <app-card
          :heading="$t('message.transactions')"
          :fullScreen="false"
          :fullBlock="true"
          :footer="true"
          colClasses="xl6 lg6 md6 sm12 xs12 top-transactions-widget"
        >
          <top-transactions></top-transactions>
          <div slot="footer">
            <v-btn small color="primary" to="/blockchain/transactions">{{$t('message.viewAll')}}</v-btn>
          </div>
        </app-card>
      </v-layout>

      <v-layout row wrap></v-layout>
    </v-container>
  </div>
</template>

	<script>
import TopBlocks from "Components/Widgets/TopBlocks";
import TopTransactions from "Components/Widgets/TopTransactions";
import CoDag from "Components/Widgets/CoDag";
export default {
  data() {
    return {};
  },
  components: {
    CoDag,
    TopBlocks,
    TopTransactions
  }
};
</script>
