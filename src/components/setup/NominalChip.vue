<script setup lang="ts">
import { formatRupiah } from '@/utils/currency'
import { Badge } from '@/components/ui/badge'

defineProps<{
  nominal: number
}>()

defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <Badge variant="outline" class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1.5 text-sm font-semibold transition-all hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive group animate-in fade-in zoom-in duration-300">
    <span>{{ formatRupiah(nominal) }}</span>
    <button @click="$emit('remove')" class="rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground w-5 h-5 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 ring-offset-background">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </Badge>
</template>
