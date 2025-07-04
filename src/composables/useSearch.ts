import { computed, ref } from "vue";

export function useSearch<T>(items: T[], searchTerm: string): T[] {
  if (!searchTerm) {
    return items;
  }

  const query = ref("");
  const results = computed(() => {
    items.filter((item) => true);
  });
}

/* 
import { ref, computed } from 'vue'
import type { Pago } from '../models/Pago'

export function useBusqueda(pagos: Pago[]) {
  const query = ref('')
  const resultados = computed(() =>
    pagos.filter(p => p.cliente.includes(query.value))
  )
  return { query, resultados }
}

*/
