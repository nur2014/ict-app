<template>
  <!-- Footer -->
  <footer class="bg-white iq-footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <div class="footer_left">
            <ul class="mb-0">
              <slot name="left"></slot>
            </ul>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="footer_right">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer END -->
</template>
<script>
export default {
  name: 'MiniFooter'
}
</script>
