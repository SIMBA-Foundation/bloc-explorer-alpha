<template>
  <div class="horizontal-menu">
    <ul class="list-unstyled nav">
      <li
        v-for="(category, key) in menus"
        :key="key"
        :Class="category.active ? 'nav-item nav-item-active' : 'nav-item'"
      >
        <template v-if="category.items !== null">
          <a href="javascript:void(0);" class="nav-link">
            <i class="zmdi" :class="category.action"></i>
            {{ $t(category.title) }}
          </a>
          <ul class="sub-menu list-unstyled">
            <template v-for="subMenu in category.items">
              <li :Class="subMenu.active ? 'nav-item active' : 'nav-item'" :key="subMenu.title">
                <router-link
                  :to="!subMenu.exact ? `/${getCurrentAppLayoutHandler() + subMenu.path}` : subMenu.path"
                  class="nav-link"
                >{{$t(subMenu.title)}}</router-link>
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <router-link
            :to="!category.exact ? `/${getCurrentAppLayoutHandler() + category.path}` : category.path"
            class="nav-link no-arrow"
          >
            <i :class="categories[key]"></i>
            <span class="menu-title">{{$t(key)}}</span>
          </router-link>
        </template>
      </li>
    </ul>
    <div class="ham-menu-sm d-none">
      <v-btn flat icon class="my-1 mx-3" @click="toggleHorizontalLayoutSidebar">
        <v-icon class="grey--text">menu</v-icon>
      </v-btn>
    </div>
    <div>
      <div class="search-form">
        <v-text-field
          flat
          solo
          prepend-icon="search"
          @keyup.enter="onClickSearch"
          :placeholder="$t('message.search')"
          v-model="keyword"
          class="search-bar fs-12"
          ref="search"
        ></v-text-field>
        <div class="mobile-search d-none">
          <v-btn flat small icon class="mobile-search-btn my-1 mx-3" @click="toggleSearchForm">
            <v-icon class="grey--text font-md">search1</v-icon>
          </v-btn>
        </div>
      </div>
      <mobile-search-form name="search"></mobile-search-form>
    </div>
    <div></div>
  </div>
</template>

<script>
import { getCurrentAppLayout } from "Helpers/helpers";
import api from "Api";
import { mapGetters } from "vuex";
import Sidebar from "../Sidebar/Sidebar.vue";
import MobileSearchForm from "../Header/MobileSearchForm.vue";
export default {
  data() {
    return {
      keyword: "",
      categories: {
        "message.home": "zmdi zmdi-home",
        "message.blockchain": "zmdi zmdi-widgets"
      }
    };
  },
  components: {
    MobileSearchForm
  },
  computed: {
    ...mapGetters(["menus"])
  },
  methods: {
    menuActive(isActive) {
      return isActive ? "active" : "";
    },
    toggleHorizontalLayoutSidebar() {
      this.$store.dispatch("toggleHorizontalLayoutSidebar", true);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
    toggleSearchForm() {
      this.$store.dispatch("toggleSearchForm");
    },
    onClickSearch() {
      if (this.keyword != "") {
        api.search(this.keyword, res => {
          if (res) {
            var redirect = "";
            for (let key in res) {
              if (Array.isArray(res[key])) {
                if (res[key].length > 0) {
                  redirect = "/blockchain/address/";
                }
              } else {
                if (res[key]) {
                  redirect = "/blockchain/" + key + "/";
                }
              }
            }

            redirect != "" && this.$router.push(redirect + this.keyword);
          }
        });
      }
    }
  },
  mounted() {
    const mainMenu = document.getElementsByClassName("nav-item");
    for (let i = 0; i < mainMenu.length; i++) {
      mainMenu[i].onclick = function() {
        for (let j = 0; j < mainMenu.length; j++) {
          if (mainMenu[j].classList.contains("nav-item-active")) {
            mainMenu[j].classList.remove("nav-item-active");
          }
        }
        this.classList.toggle("nav-item-active");
      };
    }
  }
};
</script>