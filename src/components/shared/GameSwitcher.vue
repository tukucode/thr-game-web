<script setup lang="ts">
import { useTHRStore } from "@/composables/useTHRStore";
import { Icon } from "@iconify/vue";

const { config, switchGame } = useTHRStore();
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center gap-2">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <h3 class="text-base font-extrabold text-foreground/90 tracking-tight">
        Pilih Mode Permainan
      </h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <button
        @click="switchGame('kocok-amplop')"
        class="group flex flex-row sm:flex-col items-center sm:justify-center gap-4 rounded-3xl sm:rounded-[2rem] border-2 p-4 sm:p-6 transition-all duration-500 relative overflow-hidden backdrop-blur-md"
        :class="
          config.activeGame === 'kocok-amplop'
            ? 'border-primary shadow-xl shadow-primary/10 bg-gradient-to-br from-primary/10 via-background to-card z-10 scale-[1.02] sm:scale-[1.03]'
            : 'border-border/60 bg-card hover:bg-muted/40 hover:border-primary/30 hover:scale-[1.01] opacity-60 hover:opacity-100'
        "
      >
        <!-- Background Glow for Active State -->
        <div
          v-if="config.activeGame === 'kocok-amplop'"
          class="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"
        ></div>

        <div
          class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 shadow-sm shrink-0"
          :class="
            config.activeGame === 'kocok-amplop'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          "
        >
          <Icon icon="lucide:mail" class="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div class="flex flex-col items-start sm:items-center gap-0.5 sm:gap-1">
          <span
            class="font-bold text-sm tracking-wide transition-colors duration-300"
            :class="
              config.activeGame === 'kocok-amplop'
                ? 'text-foreground'
                : 'text-muted-foreground group-hover:text-foreground'
            "
          >
            Kocok Amplop
          </span>
          <span
            class="text-[10px] uppercase font-bold tracking-widest text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity"
            v-if="config.activeGame !== 'kocok-amplop'"
          >
            Pilih Mode
          </span>
          <span
            class="text-[10px] font-bold tracking-widest text-primary"
            v-else
          >
            Aktif
          </span>
        </div>

        <!-- Ripple/Shimmer effect on hover -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        ></div>
      </button>

      <button
        @click="switchGame('buka-kartu')"
        class="group flex flex-row sm:flex-col items-center sm:justify-center gap-4 rounded-3xl sm:rounded-[2rem] border-2 p-4 sm:p-6 transition-all duration-500 relative overflow-hidden backdrop-blur-md"
        :class="
          config.activeGame === 'buka-kartu'
            ? 'border-primary shadow-xl shadow-primary/10 bg-gradient-to-br from-primary/10 via-background to-card z-10 scale-[1.02] sm:scale-[1.03]'
            : 'border-border/60 bg-card hover:bg-muted/40 hover:border-primary/30 hover:scale-[1.01] opacity-60 hover:opacity-100'
        "
      >
        <!-- Background Glow for Active State -->
        <div
          v-if="config.activeGame === 'buka-kartu'"
          class="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"
        ></div>

        <div
          class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:-rotate-6 shadow-sm shrink-0"
          :class="
            config.activeGame === 'buka-kartu'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          "
        >
          <Icon icon="lucide:layout-template" class="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div class="flex flex-col items-start sm:items-center gap-0.5 sm:gap-1">
          <span
            class="font-bold text-sm tracking-wide transition-colors duration-300"
            :class="
              config.activeGame === 'buka-kartu'
                ? 'text-foreground'
                : 'text-muted-foreground group-hover:text-foreground'
            "
          >
            Buka Kartu
          </span>
          <span
            class="text-[10px] uppercase font-bold tracking-widest text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity"
            v-if="config.activeGame !== 'buka-kartu'"
          >
            Pilih Mode
          </span>
          <span
            class="text-[10px] font-bold tracking-widest text-primary"
            v-else
          >
            Aktif
          </span>
        </div>

        <!-- Ripple/Shimmer effect on hover -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        ></div>
      </button>
    </div>
  </div>
</template>
