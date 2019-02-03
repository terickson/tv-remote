<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">{{remoteName}}</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="'/frm'">Family Room</b-nav-item>
        <b-nav-item :to="'/mbr'">Master BedRoom</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
     return {
       remoteName: "Family Room Remote"
     }
   },
 watch: {
   '$route' () {
     if (this.$route.path === '/frm') {
       this.remoteName = "Family Room Remote"
     }
     else if (this.$route.path === '/mbr') {
       this.remoteName = "Master Bedroom Remote"
     }
   }
 }
}
</script>
