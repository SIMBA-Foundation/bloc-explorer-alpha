<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="xl12 lg12 md12 sm12 xs12">
          <v-data-table
            :headers="headers"
            :items="levels"
            :pagination.sync="pagination"
            :total-items="totalLevels"
            :loading="loading"
            :rows-per-page-items="[10,25,50]"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.level_number }}</td>
              <td>{{ props.item.blocks_count }}</td>
            </template>
          </v-data-table>
        </app-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import api from "Api";
import { getDateDiff } from "Helpers/helpers";
export default {
  data() {
    return {
      totalLevels: 0,
      levels: [],
      loading: false,
      pagination: {},
      headers: [
        {
          text: this.getTitle("message.levelNumber"),
          align: "left",
          sortable: false,
          value: "level_number"
        },
        {
          text: this.getTitle("message.blockCount"),
          align: "left",
          sortable: false
        }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getTitle(key) {
      return this.$i18n.t(key);
    },
    getData() {
      if (!this.loading) {
        this.loading = true;
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        api.getLevels(
          {
            pageNum: page,
            pageSize: rowsPerPage
          },
          res => {
            let items = res.rows;
            const total = res.count.length;
            this.loading = false;
            this.levels = items;
            this.totalLevels = total;
          }
        );
      }
    }
  }
};
</script>