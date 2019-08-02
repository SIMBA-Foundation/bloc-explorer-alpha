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
  </div>
</template>

	<script>
import CoDag from "Components/Widgets/CoDag";
export default {
  data() {
    return {};
  },
  components: {
    CoDag
  }
};
</script>
