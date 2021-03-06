<template>
  <section>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" v-on:click="sort('metric_date')">Date</th>
            <th scope="col" v-on:click="sort('source')">Source</th>
            <th scope="col" v-on:click="sort('territory')">Territory</th>
            <th scope="col" v-on:click="sort('metric_type')">Type</th>
            <th scope="col" v-on:click="sort('isrc')">Code</th>
            <th scope="col" v-on:click="sort('asset_name')">Song</th>
            <th scope="col" v-on:click="sort('party_name')">Artist</th>
            <th scope="col" v-on:click="sort('label_name')">Label</th>
            <th scope="col" v-on:click="sort('units')">Count</th>
            <th scope="col" v-on:click="sort('amount')">Revenue</th>
            <th scope="col" v-on:click="sort('per_unit_rate')">Rate</th>
            <th scope="col" v-on:click="sort('currency')">Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.isrc">
            <th scope="row">{{ getCount() }}</th>
            <td>{{ item.metric_date}}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.territory }}</td>
            <td>{{ item.metric_type}}</td>
            <td>{{ item.isrc }}</td>
            <td>{{ item.asset_name }}</td>
            <td>{{ item.party_name }}</td>
            <td>{{ item.label_name }}</td>
            <td>{{ item.units }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.per_unit_rate }}</td>
            <td>{{ item.currency }}</td>
          </tr>
        </tbody>
      </table>
  </section>
</template>

<script>
var count = 1;
export default {
  data() {
    return {
      items: [
        {metric_date: "2020-02-01", source: "SPOTIFY", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "AflxfywngxArJDbFA", asset_name: "JlYllyLaKlgaWMA", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "1", amount: "0.044865", per_unit_rate: "0.044865", currency: "AED"},
        {metric_date: "2020-01-01", source: "APPLE MUSIC", territory: "AE", metric_type: "SUBSCRIPTION AUDIO STREAM", isrc: "YuJVbzRLWXFIwsUKpNOg", asset_name: "tONGzSrarYCIJInpbyw", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "11", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-03-01", source: "YOUTUBE", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "XNXzmsaytXQOdHUSJcA", asset_name: "bkqqClplSpOGtg", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "14", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
      ]
    }
  },
  methods: {
    getCount() {
      return count++;
    },
    sort(attribute) {
      count = 1;

      function compare(a, b) {
        if (a[attribute] < b[attribute]) {
          return -1;
        } else if (a[attribute] > b[attribute]) {
          return 1;
        } else {
          return 0;
        }
      }

      return this.items.sort(compare);
    }
  }
};
</script>

<style>
</style> 