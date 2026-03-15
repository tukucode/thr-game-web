<script setup lang="ts">
import { useTHRStore } from "@/composables/useTHRStore";
import { Icon } from "@iconify/vue";

const { config, switchGame } = useTHRStore();
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <h3 class="text-base font-semibold text-foreground/80">
      Pilih Mode Permainan
    </h3>
    <div class="grid grid-cols-2 gap-4">
      <button
        @click="switchGame('kocok-amplop')"
        class="flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-5 transition-all text-left relative overflow-hidden"
        :class="
          config.activeGame === 'kocok-amplop'
            ? 'border-primary bg-primary/5 ring-4 ring-primary/20 scale-[1.02]'
            : 'border-border bg-card hover:bg-accent hover:border-accent-foreground/20 hover:scale-[1.01] opacity-70 hover:opacity-100'
        "
      >
        <Icon icon="lucide:mail" class="w-10 h-10 text-primary" />
        <span class="font-bold text-sm tracking-wide">Kocok Amplop</span>
        <div
          v-if="config.activeGame === 'kocok-amplop'"
          class="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"
        ></div>
      </button>

      <button
        @click="switchGame('buka-kartu')"
        class="flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-5 transition-all text-left relative overflow-hidden"
        :class="
          config.activeGame === 'buka-kartu'
            ? 'border-primary bg-primary/5 ring-4 ring-primary/20 scale-[1.02]'
            : 'border-border bg-card hover:bg-accent hover:border-accent-foreground/20 hover:scale-[1.01] opacity-70 hover:opacity-100'
        "
      >
        <Icon icon="lucide:diamond" class="w-10 h-10 text-primary" />
        <span class="font-bold text-sm tracking-wide">Buka Kartu</span>
        <div
          v-if="config.activeGame === 'buka-kartu'"
          class="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"
        ></div>
      </button>
    </div>
  </div>
</template>
