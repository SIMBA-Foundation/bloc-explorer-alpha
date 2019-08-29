<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="lg12 sm12 xs12">
          <address-detail></address-detail>
        </app-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressDetail from "Components/Widgets/AddressDetail";

export default {
  computed: {
    ...mapGetters(["blockchain", "addressDetail"])
  },
  data() {
    return {};
  },
  components: {
    AddressDetail
  }
};
</script>