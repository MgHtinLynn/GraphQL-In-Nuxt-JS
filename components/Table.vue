<template>
  <div class="table-border-margin-20">
    <el-button @click="createDialog = true" type="primary" round class="create-button">Add User</el-button>
    <el-table
      :data="users"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
    </el-table>
    <el-dialog title="Create User" :visible.sync="createDialog">
      <el-form :model="form">
        <el-form-item label="User Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="createDialog = false">Cancel</el-button>
    <el-button type="primary" @click="createUser()">Add User</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import createUserMutation from "~/apollo/mutations/createUserMutation"

  export default {
    name: "tableUser",
    data() {
      return {
        'title': 'User List',
        createDialog: false,
        formLabelWidth: '120px',
        form: {
          name: null,
          email: null,
          password: null
        }
      }
    },
    computed: {
      ...mapGetters({
        users: 'user/users'
      })
    },
    methods: {
      async createUser() {
        let vm = this
        await vm.$apollo.mutate({
          mutation: createUserMutation,
          variables: vm.form
        }).then(() => {
          vm.createDialog = false
          vm.$notify({
            title: 'Success',
            message: 'User is successfully Created',
            type: 'success'
          })
        }).catch(() => {
          vm.createDialog = false
          vm.$notify.error({
            title: 'Error',
            message: 'Failed to create user'
          })
        })
        vm.$store.dispatch('user/setUsers')
      }
    }

  }
</script>

<style scoped>
  .el-table {
    border: 1px grey;
  }

  .create-button {
    float: right;
    margin-right: 1em;
    margin-bottom: 2em;
  }

  .table-border-margin-20 {
    margin-right: 2em;
  }
</style>
