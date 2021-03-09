<template>
  <section>
      <input v-model="csvPath" id="csvPath" placeholder="/path">
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
      <button v-on:click="mounted()">Load CSV</button>
  </section>
</template>

<script>
import * as d3 from "d3";
//var startIndex = 0;
//var endIndex = 3;
export default {
  data() {
    return {
      items: [],
      pageSize: 9,
      currentPage: 1,
      count: 1,
      lastSort: "",
      csvPath: ""
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
    },
    async mounted() {
      d3.dsv(";", this.csvPath, function(d) {
        return {
          metric_date: d.metric_date,
          source: d.source,
          territory: d.territory,
          metric_type: d.metric_type,
          isrc: d.isrc,
          asset_name: d.asset_name,
          party_name: d.party_name,
          label_name: d.label_name,
          units: d.units,
          amount: d.amount,
          per_unit_rate: d.per_unit_rate,
          currency: d.currency
        };
      }).then((data) => {
        console.log(data);
        console.log("Here");
        this.items = data;
      });
      console.log("here2");
    }
  }
};
</script>

<style>
</style> 