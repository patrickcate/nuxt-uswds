<script setup>
const nuxtUswds = useRuntimeConfig().public.nuxtUswds;

const options = JSON.parse(JSON.stringify(nuxtUswds));
const vueUswdsOptions = ref({ ...options.vueUswds });

delete options.vueUswds;

const nuxtUswdsOptions = ref({ ...options });
</script>

<template>
  <div>
    <pre class="test-nuxt-uswds-options">{{ nuxtUswdsOptions }}</pre>
    <pre class="test-vue-uswds-options">{{ vueUswdsOptions }}</pre>
    <div class="test-usa-component"><TCUsaTag>Test UsaTag</TCUsaTag></div>
    <div class="test-base-component">
      <TBBaseLink to="/">Test BaseLink</TBBaseLink>
    </div>
  </div>
</template>
