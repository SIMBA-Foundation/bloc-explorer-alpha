<!-- Side Structure -->
<template>
  <div class="sidebar" :class="sidebarSelectedFilter.class">
    <vue-perfect-scrollbar class="scroll-area" :settings="settings">
      <v-toolbar flat class="transparent scroll-area navigation">
        <v-list>
          <app-logo></app-logo>
          <template v-for="(category, key) in menus">
            <div :key="key">
              <template v-if="category.items !== null">
                <v-list-group
                  :key="category.title"
                  prepend-icon="arrow_right"
                  append-icon
                  no-action
                  v-model="category.active"
                >
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <i class="mr-2 zmdi" :class="category.action"></i>
                        <span>{{ textTruncate($t(category.title)) }}</span>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile
                    v-for="subItem in category.items"
                    v-bind:key="subItem.title"
                    v-if="subItem !== null"
                    :to="!subItem.exact ? `/${getCurrentAppLayoutHandler() + subItem.path}` : subItem.path"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ textTruncate($t(subItem.title)) }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </template>
              <template v-else>
                <v-list-group
                  :key="category.title"
                  prepend-icon="arrow_right"
                  append-icon
                  no-action
                  v-model="category.active"
                >
                  <v-list-tile
                    slot="activator"
                    :to="!category.exact ? `/${getCurrentAppLayoutHandler() + category.path}` : category.path"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <i class="mr-2 zmdi" :class="category.action"></i>
                        <span>{{ textTruncate($t(category.title)) }}</span>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </template>
            </div>
          </template>
        </v-list>
      </v-toolbar>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { textTruncate, getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";
import AppLogo from "Components/AppLogo/AppLogo";

export default {
  data() {
    return {
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
    AppLogo
  },
  computed: {
    ...mapGetters(["sidebarSelectedFilter", "menus"])
  },
  mounted() {
    this.$store.dispatch("setActiveMenuGroup", this.$router);
  },
  methods: {
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    }
  }
};
</script>
