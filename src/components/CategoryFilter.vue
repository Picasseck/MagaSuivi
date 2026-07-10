<script setup lang="ts">
defineProps<{
  categories: string[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="category-filter">
    <button
      v-for="category in categories"
      :key="category"
      class="pill"
      :class="{ active: modelValue === category }"
      @click="$emit('update:modelValue', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-soft);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  transition: all 0.15s;
}

.pill:hover {
  color: var(--ink);
  border-color: var(--ink-soft);
}

.pill.active {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}
</style>