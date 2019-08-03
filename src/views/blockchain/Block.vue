<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="lg12 sm12 xs12">
          <block-detail></block-detail>
        </app-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlockDetail from "Components/Widgets/BlockDetail";

export default {
  computed: {
    ...mapGetters(["blockchain", "blockDetail"])
  },
  data() {
    return {};
  },
  components: {
    BlockDetail
  }
};
</script>