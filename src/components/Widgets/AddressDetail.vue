<template>
  <app-card :fullBlock="true">
    <app-section-loader :status="loader"></app-section-loader>
    <div class="app-event-detail">
      <div class="event-tab-wrapper">
        <div class="event-heading-wrap white--text">
          <span class="font-12 fw-semi-bold">{{addressHash}}</span>
          <p></p>
          <ul class="list-unstyled">
            <li class="event-tab" @click="onTabChange(0)" :class="{'active': selectedTab === 0}">
              <a href="javascript:void(0)">{{$t('message.transactions')}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-wrap">
        <v-list two-line subheader>
          <v-data-table
            :headers="headers"
            :items="addressDetail"
            class="table-responsive"
            item-key="name"
          >
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">{{ props.header.text }}</span>
                <span>{{ props.header.text }}</span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td class="oneline w-25">
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/transaction/' + props.item.hash}`"
                >{{ props.item.hash }}</v-btn>
              </td>
              <td class="oneline w-5">{{ formatVal('timestamp',props.item.timestamp) }}</td>
              <td class="oneline w-25">
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/address/' + props.item.from}`"
                >{{ props.item.from }}</v-btn>
              </td>
              <td class="oneline w-25">
                <v-btn
                  flat
                  small
                  :to="`${'/blockchain/address/' + props.item.to}`"
                >{{ props.item.to }}</v-btn>
              </td>
              <td class="oneline w-5">{{ props.item.value }}</td>
              <td class="oneline w-5"><v-chip
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
							</v-chip></td>
            </template>
          </v-data-table>
        </v-list>
      </div>
    </div>
  </app-card>
</template>

<script>
import api from "Api";
import { getDateDiff } from "Helpers/helpers";
export default {
  mounted() {
    const params = this.$route.params;
    this.addressHash = params.hash;
    this.getAddress(params.hash);
  },
  watch: {
    $route() {
      this.loader = true;
      const params = this.$route.params;
      this.addressHash = params.hash;
      this.getAddress(params.hash);
    }
  },
  data() {
    return {
      loader: true,
      addressHash: "",
      headers: [
        {
          text: this.getTitle("message.txHash"),
          align: "left",
          sortable: false,
          value: "hash",
          class: "oneline w-25"
        },
        {
          text: this.getTitle("message.age"),
          align: "left",
          sortable: false,
          value: "timestamp",
          class: "oneline w-5"
        },
        {
          text: this.getTitle("message.from"),
          align: "left",
          sortable: false,
          value: "from",
          class: "oneline w-25"
        },
        {
          text: this.getTitle("message.to"),
          sortable: false,
          value: "to",
          class: "oneline w-25"
        },
        {
          text: this.getTitle("message.value"),
          value: "value",
          class: "oneline w-5"
        },
        {
          text: this.getTitle("message.status"),
          value: "status",
          class: "oneline w-5"
        }
      ],
      addressDetail: [],
      selectedTab: 0,
      settings: {
        maxScrollbarLength: 260
      }
    };
  },
  methods: {
    onTabChange(value) {
      this.selectedTab = value;
    },
    getTitle(key) {
      return this.$i18n.t(key);
    },
    getAddress(hash) {
      api.getAddress(hash, address => {
        this.addressDetail = address;
        this.loader = false;
      });
    },
    formatVal(key, val) {
      switch (key) {
        case "timestamp":
          return getDateDiff(val);
          break;
        case "transactions":
          return val.length + " transactions in this Block";
          break;
        case "size":
          return val + " byte";
          break;
        default:
          return val;
      }
    }
  }
};
</script>

