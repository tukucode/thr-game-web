<script setup lang="ts">
import { useTHRStore } from '@/composables/useTHRStore'
import { useRouter } from 'vue-router'
import NominalForm from '@/components/setup/NominalForm.vue'
import NominalChip from '@/components/setup/NominalChip.vue'
import GameSwitcher from '@/components/shared/GameSwitcher.vue'
import { Icon } from '@iconify/vue'

const { config, updateNominals } = useTHRStore()
const router = useRouter()

const addNominal = (nominal: number) => {
  const newNominals = [...config.value.nominals, nominal]
  updateNominals(newNominals)
}

const removeNominal = (index: number) => {
  const newNominals = [...config.value.nominals]
  newNominals.splice(index, 1)
  updateNominals(newNominals)
}

const startGame = () => {
  if (config.value.nominals.length === 0) return
  router.push('/game')
}

const showTutorial = ref(false)
</script>

<template>
  <main class="container py-8 max-w-2xl mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col pt-8 sm:pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="text-center mb-8 sm:mb-12">
      <div class="inline-block mb-4 filter drop-shadow hover:scale-110 transition-transform cursor-pointer">
        <Icon icon="lucide:mosque" class="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-foreground drop-shadow-sm">Atur <span class="text-primary bg-primary/10 px-2 rounded-lg mix-blend-multiply dark:mix-blend-screen">Nominal</span> THR</h1>
      <p class="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">Tentukan rincian nominal THR yang akan dimainkan. Tambahkan nominal secara bertahap di bawah ini.</p>
    </div>

    <!-- Section Tutorial / Cara Bermain (Collapsible) -->
    <div class="mb-8 w-full max-w-sm mx-auto sm:max-w-none">
      <button 
        @click="showTutorial = !showTutorial"
        class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-[#90C078]/20 shadow-sm hover:bg-white/60 transition-all group"
      >
        <div class="flex items-center gap-3 text-[#304830]">
          <div class="w-8 h-8 rounded-full bg-[#C0D890]/50 flex items-center justify-center">
            <Icon icon="lucide:info" class="w-4 h-4" />
          </div>
          <span class="text-sm font-bold uppercase tracking-wider">Panduan Bermain</span>
        </div>
        <Icon 
          icon="lucide:chevron-down" 
          class="w-5 h-5 text-[#609060] transition-transform duration-300" 
          :class="{ 'rotate-180': showTutorial }"
        />
      </button>

      <div 
        v-if="showTutorial" 
        class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <div class="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#90C078]/30 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-[#C0D890] flex items-center justify-center mb-3 shadow-inner">
            <Icon icon="lucide:plus-circle" class="w-6 h-6 text-[#304830]" />
          </div>
          <h3 class="text-sm font-bold text-[#304830] mb-1">1. Masukkan Nominal</h3>
          <p class="text-[0.7rem] text-muted-foreground leading-relaxed">Daftarkan rincian uang THR yang ingin Anda bagikan ke dalam sistem.</p>
        </div>

        <div class="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#90C078]/30 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-[#C0D890] flex items-center justify-center mb-3 shadow-inner">
            <Icon icon="lucide:gamepad-2" class="w-6 h-6 text-[#304830]" />
          </div>
          <h3 class="text-sm font-bold text-[#304830] mb-1">2. Pilih Permainan</h3>
          <p class="text-[0.7rem] text-muted-foreground leading-relaxed">Tentukan jenis permainan yang paling berkesan untuk dibagikan.</p>
        </div>

        <div class="flex flex-col items-center text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#90C078]/30 shadow-sm text-balance">
          <div class="w-10 h-10 rounded-full bg-[#90C078] flex items-center justify-center mb-3 shadow-inner">
            <Icon icon="lucide:gift" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-sm font-bold text-[#304830] mb-1">3. Bagikan Kebahagiaan!</h3>
          <p class="text-[0.7rem] text-muted-foreground leading-relaxed">Mulai permainan dan biarkan keberuntungan menentukan hasilnya!</p>
        </div>
      </div>
    </div>

    <div class="grid gap-8 bg-card p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-border/60 relative overflow-hidden">
      <!-- Ornamen Dekorasi BG -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <section class="relative z-10">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-foreground/90">
          <Icon icon="lucide:banknote" class="w-6 h-6 text-primary" /> Daftar Nominal THR
        </h2>
        <NominalForm @add="addNominal" class="mb-6" />
        
        <div class="flex flex-wrap gap-2.5 min-h-[80px] p-5 bg-muted/40 rounded-2xl border-2 border-dashed border-muted-foreground/25">
          <p v-if="config.nominals.length === 0" class="text-sm text-muted-foreground flex items-center justify-center w-full min-h-[40px] italic">
            Belum ada nominal yang terdaftar. Yuk, masukkan nominal THR pertama Anda!
          </p>
          <NominalChip 
            v-for="(n, i) in config.nominals" 
            :key="i" 
            :nominal="n" 
            @remove="removeNominal(i)" 
          />
        </div>
      </section>

      <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full"></div>

      <section class="relative z-10">
        <GameSwitcher />
      </section>

      <button 
        @click="startGame"
        :disabled="config.nominals.length === 0"
        class="relative z-10 w-full mt-2 h-16 rounded-2xl bg-primary text-primary-foreground font-black text-lg tracking-wide shadow-xl shadow-primary/25 transition-all hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] border-b-[5px] border-primary-foreground/20 hover:border-b-[6px] disabled:border-b-0 disabled:hover:translate-y-0 disabled:shadow-none overflow-hidden group"
      >
        <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite]"></div>
        <span class="flex items-center justify-center gap-2">Mulai Permainan <Icon icon="lucide:rocket" class="w-6 h-6" /></span>
      </button>
    </div>
  </main>
</template>

<style>
@keyframes shimmer {
  100% {
    transform: translateX(150%) skewX(-20deg);
  }
}
</style>
