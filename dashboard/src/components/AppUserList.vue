<template>
  <section>
    <slot name="title">Data</slot>
      <ul class="userlist">
        <li>
          <div>
            Date, Source, Territory, Type, Code, Song, Artist, Label, Count, Revenue, Rate, Currency
          </div>
        </li>
        <li v-for="item in items" :key="item.isrc">
          <slot name="listitem" :user="item">
            <div>
              <div>
                <div>{{ item.metric_date }}, {{ item.source }}</div>
              </div>
            </div>
          </slot>
        </li>
      </ul>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.isrc">
            <th scope="row">1</th>
            <td>{{ item.metric_date}}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.territory }}</td>
          </tr>
        </tbody>
      </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {metric_date: "2020-02-01", source: "APPLE MUSIC", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "AflxfywngxArJDbFA", asset_name: "JlYllyLaKlgaWMA", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "1", amount: "0.044865", per_unit_rate: "0.044865", currency: "AED"},
        {metric_date: "2020-02-01", source: "SPOTIFY", territory: "AE", metric_type: "SUBSCRIPTION AUDIO STREAM", isrc: "YuJVbzRLWXFIwsUKpNOg", asset_name: "tONGzSrarYCIJInpbyw", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "11", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
        {metric_date: "2020-02-01", source: "YOUTUBE", territory: "AE", metric_type: "PROMOTIONAL AUDIO STREAM", isrc: "XNXzmsaytXQOdHUSJcA", asset_name: "bkqqClplSpOGtg", party_name: "ZMAGDgYAobBgraKgkiQ", label_name: "PAPER RECORDS", units: "14", amount: "0.028289", per_unit_rate: "0.044865", currency: "USD"},
      ]
    }
  }
};
</script>

<style>
.userlist {
  margin: 10px;
}
.userlist img {
  border-radius: 50%;
  margin-right: 1rem;
}
.userlist li + li {
  margin-top: 10px;
}
.userlist li > div {
  display: flex;
  align-items: center;
}
.userlist li div div {
  flex: 1;
}
</style> 