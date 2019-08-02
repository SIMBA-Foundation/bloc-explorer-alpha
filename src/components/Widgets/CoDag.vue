<template>
  <div class="top-content" ref="charts-block" id="charts-block" style="width:100%;height:360px">
    <CodagChart
      ref="BlockcloudCoDag"
      elemtarget="charts-block"
      :chartdata="codagData"
      :chartlinks="codagLinks"
      :codagLevels="codagLevels"
    ></CodagChart>
  </div>
</template>

<script>
import CodagChart from "./Charts/CodagChart";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      resetTimeout: false
    };
  },
  watch: {
    codagData() {
      this.updateCodag();
    },
    codagLinks() {
      this.updateCodag();
    },
    levels() {
      this.updateCodag();
    }
  },
  computed: {
    ...mapGetters(["codagLinks", "codagData", "levels", "codagLevels"])
  },
  components: {
    CodagChart
  },
  methods: {
    updateCodag() {
      if (this.resetTimeout) {
        clearTimeout(this.resetTimeout);
      }
      this.resetTimeout = setTimeout(() => {
        this.$refs.BlockcloudCoDag.renderChart(
          "charts-block",
          this.codagData,
          this.codagLinks,
          this.codagLevels
        );
      }, 100);
    }
  }
};
</script>