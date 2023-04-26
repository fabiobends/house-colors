<template>
  <div class="align-items-center">
    <div class="container p-5">
      <h1>Hi, Admin!</h1>

      <b-button
        v-b-modal="'creation-modal'"
        variant="primary"
        class="p-3 d-flex align-items-center font-weight-bold mt-5"
      >
        Create new house color
        <b-icon-plus-circle class="ml-3" width="26" height="26" />
      </b-button>
      <div class="box-container">
        <div v-for="item in $store.state.houseColors" :key="item.id">
          <p>{{ item.name }}</p>
          <b-button v-b-modal="item.id.toString()" class="box-button">
            <box-item :hex-color="item.color" />
          </b-button>
          <modal-item
            :id="item.id.toString()"
            :title="'Item details'"
            primary-event="item-updated"
            secondary-event="item-deleted"
            :primary-button-title="'Update'"
            :secondary-button-title="'Delete'"
            :initial-color-title="item.name"
            :initial-hex-color="item.color"
          />
        </div>
      </div>
    </div>
    <modal-item
      id="creation-modal"
      primary-event="item-created"
      :title="'Create house color'"
      :primary-button-title="'Create'"
    />
  </div>
</template>

<script lang="ts">
import ModalItem from '../components/modal-item.vue'
import BoxItem from '../components/box-item.vue'

export default {
  name: 'Home',
  components: {
    ModalItem,
    BoxItem,
  },
  middleware: 'auth',
  async asyncData(context: any) {
    // unfortunately Vue/Nuxt 2.x can't recognized "Context" type before loading the page, that's why the type is `any`
    await context.store.dispatch('getAll', context)
  },
}
</script>

<style scoped>
.box-container {
  margin-top: 100px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px;
}

.box-button {
  all: unset;
  cursor: pointer;
}
</style>
