<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: 'horizontal' | 'vertical'
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <div
    v-bind="delegatedProps"
    :class="cn(
      'flex gap-4 p-4 rounded-2xl border transition-all duration-300 items-start',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      props.class
    )"
  >
    <slot />
  </div>
</template>
