<!-- Header Structure -->
<template>
	<div>
		<v-navigation-drawer
			v-if="!horizontal"
			app
			fixed
			v-model="drawer"
			:mini-variant.sync="collapseSidebar"
			mini-variant-width="70"
			:width="250"
			class="Rock-sidebar"
		>
			<!-- App Sidebar -->
			<app-sidebar></app-sidebar>
		</v-navigation-drawer>
		<v-toolbar 
			class="Rock-toolbar"
			app
			:color="activeHeaderFilter.class"
			fixed
		>	
			<div class="d-custom-flex align-items-center navbar-left">
				<div v-if="!horizontal">
					<v-toolbar-side-icon icon large @click.stop="drawer = !drawer" class="v-step-0"></v-toolbar-side-icon>
				</div>
				<div class="site-logo-wrap d-custom-flex ml-0 align-items-center" v-else>
					<router-link to="/Home" class="grayish-blue site-logo-img">
						<img src="/static/img/site-logo.png" alt="Blockcloud" height="36">
					</router-link>
				</div>
				<v-text-field flat solo prepend-icon="search" :placeholder="$t('message.search')" class="search-bar"></v-text-field>
			</div>
			<div class="navbar-right">
				<v-btn icon large @click="toggleFullScreen" class="full-screen ma-0">
					<v-icon color="grey">fullscreen</v-icon>
				</v-btn>
				
				<!-- <language-provider></language-provider> -->
			</div>
		</v-toolbar>
	</div>
</template>

<script>
import Sidebar from "../Sidebar/Sidebar.vue";
import screenfull from "screenfull";
import LanguageProvider from "./LanguageProvider";
import { getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";

export default {
  props: {
    horizontal: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      collapsed: false, // collapse sidebar
      drawer: null, // sidebar drawer default true
      sidebarImages: "", // sidebar background images
      enableDefaultSidebar: false
    };
  },
  computed: {
    ...mapGetters([
      "backgroundImage",
      "backgroundImage",
      "selectedSidebarBgImage",
      "darkMode",
      "collapseSidebar",
      "activeHeaderFilter"
    ])
  },
  methods: {
    // toggle full screen method
    toggleFullScreen() {
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    },
    getMenuLink(link) {
      return link;
    }
  },
  components: {
    appSidebar: Sidebar,
    LanguageProvider
  }
};
</script>
