<template>
  <app-card :fullBlock="true">
    <app-section-loader :status="loader"></app-section-loader>
    <div class="app-event-detail">
      <div class="event-tab-wrapper">
        <div class="event-heading-wrap white--text">
          <span class="font-12 fw-semi-bold">{{blockdetail.hash}}</span>
          <p></p>
          <ul class="list-unstyled">
            <li class="event-tab" @click="onTabChange(0)" :class="{'active': selectedTab === 0}">
              <a href="javascript:void(0)">{{$t('message.information')}}</a>
            </li>
            <li class="event-tab" @click="onTabChange(1)" :class="{'active': selectedTab === 1}">
              <a href="javascript:void(0)">{{$t('message.transactions')}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-wrap fs-12">
        <v-list v-if="selectedTab === 0" class="block-detail list-aqua-ripple">
          <div layout wrap trending-block>
            <template v-for="(val,key) in blockdetail">
              <div class="d-flex" :key="key">
                <div class="flex xs3">{{getTitle('message.' + key)}}</div>
                <div class="flex xs8">
                  <template v-if="key == 'previousLevelHashes'">
                    <template v-for="(hash, vindex) in val">
                      <p :key="vindex">
                        <v-btn
                          flat
                          small
                          :to="`${'/blockchain/block/' + hash}`"
                        >{{hash}}</v-btn>
                      </p>
                    </template>
                  </template>
                  <template v-else>{{formatVal(key,val)}}</template>
                </div>
              </div>
            </template>
          </div>
        </v-list>
        <v-list two-line v-else subheader>
          <v-data-table
            :headers="headers"
            :items="blockdetail.transactions"
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
                >{{ props.item.hash }}</v-btn>
              </td>
              <td class="oneline w-5">{{ formatVal('timestamp',props.item.timestamp) }}</td>
              <td class="oneline w-25">
                <v-btn
                  flat
                  small
                >{{ props.item.from }}</v-btn>
              </td>
              <td class="oneline w-25">
                <v-btn
                  flat
                  small
                >{{ props.item.to }}</v-btn>
              </td>
              <td class="oneline w-5">{{ props.item.value }}</td>
              <td class="oneline w-5">
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
    this.getBlock(params.hash);
  },
  watch: {
    $route() {
      this.loader = true;
      const params = this.$route.params;
      this.getBlock(params.hash);
    }
  },
  data() {
    return {
      loader: true,
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
      blockdetail: {
        hash: "",
        transactions: []
      },
      selectedTab: 0,
      settings: {
        maxScrollbarLength: 260
      },
      selectedEventForReschedule: {
        key: "",
        data: null
      }
    };
  },
  methods: {
    onTabChange(value) {
      this.selectedTab = value;
    },
    onDeleteEvent(eventName, key) {
      let indexOfEvent = this.events[key].indexOf(eventName);
      this.events[key].splice(indexOfEvent, 1);
    },
    onRescheduleEvent(eventName, key) {
      console.log(eventName + key);
    },
    getTitle(key) {
      return this.$i18n.t(key);
    },
    getBlock(hash) {
      api.getBlock(hash, block => {
        this.blockdetail = block;
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
          break;
        default:
          return val;
      }
    }
  }
};
</script>

