<template>
  <section>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Source</th>
            <th scope="col">Territory</th>
            <th scope="col">Type</th>
            <th scope="col">Code</th>
            <th scope="col">Song</th>
            <th scope="col">Artist</th>
            <th scope="col">Label</th>
            <th scope="col">Count</th>
            <th scope="col">Revenue</th>
            <th scope="col">Rate</th>
            <th scope="col">Currency</th>
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
      <button v-on:click="sort()">Sort by Source</button>
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
    sort() {
      count = 1;

      function compare(a, b) {
        if (a.source < b.source) {
          return -1;
        } else if (a.source > b.source) {
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