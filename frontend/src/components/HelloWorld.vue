
<script>
export default {
  data() {
    return {
      inshore: 0,
      offshore: 0,
      records: [],
      buypots: 0,
      pots:6,
      tomorrow: new Date('03/01/2015'),
      money: 0
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
     

      this.tomorrow.setDate(this.tomorrow.getDate()+1);
      const input = data;
      let randWeather = Math.floor(Math.random() * 6) + 1;
      if(this.tomorrow.getDay() === 6) {
          this.tomorrow.setDate(this.tomorrow.getDate()+2);
          this.money = this.money - 80;
      }
      let weather = "good";
      let inshoretotal = 0;
      let offshoretotal = 0;
      let pots=this.pots;
      if (randWeather === 6) {
          weather = "bad";
          inshoretotal = +input.inshore * this.inshore;
          pots = pots - +input.offshore;

      } else {
          inshoretotal = +input.inshore * + this.inshore;
          offshoretotal = +input.offshore * + this.offshore;
      }

      const costofadditionalpots = +input.additionalpots * 6;

      this.money = this.money + inshoretotal + offshoretotal - costofadditionalpots;
      this.pots = this.pots + +input.additionalpots;
      let result = {
          money: +(this.money),
          pots: this.pots,
          randWeather,
          weather,
          day: this.tomorrow.toLocaleString(
              'default', {weekday: 'long'}
            )
      };
      console.log(result)

      this.records.push(result)
      this.maxpots = this.pots;
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
