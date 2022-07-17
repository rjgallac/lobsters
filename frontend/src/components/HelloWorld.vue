
<script>
export default {
  data() {
    return {
      inshore: 0,
      offshore: 0,
      records: [],
      buypots: 0,
      maxpots:6
    }
  },
  methods: {
    inshoreInput(e) {
      this.inshore = +e.target.value
    },
    offshoreInput(e) {
      this.offshore = +e.target.value
    },
    buypotsInput(e) {
      this.buypots = +e.target.value
    },
    checkForm(e) {
      e.preventDefault();
      console.log(this.inshore)
      console.log(this.offshore)
      console.log(this.maxpots)
      if((this.inshore + this.offshore) > this.maxpots) {
        console.log("HERE")
        return false;
      }

      let data = {
        inshore: this.inshore,
        offshore: this.offshore,
        "additionalpots": this.buypots
      }
      fetch("http://127.0.0.1:3000/",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.records.push(data)
        this.maxpots = data.pots;
        }
      );
    }
  }
}
</script>

<template>
{{max}}
  <table border=1>
    <tr><th>Day</th><th>pots</th><th>dice</th><th>weather</th><th>money</th></tr>
    <tr v-for="record in records">
      <td>{{record.day}}</td><td>{{record.pots}}</td><td>{{record.randWeather}}</td><td>{{record.weather}}</td><td>{{record.money}}</td>
    </tr>
  </table>
  <br />
  <form @submit="checkForm" >
    inshore <input type="number" :min="1" :max="maxpots-offshore" :value="inshore" @input="inshoreInput" placeholder="Type here" >
    <br />
    offshore <input type="number" :min="0" :max="maxpots-inshore" :value="offshore" @input="offshoreInput" placeholder="Type here" >
    <br />
    buy pots <input :value="buypots" @input="buypotsInput" placeholder="Type here" >
    <br />
    <input type="submit" value="Submit" />
  </form>
</template>
