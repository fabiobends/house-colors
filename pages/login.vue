<template>
  <div class="container py-5">
    <div class="shadow mx-auto p-5 col-lg-5 rounded border-radius-lg">
      <h3 class="text-center mb-5">
        You have to login to be to able to see all the content! 😊
      </h3>
      <form class="needs-validation" novalidate @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': email.length < 1 }"
            type="text"
            placeholder="Enter a email"
            required
          />
          <p v-show="email.length < 1" class="invalid-feedback">
            Please the email should not be empty.
          </p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': password.length < 1 || !isSuccessful }"
            type="password"
            placeholder="Enter a password"
            required
          />
          <p v-show="password.length < 1" class="invalid-feedback">
            Please the password should not be empty.
          </p>
          <p v-show="!isSuccessful" class="invalid-feedback mt-3">
            Email or password is incorrect.
          </p>
        </div>
        <button type="submit" class="btn btn-block btn-primary my-3">
          Submit
        </button>
        <small>
          <em
            >PS.: For test purposes you can just click "Submit" with the default
            input values.</em
          >
        </small>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
  data() {
    return {
      email: ' ',
      password: ' ',
      isSuccessful: true,
    }
  },
  head: {
    title: 'Login',
  },
  mounted() {
    this.email = this.$config.defaultEmail ?? ''
    this.password = this.$config.defaultPassword ?? ''
  },
  methods: {
    async onSubmit() {
      this.isSuccessful = await this.$login({
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>
