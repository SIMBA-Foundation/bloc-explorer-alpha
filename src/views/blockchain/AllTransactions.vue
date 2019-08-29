<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl py-0>
      <v-layout row wrap>
        <app-card :fullBlock="true" colClasses="xl12 lg12 md12 sm12 xs12">
          <v-data-table
            :headers="headers"
            :items="transactions"
            :pagination.sync="pagination"
            :total-items="totalTransactions"
            :loading="loading"
            :rows-per-page-items="[10,25,50]"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/transaction/' + props.item.hash}`"
                >{{ props.item.hash }}</v-btn>
              </td>
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/block/' + props.item.block_hash}`"
                >{{ props.item.block_hash }}</v-btn>
              </td>
              <td>{{ getDateDiff(props.item.timestamp) }}</td>
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/address/' + props.item.from}`"
                >{{ props.item.from }}</v-btn>
              </td>
              <td>
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/address/' + props.item.to}`"
                >{{ props.item.to }}</v-btn>
              </td>
              <td>{{ props.item.value }}</td>
              <td>
                <v-chip
							v-if="props.item.is_valid == 0"
							color="default"
							class="ml-0"
							label
							small
							>
							pending
							</v-chip>
              <v-chip
							v-if="props.item.is_valid >0 && props.item.comfirmed<6"
							color="warning"
							class="ml-0"
							label
							small
							>
							{{ props.item.comfirmed }} / 6
							</v-chip>
<v-chip
							v-if="props.item.is_valid >0 && props.item.comfirmed>5"
							color="success"
							text-color="white"
							class="ml-0"
							label
							small
							>
							comfirmed
							</v-chip>
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
      totalTransactions: 0,
      totalBlocks: 0,
      transactions: [],
      loading: false,
      pagination: {},
      headers: [
        {
          text: this.getTitle("message.txHash"),
          align: "left",
          sortable: false,
          value: "hash"
        },
        {
          text: this.getTitle("message.block_hash"),
          value: "block_hash",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.age"),
          value: "timestamp",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.from"),
          value: "from",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.to"),
          value: "to",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.value"),
          value: "value",
          align: "left",
          sortable: false
        },
        {
          text: this.getTitle("message.status"),
          value: "status",
          class: "oneline w-5"
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
        api.getTransactions(
          {
            pageNum: page,
            pageSize: rowsPerPage
          },
          res => {
            let items = res.rows;
            const total = res.count;
            this.loading = false;
            this.transactions = items;
            this.totalTransactions = total;
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