<template>
  <b-container fluid>
    <b-row style="padding-top:10px">
      <b-col align="left">
        <b-dropdown text="Input">
          <b-dropdown-item v-for="inp in inputs" @click="input=inp.value; changeInput(inp.value);">{{inp.display}}</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col>
        {{input}}
      </b-col>
      <b-col align="right">
        <b-dropdown text="Quick">
          <b-dropdown-item v-for="qLaunch in qLaunches" @click="input=qLaunch.value; changeInput(qLaunch.display);">{{qLaunch.display}}</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row style="padding-top:15px">
      <b-col align="left">
        Volume
      </b-col>
      <b-col align="right" v-if="input=='TV'">
        Channels
      </b-col>
    </b-row>
    <b-row>
      <b-col align="left">
        <b-form-select v-model="volInterval" :options="volOptions"/>
      </b-col>
      <b-col align="right">
        <br>
      </b-col>
    </b-row>
    <b-row>
      <b-col align="left"  style="padding-top:10px">
        <b-button @click="updateVolume(1)"><v-icon name="arrow-up"/></b-button>
      </b-col>
      <b-col align="right" v-if="input=='TV'">
        <b-button @click="modifyTv('ChannelUp', null)"><v-icon name="arrow-up"/></b-button>
      </b-col>
    </b-row>
    <b-row style="padding-top:15px">
      <b-col align="left">
        <b-button @click="updateVolume(-1)"><v-icon name="arrow-down"/></b-button>
      </b-col>
      <b-col align="right" v-if="input=='TV'">
        <b-button @click="modifyTv('ChannelDown', null)"><v-icon name="arrow-down"/></b-button>
      </b-col>
    </b-row>

    <b-row style="padding-top:50px" v-if="input=='Roku'">
      <b-col align="left">
        <b-button @click="modifyRoku('back', null)"><v-icon name="arrow-left"/></b-button>
      </b-col>
      <b-col align="right">
        <b-button @click="modifyRoku('home', null)"><v-icon name="home"/></b-button>
      </b-col>
    </b-row>
  <b-row style="padding-top:10px" v-if="input=='Roku'">
    <b-col align="middle">
      <b-button @click="modifyRoku('up', '1')"><v-icon name="arrow-up"/></b-button>
    </b-col>
  </b-row>
  <b-row style="padding-top:20px" v-if="input=='Roku'">
    <b-col align="middle">
      <span>
        <b-button @click="modifyRoku('left', '1')"><v-icon name="arrow-left"/></b-button>
      </span>
      <span style="padding-right:20px; padding-left:20px">
        <b-button @click="modifyRoku('select', null)">Enter</b-button>
      </span>
      <span>
        <b-button @click="modifyRoku('right', '1')"><v-icon name="arrow-right"/></b-button>
      </span>
    </b-col>
  </b-row>
  <b-row style="padding-top:20px" v-if="input=='Roku'">
    <b-col align="middle">
      <b-button @click="modifyRoku('down', '1')"><v-icon name="arrow-down"/></b-button>
    </b-col>
  </b-row>
  <b-row style="padding-top:30px" v-if="input=='Roku'">
    <b-col align="middle">
      <span>
        <b-button @click="modifyRoku('reverse', null)"><v-icon name="backward"/></b-button>
      </span>
      <span style="padding-right:20px; padding-left:20px">
        <b-button @click="modifyRoku('play', null)"><v-icon name="play"/></b-button>
      </span>
      <span>
        <b-button @click="modifyRoku('forward', null)"><v-icon name="forward"/></b-button>
      </span>
    </b-col>
  </b-row>

</b-container>
</template>

<script>
import axios from 'axios';
let frTVActionHost = "http://192.168.72.20:8080/tv/actions";
let frRokuActionHost = "http://192.168.72.110:8080/systems/family-room/actions";
let frReceiverActionHost = "http://192.168.72.110:8081/receiver/";
export default
{
  name: 'FamilyRoom',
  data ()
  {
    return {
      volInterval: 5,
      volume: -30,
      volOptions: [1,5,10],
      input: null,
      inputs: [{display:"Off", value: null},{display:"TV", value: "TV"},{display:"Roku", value: "Roku"},{display:"PS3", value: "PS3"}, {display:"PS4", value: "PS4"},{display:"WII U", value: "WII U"},{display:"Retro PI", value: "Retro PI"},{display:"Xbox", value: "Xbox"},{display:"Switch", value: "Switch"}],
      qLaunches: [{display:"Netflix", value: "Roku"},{display:"Prime", value: "Roku"},{display:"Plex", value: "Roku"},{display:"Crunchy Roll", value: "Roku"}, {display: "DC Universe", value: "Roku"},{display:"Daily Burn", value: "Roku"}]
    }
  },
  methods:
  {
    async executeAction(host, command, value){
      let body = {'command': command};
      if(value){
        body['value'] = value;
      }
      axios.post(host, body);
    },
    updateVolume(value){
      this.volume = this.volume  + (value  * this.volInterval);
      let receiverPayload = {volume: this.volume};
      axios.put(frReceiverActionHost, receiverPayload);
    },
    modifyTv(command, value){
      this.executeAction(frTVActionHost, command, value);
    },
    modifyRoku(command, value){
      this.executeAction(frRokuActionHost, command, value);
    },
    changeInput(inputType){
      this.volume = -30;
      let receiverPayload = {on:true, volume: this.volume};
      let that = this;

      if(!inputType){
        receiverPayload['on'] = false;
        this.executeAction(frTVActionHost, "PowerOff", null);
        axios.put(frReceiverActionHost, receiverPayload);
        return;
      }

    	switch(inputType)
      {
      	case "TV":
      		receiverPayload['input'] = 'AV1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      	  setTimeout(()=>{that.executeAction(frTVActionHost, "InputTV", null);}, 500);
      		break;
      	case "Retro PI":
          receiverPayload['input'] = 'AV1';
          axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI2", null);}, 500);
      		break;
      	case "PS3":
      		receiverPayload['input'] = 'HDMI4';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "PS4":
      		receiverPayload['input'] = 'HDMI2';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
		case "PS5":
      		receiverPayload['input'] = 'AV1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      	  setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI3", null);}, 500);
      		break;
      	case "WII U":
      		receiverPayload['input'] = 'HDMI3';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Roku":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Xbox":
      		receiverPayload['input'] = 'HDMI5';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Switch":
      		receiverPayload['input'] = 'V-AUX';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Netflix":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Netflix")
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Plex":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Plex");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Prime":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Prime Video");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "HBO":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "HBO GO");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Crunchy Roll":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Crunchyroll");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "HGTV":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Watch HGTV");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "STARZ":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "STARZ");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "PBS":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "PBS Video");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Showtime":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Showtime Anytime");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "YouTube":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "YouTube");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "NATGEO":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "NatGeoTV");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Smithsonian":
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", "Smithsonian Channel");
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
          break;
      	default:
      		receiverPayload['input'] = 'HDMI1';
      		axios.put(frReceiverActionHost, receiverPayload);
      		this.executeAction(frRokuActionHost, "input", inputType);
      		this.executeAction(frTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(frTVActionHost, "HDMI1", null);}, 500);
      }
    }
  }
}
</script>
<style>

</style>
