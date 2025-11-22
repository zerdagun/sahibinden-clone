<template>
  <section class="seller-products">
    <header class="section-header">
      <div>
        <p class="section-label">Galerinin Diğer İlanları</p>
        <h2>{{ sellerName }}</h2>
      </div>
      <a href="#" class="view-all">Tüm ilanları gör</a>
    </header>

    <div v-if="sellerAdverts.length" class="seller-grid">
      <AdvertCard
        v-for="advert in sellerAdverts"
        :key="advert.id"
        :advert="advert"
      />
    </div>
    <p v-else class="empty-state">
      Bu galeride başka ilan bulunamadı.
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import AdvertCard from './AdvertCard.vue';
import { mockAdverts } from '../data/mockAdverts';

const props = defineProps({
  productId: {
    type: [String, Number],
    required: true
  }
});

const currentAdvert = computed(() => {
  const numericId = Number(props.productId);
  return mockAdverts.find((item) =>
    Number.isNaN(numericId) ? item.id === props.productId : item.id === numericId
  );
});

const sellerName = computed(() => currentAdvert.value?.seller?.name ?? 'Galerinin İlanları');

const sellerAdverts = computed(() => {
  if (!currentAdvert.value?.seller?.id) {
    return [];
  }
  const sellerId = currentAdvert.value.seller.id;
  const currentId = currentAdvert.value.id;
  return mockAdverts.filter(
    (advert) => advert.seller.id === sellerId && advert.id !== currentId
  );
});
</script>

<style scoped>
.seller-products {
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 15px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.section-label {
  font-size: 0.85em;
  color: #6b7280;
  margin: 0;
}

.section-header h2 {
  margin: 4px 0 0;
  font-size: 1.4em;
}

.view-all {
  font-size: 0.85em;
  color: #007bff;
  text-decoration: none;
}

.seller-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.empty-state {
  margin: 0;
  padding: 20px;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  text-align: center;
  color: #6b7280;
}
</style>

