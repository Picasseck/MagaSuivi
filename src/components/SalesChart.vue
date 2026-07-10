<script setup lang="ts">
interface DayData {
  label: string
  value: number
  display: string
}

const days: DayData[] = [
  { label: 'Lun', value: 58, display: '9,2k' },
  { label: 'Mar', value: 64, display: '10,1k' },
  { label: 'Mer', value: 55, display: '8,7k' },
  { label: 'Jeu', value: 72, display: '11,3k' },
  { label: 'Ven', value: 88, display: '13,8k' },
  { label: 'Sam', value: 100, display: '15,6k' },
  { label: 'Dim', value: 80, display: '12,5k' },
]
</script>

<template>
  <div class="card">
    <div class="panel-head">
      <h2>Ventes des 7 derniers jours</h2>
    </div>
    <div class="chart">
      <div v-for="day in days" :key="day.label" class="bar-col">
        <span class="bar-val">{{ day.display }}</span>
        <div class="bar" :style="{ height: day.value + '%' }"></div>
        <span class="bar-label">{{ day.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-head {
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.panel-head h2 {
  font-size: 15px;
  font-weight: 700;
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  height: 200px;
  padding: 18px;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  justify-content: flex-end;
}

.bar {
  width: 100%;
  max-width: 42px;
  background: var(--brand);
  border-radius: 6px 6px 0 0;
  transition: opacity 0.15s;
  cursor: pointer;
}

.bar:hover {
  opacity: 0.82;
}

.bar-label {
  font-size: 11.5px;
  color: var(--ink-soft);
  font-weight: 500;
}

.bar-val {
  font-size: 11px;
  font-weight: 700;
}
</style>