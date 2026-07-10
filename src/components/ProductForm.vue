<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Product } from '../types'

const props = defineProps<{
  productToEdit: Product | null
}>()

const emit = defineEmits<{
  save: [product: Product | Omit<Product, 'id'>]
  close: []
}>()

const name = ref('')
const category = ref('')
const price = ref(0)
const stock = ref(0)
const lowStockThreshold = ref(10)
const errors = ref<Record<string, string>>({})

watch(
  () => props.productToEdit,
  (product) => {
    if (product) {
      name.value = product.name
      category.value = product.category
      price.value = product.price
      stock.value = product.stock
      lowStockThreshold.value = product.lowStockThreshold
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  name.value = ''
  category.value = ''
  price.value = 0
  stock.value = 0
  lowStockThreshold.value = 10
  errors.value = {}
}

function validate(): boolean {
  const newErrors: Record<string, string> = {}
  if (!name.value.trim()) newErrors.name = 'Le nom est obligatoire.'
  if (!category.value.trim()) newErrors.category = 'La catégorie est obligatoire.'
  if (price.value <= 0) newErrors.price = 'Le prix doit être supérieur à zéro.'
  if (stock.value < 0) newErrors.stock = 'Le stock ne peut pas être négatif.'
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

function handleSave() {
  if (!validate()) return

  const productData = {
    name: name.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    lowStockThreshold: lowStockThreshold.value,
    soldLast7Days: props.productToEdit?.soldLast7Days ?? 0,
  }

  if (props.productToEdit) {
    emit('save', { id: props.productToEdit.id, ...productData })
  } else {
    emit('save', productData)
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal card">
      <div class="modal-head">
        <h2>{{ productToEdit ? 'Modifier le produit' : 'Nouveau produit' }}</h2>
        <button class="close-button" @click="emit('close')">×</button>
      </div>

      <div class="modal-body">
        <div class="field">
          <label>Nom du produit</label>
          <input v-model="name" type="text" :class="{ 'has-error': errors.name }" />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label>Catégorie</label>
          <input v-model="category" type="text" :class="{ 'has-error': errors.category }" />
          <span v-if="errors.category" class="error-text">{{ errors.category }}</span>
        </div>

        <div class="field-row">
          <div class="field">
            <label>Prix (€)</label>
            <input v-model.number="price" type="number" step="0.01" :class="{ 'has-error': errors.price }" />
            <span v-if="errors.price" class="error-text">{{ errors.price }}</span>
          </div>

          <div class="field">
            <label>Stock</label>
            <input v-model.number="stock" type="number" :class="{ 'has-error': errors.stock }" />
            <span v-if="errors.stock" class="error-text">{{ errors.stock }}</span>
          </div>
        </div>

        <div class="field">
          <label>Seuil de stock bas</label>
          <input v-model.number="lowStockThreshold" type="number" />
        </div>
      </div>

      <div class="modal-foot">
        <button class="button-secondary" @click="emit('close')">Annuler</button>
        <button class="button-primary" @click="handleSave">
          {{ productToEdit ? 'Enregistrer' : 'Ajouter' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 34, 48, 0.45);
  display: grid;
  place-items: center;
  z-index: 100;
  padding: 20px;
}

.modal {
  width: 100%;
  max-width: 460px;
}

.modal-head {
  padding: 18px 22px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-head h2 {
  font-size: 16px;
  font-weight: 700;
}

.close-button {
  font-size: 22px;
  color: var(--ink-soft);
  width: 30px;
  height: 30px;
}

.close-button:hover {
  color: var(--ink);
}

.modal-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.field-row {
  display: flex;
  gap: 14px;
}

.field label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-soft);
}

.field input {
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus {
  border-color: var(--brand);
}

.field input.has-error {
  border-color: var(--danger);
}

.error-text {
  font-size: 12px;
  color: var(--danger);
}

.modal-foot {
  padding: 16px 22px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.button-secondary {
  padding: 9px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13.5px;
  color: var(--ink-soft);
  border: 1px solid var(--line);
}

.button-secondary:hover {
  background: var(--bg);
}

.button-primary {
  padding: 9px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13.5px;
  background: var(--brand);
  color: #fff;
}

.button-primary:hover {
  opacity: 0.92;
}
</style>