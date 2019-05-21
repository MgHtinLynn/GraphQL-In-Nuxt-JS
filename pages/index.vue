<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <h1 class="head-label">GraphQL With Nuxt JS</h1>
      <section class="spilter">
        <div class="col-6 col-md-6 width-35">
          <logo/>
        </div>
        <div class="col-6 col-md-6 width-65">
          <table-user></table-user>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import TableUser from '~/components/Table.vue'

  export default {
    components: {
      Logo,
      TableUser
    },
    async fetch ({ store }) {
      await Promise.all([
        store.dispatch('user/setUsers')
      ])
    }
  }
</script>

<style scoped>
  .head-label {
    margin: 3em 1em;
    display: flex;
    text-align: center;
    justify-content: space-around;
  }
  .width-35 {
    width: 35%;
    text-align: center;
  }
  .width-65 {
    float: left;
    width: 65%;
  }

  .spilter {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
  }
</style>
