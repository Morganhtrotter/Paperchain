<template>
  <section>
      <table class="table">
        <thead>
          <tr>
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
          <tr v-for="item in sortedItems" :key="item.isrc">
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
      <button id="prev" v-on:click="prevPage()">Previous Page</button>
      <button v-on:click="nextPage()">Next Page</button>
  </section>
</template>

<script>
//var startIndex = 0;
//var endIndex = 3;
export default {
  data() {
    return {
      items: [
        {metric_date: "2020-02-01", source: "SPOTIFY", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "AflxfywngxArJDbFA", asset_name: "JlYllyLaKlgaWMA", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "1", amount: "0.044865", per_unit_rate: "0.044865", currency: "AED"},
        {metric_date: "2020-01-01", source: "APPLE MUSIC", territory: "AE", metric_type: "SUBSCRIPTION AUDIO STREAM", isrc: "YuJVbzRLWXFIwsUKpNOg", asset_name: "tONGzSrarYCIJInpbyw", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "11", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-03-01", source: "YOUTUBE", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "XNXzmsaytXQOdHUSJcA", asset_name: "bkqqClplSpOGtg", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "14", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-02-01", source: "SPOTIFY", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "AlxfywngxArJDbFA", asset_name: "JlYllyLaKlgaWMA", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "1", amount: "0.044865", per_unit_rate: "0.044865", currency: "AED"},
        {metric_date: "2020-01-01", source: "APPLE MUSIC", territory: "AE", metric_type: "SUBSCRIPTION AUDIO STREAM", isrc: "YuJVbzRLWXrtIwsUNOg", asset_name: "tONGzSrarYCIJInpbyw", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "11", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-03-01", source: "YOUTUBE", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "XNXzmsaytXwdHUSJcA", asset_name: "bkqqClplSpOGtg", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "14", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-02-01", source: "SPOTIFY", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "Af11lxfywngxArJDbFA", asset_name: "JlYllyLaKlgaWMA", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "1", amount: "0.044865", per_unit_rate: "0.044865", currency: "AED"},
        {metric_date: "2020-01-01", source: "APPLE MUSIC", territory: "AE", metric_type: "SUBSCRIPTION AUDIO STREAM", isrc: "YuJbzRLWXFIreUKpNOg", asset_name: "tONGzSrarYCIJInpbyw", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "11", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-03-01", source: "YOUTUBE", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "XNXzmsaytXQqUSJcA", asset_name: "bkqqClplSpOGtg", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "14", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
      ],
      pageSize: 3,
      currentPage: 1,
      count: 1,
      lastSort: ""
    }
  },
  computed: {
    sortedItems: {
      get: function() {
        return this.items.filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) {
            return true;
          }
        });
      },

      set: function() { // Explicity define as setter to rid "Computed property was assigned but has no setter" warning
        return this.items.filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) {
            return true;
          }
        });
      }
    }
  },
  methods: {
    sort(attribute) {
      this.count = 1;
      function compareAscending(a, b) {
        if (a[attribute].toLowerCase() < b[attribute].toLowerCase()) {
          return -1;
        } else if (a[attribute].toLowerCase() > b[attribute].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      }

      function compareDescending(a, b) {
        if (a[attribute].toLowerCase() > b[attribute].toLowerCase()) {
          return -1;
        } else if (a[attribute].toLowerCase() < b[attribute].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      }

      if (this.lastSort === attribute) { // If user clicks on same header twice, sort by descending order
        this.items.sort(compareDescending);
        this.lastSort = "";
      } else { // Sort by ascending order
        this.items.sort(compareAscending);
        this.lastSort = attribute;
      }
      this.sortedItems = this.items;
      return this.items;
    },
    nextPage() {
      if ((this.currentPage * this.pageSize) < this.items.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style>
</style> 