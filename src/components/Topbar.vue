<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="topbar">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="sub">{{ subtitle }}</p>
    </div>

    <div class="search">
      <input type="text" placeholder="Rechercher un produit…" />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  padding: 15px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
}

.topbar h1 {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.sub {
  font-size: 12.5px;
  color: var(--ink-soft);
  margin-top: 1px;
}

.search {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 8px 12px;
  width: 260px;
}

.search input {
  border: none;
  background: none;
  outline: none;
  font-size: 13px;
  width: 100%;
}
</style>