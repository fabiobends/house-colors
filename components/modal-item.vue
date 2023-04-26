<template>
  <b-modal
    :id="id"
    :title="title"
    header-class="p-3"
    content-class="p-4"
    centered
    hide-footer
  >
    <div class="d-flex flex-column">
      <div class="form-group">
        <label for="email">Color title</label>
        <input
          v-model="colorTitle"
          class="form-control"
          type="text"
          placeholder="No pet, Bathroom, etc."
          required
        />
        <p class="invalid-feedback">Please the color should not be empty.</p>
      </div>
      <div class="">
        <label for="email">HEX Color</label>
        <input
          v-model="hexColor"
          class="form-control"
          type="text"
          placeholder="000000"
          required
          maxlength="6"
        />
        <small class="btn px-0 btn-link" @click="setRandomColor"
          >Add random color</small
        >
      </div>

      <div class="d-flex my-2">
        <b-form-checkbox
          v-model="isActive"
          name="check-button"
          size="lg"
          switch
        >
          <small>{{ isActive ? 'Active' : 'Inactive' }}</small>
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-column align-items-center mb-5">
        <small class="my-2">Preview</small>
        <box-item :hex-color="hexColor" is-small />
      </div>
      <b-button
        variant="primary"
        :disabled="!isValid"
        @click="onClickPrimary"
        >{{ primaryButtonTitle }}</b-button
      >
      <b-button
        v-show="secondaryButtonTitle.length"
        class="mt-2"
        variant="secondary"
        @click="onClickSecondary"
        >{{ secondaryButtonTitle }}</b-button
      >
    </div>
  </b-modal>
</template>

<script lang="ts">
import BoxItem from './box-item.vue'
export default {
  name: 'ModalItem',
  components: { BoxItem },
  props: {
    primaryButtonTitle: { type: String, default: '' },
    secondaryButtonTitle: { type: String, default: '' },
    id: { type: String, default: '' },
    primaryEvent: { type: String, default: '' },
    secondaryEvent: { type: String, default: '' },
    title: { type: String, default: '' },
    initialColorTitle: { type: String, default: '' },
    initialHexColor: { type: String, default: '' },
  },
  data() {
    return {
      colorTitle: '',
      hexColor: '',
      isActive: false,
      initialIsActive: false,
    }
  },
  async fetch() {
    if (this.primaryEvent === 'item-updated') {
      const { active } = await this.$getItem(Number(this.id))
      this.initialIsActive = Boolean(active)
      this.isActive = this.initialIsActive
    }
  },
  computed: {
    isValid() {
      return (
        this.hexColor.length &&
        this.colorTitle.length &&
        (this.hexColor !== this.initialHexColor ||
          this.colorTitle !== this.initialColorTitle ||
          this.isActive !== this.initialIsActive)
      )
    },
  },
  created() {
    this.colorTitle = this.initialColorTitle
    this.hexColor = this.initialHexColor
  },
  methods: {
    setRandomColor() {
      this.hexColor = this.$getRandomColor()
    },
    async onClickPrimary() {
      switch (this.primaryEvent) {
        case 'item-updated': {
          const { id } = await this.$updateItem(Number(this.id), {
            name: this.colorTitle,
            active: Number(this.isActive),
          })
          this.$store.commit('update', {
            id,
            name: this.colorTitle,
            color: this.hexColor,
            isActive: this.isActive,
          })
          break
        }
        case 'item-created': {
          const { id } = await this.$createItem({
            name: this.colorTitle,
            active: Number(this.isActive),
          })
          this.$store.commit('create', {
            id,
            name: this.colorTitle,
            color: this.hexColor,
            isActive: this.isActive,
          })
          break
        }
      }
      this.$bvModal.hide(this.id)
    },
    async onClickSecondary() {
      switch (this.secondaryEvent) {
        case 'item-deleted': {
          const id = Number(this.id)
          const isSuccessful = await this.$deleteItem(id)
          if (isSuccessful) {
            this.$store.commit('delete', id)
          }
          break
        }
      }
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
