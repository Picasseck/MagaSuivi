<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="search-bar">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
    <input
      :value="modelValue"
      :placeholder="placeholder ?? 'Rechercher…'"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 9px 12px;
}

.search-bar svg {
  width: 16px;
  height: 16px;
  color: var(--ink-soft);
  flex-shrink: 0;
}

.search-bar input {
  border: none;
  background: none;
  outline: none;
  font-size: 13.5px;
  width: 100%;
}
</style>