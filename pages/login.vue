<template>
  <form @submit.prevent="onSubmit">
    <b-input-group>
      <label for="email">Email</label>
      <input v-model="email" type="text" placeholder="Enter a email" />
    </b-input-group>
    <b-input-group>
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter a password"
      />
    </b-input-group>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {
    this.email = this.$config.defaultEmail
    this.password = this.$config.defaultPassword
  },
  methods: {
    onSubmit() {
      this.$login({ email: this.email, password: this.password })
    },
  },
}
</script>
