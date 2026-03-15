<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  for?: string
}>()
</script>

<template>
  <Label
    :for="props.for"
    :class="cn('text-sm font-bold leading-none cursor-pointer', props.class)"
  >
    <slot />
  </Label>
</template>
