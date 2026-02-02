<script lang="ts" setup>
const iconName = ref<TIcons>('car')
function toggleIcon () {
  iconName.value = iconName.value === 'car' ? 'cart' : 'car'
}

const indexStore = useIndexStore()
const { testVar } = storeToRefs(indexStore)

const { openModal } = useModals()
</script>

<template>
  <div class="p-5 space-y-5">
    <Icon :name="iconName" class="size-10 text-primary" />

    <el-button @click="toggleIcon">Toggle Icon</el-button>

    <IndexComponent />
    <IndexNestedComponent />

    <p>{{ filters.formatCurrency(1000) }}</p>

    <el-button @click="openModal('IndexModal', { title: 'Index Modal' })">Open Modal</el-button>

    <p class="text-primary">{{ testVar }}</p>
  </div>
</template>
