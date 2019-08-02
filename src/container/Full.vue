<!-- App Main Structure -->
<template>
	<div class="app-default-layout">
		<template v-if="loading">
			<rotate-square2></rotate-square2>
		</template>
		<template v-else>
			<!-- App Header -->
			<app-header></app-header>
			<!-- App Main Content -->
			<v-content>
				<!-- App Router -->
				<transition name="router-anim" :enter-active-class="`animated ${selectedRouterAnimation}`">
					<router-view></router-view>
				</transition>
			</v-content>
		</template>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "Components/Header/Header.vue";
import AppConfig from "Constants/AppConfig";

export default {
  data() {
    return {
      loading: true
    };
  },
  components: {
    appHeader: Header
  },
  computed: {
    ...mapGetters(["selectedRouterAnimation"])
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>

<style scoped>
.app-default-layout {
  height: 100vh;
}
</style>
