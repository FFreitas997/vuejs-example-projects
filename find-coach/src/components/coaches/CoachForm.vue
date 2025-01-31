<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton from "@/components/ui/BaseButton.vue";
import {Coach} from "@/models/Coach.ts";

export default defineComponent({
  name: "CoachForm",
  components: {BaseButton},
  emits: ['register'],
  data() {
    return {
      firstname: '',
      lastname: '',
      description: '',
      rate: 0,
      areas: [],
      errors: {
        firstname: false,
        lastname: false,
        description: false,
        rate: false,
        areas: false
      }
    }
  },
  methods: {
    checkFirstNameHasError() {
      this.errors.firstname = !this.firstNameValidator()
    },
    checkLastNameHasError() {
      this.errors.lastname = !this.lastNameValidator()
    },
    checkDescriptionHasError() {
      this.errors.description = !this.descriptionValidator()
    },
    checkRateHasError() {
      this.errors.rate = !this.rateValidator()
    },
    checkAreasHasError() {
      this.errors.areas = !this.areasValidator()
    },
    firstNameValidator() {
      return this.firstname.trim().length > 0
    },
    lastNameValidator() {
      return this.lastname.trim().length > 0
    },
    descriptionValidator() {
      return this.description.trim().length > 0
    },
    rateValidator() {
      return this.rate > 0
    },
    areasValidator() {
      return this.areas.length > 0
    },

    registerCoach() {
      this.errors = {
        firstname: !this.firstNameValidator(),
        lastname: !this.lastNameValidator(),
        description: !this.descriptionValidator(),
        rate: !this.rateValidator(),
        areas: !this.areasValidator()
      }

      let invalidForm = Object
        .keys(this.errors)
        .some((key: string) =>
          // @ts-ignore
          this.errors[key]
        )

      if (invalidForm) return

      const newCoach = new Coach(
        '',
        this.firstname,
        this.lastname,
        this.areas,
        this.description,
        this.rate
      )

      this.$emit('register', newCoach)
    }
  }
})
</script>

<template>
  <form>
    <div class="form-control" :class="{invalid: errors.firstname}">
      <label for="firstname">First Name</label>
      <input v-model="firstname" type="text" id="firstname" @blur="checkFirstNameHasError"/>
      <span v-if="errors.firstname">Invalid First Name</span>
    </div>
    <div class="form-control" :class="{invalid: errors.lastname}">
      <label for="lastname">Last Name</label>
      <input v-model="lastname" type="text" id="lastname" @blur="checkLastNameHasError"/>
      <span v-if="errors.lastname">Invalid Last Name</span>
    </div>
    <div class="form-control" :class="{invalid: errors.description}">
      <label for="description">Description</label>
      <textarea v-model="description" id="description" rows="5"
                @blur="checkDescriptionHasError"></textarea>
      <span v-if="errors.description">Invalid Description</span>
    </div>
    <div class="form-control" :class="{invalid: errors.rate}">
      <label for="rate">Hourly Rate</label>
      <input v-model="rate" type="number" id="rate" @blur="checkRateHasError"/>
      <span v-if="errors.rate">Invalid Rate</span>
    </div>
    <div class="form-control" :class="{invalid: errors.areas}">
      <h3>Areas of Expertise</h3>
      <div>
        <input v-model="areas" type="checkbox" id="frontend" value="frontend"
               @blur="checkAreasHasError"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input v-model="areas" type="checkbox" id="backend" value="backend"
               @blur="checkAreasHasError"/>
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input v-model="areas" type="checkbox" id="career" value="career"
               @blur="checkAreasHasError"/>
        <label for="career">Career Development</label>
      </div>
      <span v-if="errors.areas">Invalid Areas</span>
    </div>
    <base-button @click.prevent="registerCoach">Register</base-button>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.invalid span {
  color: red;
  font-weight: bold;
  font-size: 0.8rem;
}
</style>
