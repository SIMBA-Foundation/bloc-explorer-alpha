<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="xl12 lg12 md12 sm12 xs12">
          <v-data-table
            :headers="headers"
            :items="blocks"
            :pagination.sync="pagination"
            :total-items="totalBlocks"
            :loading="loading"
            :rows-per-page-items="[10,25,50]"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/block/' + props.item.hash}`"
                >{{ props.item.hash }}</v-btn>
              </td>
              <td>{{ getDateDiff(props.item.timestamp) }}</td>
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/block/' + props.item.hash}`"
                >{{ props.item.txCount }}</v-btn>
              </td>
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/block/' + props.item.miner}`"
                >{{ props.item.miner }}</v-btn>
              </td>
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
      totalBlocks: 0,
      blocks: [],
      loading: false,
      pagination: {},
      headers: [
        {
          text: this.getTitle("message.block_hash"),
          align: "left",
          sortable: false,
          value: "hash"
        },
        {
          text: this.getTitle("message.age"),
          value: "timestamp",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.txCount"),
          value: "txCount",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.miner"),
          value: "miner",
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
        api.getBlocks(
          {
            pageNum: page,
            pageSize: rowsPerPage
          },
          res => {
            let items = res.rows;
            const total = res.count;
            this.loading = false;
            this.blocks = items;
            this.totalBlocks = total;
          }
        );
      }
    },
    getDateDiff(val) {
      return getDateDiff(val);
    }
  }
};
</script>