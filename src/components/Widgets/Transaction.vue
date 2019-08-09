<template>
  <app-card :fullBlock="true">
    <app-section-loader :status="loader"></app-section-loader>
    <div class="app-event-detail">
      <div class="event-tab-wrapper">
        <div class="event-heading-wrap white--text">
          <span class="font-12 fw-semi-bold">
            {{transactionHash}}
            <v-chip
							v-if="transactionDetail.is_valid == 0"
							color="default"
							class="ml-0"
							label
							small
							>
							pending
							</v-chip>
              <v-chip
							v-if="transactionDetail.is_valid >0 && transactionDetail.comfirmed<6"
							color="warning"
							class="ml-0"
							label
							small
							>
							{{ transactionDetail.comfirmed }} / 6
							</v-chip>
<v-chip
							v-if="transactionDetail.is_valid >0 && transactionDetail.comfirmed>5"
							color="success"
							text-color="white"
							class="ml-0"
							label
							small
							>
							comfirmed
							</v-chip>



          </span>
          <p></p>
          <ul class="list-unstyled">
            <li class="event-tab" @click="onTabChange(0)" :class="{'active': selectedTab === 0}">
              <a href="javascript:void(0)">{{$t('message.information')}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content-wrap">
        <v-list v-if="selectedTab === 0" class="block-detail list-aqua-ripple fs-12">
          <div layout wrap trending-block>
            <template v-for="(val,key) in transactionDetail">
              <template v-if="key == 'is_valid' || key=='comfirmed'">

              </template>
              <template v-else>
              <div class="d-flex" :key="key">
                <div class="flex xs3">{{getTitle('message.' + key)}}</div>
                <div class="flex xs8">
                  <template v-if="key == 'block_hash'">
                    <v-btn flat small :to="`${'/blockchain/block/' + val}`">{{val}}</v-btn>
                  </template>
                  <template v-else-if="key == 'from' || key == 'to'">
                    <v-btn flat small :to="`${'/blockchain/address/' + val}`">{{val}}</v-btn>
                  </template>
                  <template v-else>{{formatVal(key,val)}}</template>
                </div>
              </div>
              </template>
            </template>
          </div>
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
    this.transactionHash = params.hash;
    this.getTransaction(params.hash);
  },
  watch: {
    $route() {
      this.loader = true;
      const params = this.$route.params;
      this.transactionHash = params.hash;
      this.getTransaction(params.hash);
    }
  },
  data() {
    return {
      loader: true,
      transactionHash: "",
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
      transactionDetail: {},
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
    getTransaction(hash) {
      api.getTransaction(hash, transaction => {
        this.transactionDetail = transaction;
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

