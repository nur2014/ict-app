<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters">
      <div class="col-sm-12 text-center">
        <div class="iq-error" :class="$route.query.code !== '404' ? 'error-500' : ''">
          <img :src="error.img" class="img-fluid iq-error-img" :alt="$route.query.code ? $route.query.code : '404'">
          <h2 class="mb-0">{{ error.title }}</h2>
          <p>{{ error.message }}</p>
          <button @click="$router.go(-1)" class="btn btn-warning mt-3 mr-2"><i class="fas fa-arrow-left"></i>Go Back</button>
          <button @click="$router.push('/')" class="btn btn-primary mt-3"><i class="ri-home-4-line"></i>Back to Home</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'

export default {
  name: 'ErrorPage',
  data () {
    return {
      code: '',
      error: {
        title: 'Oops! This Page is Not Found.',
        message: 'The requested page dose not exist.',
        img: require('../../assets/images/error/error-.png')
      }
    }
  },
  mounted () {
    core.index()
  },
  created () {
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      if (this.code === '500') {
        this.error.title = 'Server Error.'
        this.error.message = 'Operation failed due to an unknown error.'
      } else if (this.code === '401') {
        this.error.title = 'Server Error! Unauthorized Access.'
        this.error.message = 'We are really sorry about that. You do not have permission to view this directory or page using tha credentials that you supplied.'
      } else {
        this.error.title = 'Oops! Something went wrong.'
        this.error.message = 'Operation failed due to an unknown error.'
      }
    }
  }
}
</script>
