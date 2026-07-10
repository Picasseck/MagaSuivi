<script setup lang="ts">
defineProps<{
  label: string
  value: string
  trend?: string
  trendType?: 'up' | 'down'
  variant?: 'brand' | 'ok' | 'warn' | 'danger'
}>()
</script>

<template>
  <div class="card kpi">
    <div class="kpi-top">
      <div class="kpi-icon" :class="`icon-${variant ?? 'brand'}`">
        <slot />
      </div>
      <span v-if="trend" class="kpi-trend" :class="`trend-${trendType ?? 'up'}`">
        {{ trend }}
      </span>
    </div>
    <div class="kpi-value">{{ value }}</div>
    <div class="kpi-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.kpi {
  padding: 18px;
}

.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.kpi-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: grid;
  place-items: center;
}

.kpi-icon :deep(svg) {
  width: 19px;
  height: 19px;
}

.icon-brand { background: var(--brand-soft); color: var(--brand); }
.icon-ok { background: var(--ok-soft); color: var(--ok); }
.icon-warn { background: var(--warn-soft); color: var(--warn); }
.icon-danger { background: var(--danger-soft); color: var(--danger); }

.kpi-trend {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
}

.trend-up { background: var(--ok-soft); color: var(--ok); }
.trend-down { background: var(--danger-soft); color: var(--danger); }

.kpi-value {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.kpi-label {
  font-size: 12.5px;
  color: var(--ink-soft);
  margin-top: 2px;
}
</style>