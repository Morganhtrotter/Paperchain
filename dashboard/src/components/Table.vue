<template>
  <section>
      <input v-if="preLoad" v-model="csvPath" id="csvPath" placeholder="path from ./src/components">
      <button id="loadCSV" v-if="preLoad" v-on:click="mounted()">Load CSV</button>
      <div v-else>
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
        <p>{{ currentPage }}</p>
        <button v-on:click="nextPage()">Next Page</button>
      </div>
  </section>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      items: [],
      pageSize: 9,
      currentPage: 1,
      lastSort: "",
      csvPath: "",
      preLoad: true
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

      function compareAscendingNum(a, b) {
        if (parseFloat(a[attribute]) < parseFloat(b[attribute])) {
          return -1;
        } else if (parseFloat(a[attribute]) > parseFloat(b[attribute])) {
          return 1;
        } else {
          return 0;
        }
      }

      function compareDescendingNum(a, b) {
        if (parseFloat(a[attribute]) > parseFloat(b[attribute])) {
          return -1;
        } else if (parseFloat(a[attribute]) < parseFloat(b[attribute])) {
          return 1;
        } else {
          return 0;
        }
      }

      // Alphabetical Sort
      if (attribute !== 'metrc_date' && attribute !== 'units' && attribute !== 'amount' && attribute !== 'per_unit_rate') {
        if (this.lastSort === attribute) { // If user clicks on same header twice, sort by descending order
          this.items.sort(compareDescending);
          this.lastSort = "";
        } else { // Sort by ascending order
          this.items.sort(compareAscending);
          this.lastSort = attribute;
        }
      } else { // Numerical Sort
        console.log("page size: " + this.pageSize);
        console.log("current page: " + this.currentPage);
        if (this.lastSort === attribute) { // If user clicks on same header twice, sort by descending order
          this.items.sort(compareDescendingNum);
          this.lastSort = "";
        } else { // Sort by ascending order
          this.items.sort(compareAscendingNum);
          this.lastSort = attribute;
        }
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
      var sourceArray = ["APPLE MUSIC"];
      var appleTotalRev = 0;
      var spotifyTotalRev = 0;
      var deezerTotalRev = 0;
      var googleTotalRev = 0;
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
        this.items = data;
        this.preLoad = false;
        data.forEach(function(d) {
          if (d.source === "APPLE MUSIC") {
            appleTotalRev += parseFloat(d.amount);
          } else if (d.source === "SPOTIFY") {
            spotifyTotalRev += parseFloat(d.amount);
          } else if (d.source === "DEEZER") {
            deezerTotalRev += parseFloat(d.amount);
          } else if (d.source === "GOOGLE") {
            googleTotalRev += parseFloat(d.amount);
          }
          var unique = true;
          // For loop to find all the unique sources in data set
          for (var i = 0; i < sourceArray.length; i++) {
            if (d.source === sourceArray[i]) {
              unique = false;
              break;
            }
          }
          if (unique === true) {
            sourceArray.push(d.source);
          }
        });

        // Variables for bar chart
        var width = 500;
        var height = 250;
        var margin = {top: 20, right: 20, bottom: 70, left: 40}

        // Main svg for bar chart
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add bars to chart
        svg.selectAll("bar")
            .data([appleTotalRev, spotifyTotalRev, deezerTotalRev, googleTotalRev])
            .enter().append("rect")
            .style("fill", "#494949")
            .attr("x", function(d, i) { return 1 * i * 105})
            .attr("width", 100)
            .attr("y", function(d) {return height - parseInt(d / 100) - margin.top})
            .attr("height", function(d) {return parseInt(d / 100)})

        // Chart title
        svg.append("text")
            .html("Total Revenue By Source")
            .attr("x", 150)
            .attr("y", 0)

        // Apple Bar value text
        svg.append("text")
            .html(Math.round(appleTotalRev))
            .attr("x", 30)
            .attr("y", height - appleTotalRev / 100 - margin.top - 5)

        // Apple Bar Title
        svg.append("text")
            .html("Apple Music:")
            .attr("x", 10)
            .attr("y", height - appleTotalRev / 100 - margin.top - 25)

        // Spotify Bar value text
        svg.append("text")
            .html(Math.round(spotifyTotalRev))
            .attr("x", 140)
            .attr("y", height - spotifyTotalRev / 100 - margin.top - 5)

        // Spotify Bar Title
        svg.append("text")
            .html("Spotify:")
            .attr("x", 135)
            .attr("y", height - spotifyTotalRev / 100 - margin.top - 25)

        // Deezer Bar value text
        svg.append("text")
            .html(Math.round(deezerTotalRev))
            .attr("x", 240)
            .attr("y", height - deezerTotalRev / 100 - margin.top - 5)

        // Deezer Bar Title
        svg.append("text")
            .html("Deezer:")
            .attr("x", 235)
            .attr("y", height - deezerTotalRev / 100 - margin.top - 25)

        // Google Bar value text
        svg.append("text")
            .html(Math.round(googleTotalRev))
            .attr("x", 350)
            .attr("y", height - googleTotalRev / 100 - margin.top - 5)

        // Google Bar Title
        svg.append("text")
            .html("Google:")
            .attr("x", 340)
            .attr("y", height - googleTotalRev / 100 - margin.top - 25)
      });
    }
  }
};
</script>

<style>
</style> 