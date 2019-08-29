<template>
  <v-list class="list-aqua-ripple">
    <transition-group name="slide" enter-active-class="animated fadeInDown">
      <v-list-tile
        v-for="block in blocks"
        :key="block.hash"
        class="news-content"
      >
        <div class="list-complete-item">
          <div class="mr-3 img-wrap">
            <div class="block-head white--text text-center">
              <span class="icon-style">
                <i class="zmdi" :class="'zmdi-layers'"></i>
              </span>
              <span>&nbsp;{{block.levelNumber }}</span>
            </div>
          </div>
          <v-list-tile-content class="text-content mx-2">
            <h6 class="mb-2">
              <v-btn flat small :to="`${'/blockchain/block/' + block.hash}`">{{block.hash }}</v-btn>
            </h6>
            <div class="d-custom-flex fs-12 fw-light grey--text">
              <span class="mx-1">
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/block/' + block.hash + '/#transitions'}`"
                >{{block.txCount}} Txns</v-btn>
              </span>
              <span class="mx-1">
                Mined By
                <a href="javascript:void(0)">{{ block.miner }}</a>
              </span>
            </div>
          </v-list-tile-content>
          <v-list-tile-action class="list-time fs-12 grey--text">{{datediff(block.timestamp)}}</v-list-tile-action>
        </div>
      </v-list-tile>
    </transition-group>
  </v-list>
</template>

<script>
import { getDateDiff, getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["blocks"])
  },
  methods: {
    datediff(timestamp) {
      return getDateDiff(timestamp);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    }
  }
};
</script>
