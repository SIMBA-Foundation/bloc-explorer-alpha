<!-- App Main Structure -->
<template>
   <div class="app-boxed-layout boxed-v2">
      <template v-if="loading">
			<rotate-square2></rotate-square2>
		</template>
      <div class="app-container" v-else>
         <!-- App Header -->
         <app-header :horizontal="true"></app-header>
			<v-navigation-drawer
				temporary
				absolute
				v-model="horizontalLayoutSidebar"
				:width="250"
			>
				<app-sidebar></app-sidebar>
			</v-navigation-drawer>
         <!-- App Main Content -->
         <v-content>
            <!-- App Router -->
            <app-horizontal-menus></app-horizontal-menus>
            <div class="app-content">
               <transition name="router-anim" :enter-active-class="`animated ${selectedRouterAnimation}`">
                  <router-view></router-view>
               </transition>
            </div>
         </v-content>
      </div>
   </div>
</template>

<script>
import Sidebar from "Components/Sidebar/Sidebar";
import Header from "Components/Header/Header.vue";
import AppHorizontalMenus from "Components/AppHorizontalMenus/AppHorizontalMenus";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
    appHorizontalMenus: AppHorizontalMenus,
    PageTitleBar
  },
  computed: {
    ...mapGetters(["selectedRouterAnimation"]),
    horizontalLayoutSidebar: {
      get() {
        return this.$store.getters.horizontalLayoutSidebar;
      },
      set(val) {
        this.$store.dispatch("toggleHorizontalLayoutSidebar", val);
      }
    },
    // computed property to get page breadcrumbs
    pageTitle() {
      return this.$breadcrumbs[0].meta.title;
    },
    pageBreadcrumb() {
      return this.$breadcrumbs[0].meta.breadcrumb;
    }
  }
};
</script>

<style scoped>
.app-boxed-layout {
  height: 100vh;
}
</style>