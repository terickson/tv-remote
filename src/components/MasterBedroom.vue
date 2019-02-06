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
      <b-col align="left"  style="padding-top:10px">
        <b-button @click="modifyTv('VolumeUp', null)"><v-icon name="arrow-up"/></b-button>
      </b-col>
      <b-col align="right" v-if="input=='TV'">
        <b-button @click="modifyTv('ChannelUp', null)"><v-icon name="arrow-up"/></b-button>
      </b-col>
    </b-row>
    <b-row style="padding-top:15px">
      <b-col align="left">
        <b-button @click="modifyTv('VolumeDown', null)"><v-icon name="arrow-down"/></b-button>
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
var mbTVActionHost = "http://192.168.72.25:8080/tv/actions"
var mbRokuActionHost = "http://192.168.72.110:8080/systems/master-bedroom/actions"
export default
{
  name: 'MasterBedroom',
  data ()
  {
    return {
      input: null,
      inputs: [{display:"Off", value: null},{display:"TV", value: "TV"},{display:"Roku", value: "Roku"},{display:"PS2", value: "PS2"},{display:"WII", value: "WII"}],
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
    modifyTv(command, value){
      this.executeAction(mbTVActionHost, command, value);
    },
    modifyRoku(command, value){
      this.executeAction(mbRokuActionHost, command, value);
    },
    changeInput(inputType){
      let that = this;

      if(!inputType){
        this.executeAction(mbTVActionHost, "PowerOff", null);
        return;
      }

    	switch(inputType)
      {
      	case "TV":
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      	  setTimeout(()=>{that.executeAction(mbTVActionHost, "InputTV", null);}, 500);
      		break;
      	case "PS2":
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "InputAV1", null);}, 500);
      		break;
      	case "WII":
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "InputComponent1", null);}, 500);
      		break;
      	case "Roku":
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "DC Universe":
      		this.executeAction(mbRokuActionHost, "input", "DC Universe");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Daily Burn":
      		this.executeAction(mbRokuActionHost, "input", "Daily Burn");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Netflix":
      		this.executeAction(mbRokuActionHost, "input", "Netflix")
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Plex":
      		this.executeAction(mbRokuActionHost, "input", "Plex");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Prime":
      		this.executeAction(mbRokuActionHost, "input", "Prime Video");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "HBO":
      		this.executeAction(mbRokuActionHost, "input", "HBO GO");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Crunchy Roll":
      		this.executeAction(mbRokuActionHost, "input", "Crunchyroll");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "HGTV":
      		this.executeAction(mbRokuActionHost, "input", "Watch HGTV");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "STARZ":
      		this.executeAction(mbRokuActionHost, "input", "STARZ");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "PBS":
      		this.executeAction(mbRokuActionHost, "input", "PBS Video");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Showtime":
      		this.executeAction(mbRokuActionHost, "input", "Showtime Anytime");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "YouTube":
      		this.executeAction(mbRokuActionHost, "input", "YouTube");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "NATGEO":
      		this.executeAction(mbRokuActionHost, "input", "NatGeoTV");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      		break;
      	case "Smithsonian":
      		this.executeAction(mbRokuActionHost, "input", "Smithsonian Channel");
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
          break;
      	default:
      		this.executeAction(mbRokuActionHost, "input", inputType);
      		this.executeAction(mbTVActionHost, "PowerOn", null);
      		setTimeout(()=>{that.executeAction(mbTVActionHost, "HDMI1", null);}, 500);
      }
    }
  }
}
</script>
<style>

</style>
