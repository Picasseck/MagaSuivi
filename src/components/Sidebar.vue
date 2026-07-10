<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-mark">M</div>
      <div class="logo-text">
        MagaSuivi
        <span>Gestion de magasin</span>
      </div>
    </div>

    <p class="nav-label">Pilotage</p>
    <nav class="nav">
      <RouterLink to="/" class="nav-item">Tableau de bord</RouterLink>
      <RouterLink to="/ventes" class="nav-item">Ventes</RouterLink>
      <RouterLink to="/produits" class="nav-item">Produits &amp; stock</RouterLink>
      <RouterLink to="/soldes" class="nav-item">Soldes &amp; promos</RouterLink>
    </nav>

    <div class="sidebar-foot">
      <div class="avatar">AS</div>
      <div>
        <div class="who">Abdoul Ahad</div>
        <div class="role">Gestionnaire</div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 236px;
  background: var(--surface);
  border-right: 1px solid var(--line);
  padding: 22px 16px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 22px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 18px;
}

.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--brand);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
}

.logo-text {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.2px;
}

.logo-text span {
  display: block;
  font-weight: 500;
  font-size: 11px;
  color: var(--ink-soft);
}

.nav-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--ink-soft);
  padding: 0 8px;
  margin-bottom: 6px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  padding: 9px 10px;
  border-radius: 8px;
  color: var(--ink-soft);
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: var(--bg);
  color: var(--ink);
}

.nav-item.router-link-exact-active {
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: 600;
}

.sidebar-foot {
  margin-top: auto;
  padding: 12px 10px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 600;
}

.who {
  font-size: 12.5px;
  font-weight: 600;
}

.role {
  font-size: 11px;
  color: var(--ink-soft);
}
</style>