<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTHRGameStore } from '@/stores/thr.store'
import { formatRupiah } from '@/utils/currency'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  nominal: number
  totalCards?: number
}>()

const store = useTHRGameStore()
const defaultTotal = props.totalCards || 9

// Posisi di mana nominal disembunyikan
const winningIndex = ref<number | null>(null)
const selectedIndex = ref<number | null>(null)

// Dengarkan perubahan pada state store. Jika isRevealed menjadi false (game reset), 
// maka kembalikan local state ke awal agar ronde baru bisa dimulai.
watch(() => store.isRevealed, (newVal) => {
  if (!newVal) {
    selectedIndex.value = null
    winningIndex.value = null
  }
})

const selectCard = (index: number) => {
  if (store.isRevealed || selectedIndex.value !== null) return
  selectedIndex.value = index
  winningIndex.value = index // Selalu assign card yang dipilih sebagai pemenang
  
  setTimeout(() => {
    store.reveal()
  }, 800) // Sedikit ditambah agar animasi kartu selesai sebelum modal muncul
}
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-lg mx-auto py-4">
    <div class="grid grid-cols-3 gap-3 sm:gap-4 w-full p-5 mb-4 bg-primary/5 rounded-3xl border border-primary/10 shadow-inner">
      <button 
        v-for="i in defaultTotal" 
        :key="i"
        @click="selectCard(i - 1)"
        class="aspect-[3/4] rounded-xl relative overflow-hidden shadow-sm transition-all duration-500 ease-out perspective-1000"
        :class="[
          store.isRevealed || selectedIndex !== null ? 'cursor-default' : 'hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 cursor-pointer hover:ring-2 hover:ring-primary/50',
          store.isRevealed && i - 1 !== selectedIndex && i - 1 !== winningIndex ? 'opacity-40 grayscale' : '',
          store.isRevealed && i - 1 === winningIndex ? 'z-10 ring-4 ring-[#90C078] scale-105' : ''
        ]"
      >
        <div 
          class="w-full h-full transition-transform duration-700 transform-style-3d relative"
          :class="{ 'rotate-y-180': store.isRevealed && (i - 1 === selectedIndex || i - 1 === winningIndex) || (selectedIndex === i - 1 && !store.isRevealed) }"
        >
          <!-- Bagian Belakang Kartu (Motif) -->
          <div class="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-[#90C078] to-[#609060] border-2 border-[#304830]/20 flex flex-col items-center justify-center p-2 shadow-inner">
             <div class="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center relative overflow-hidden p-2">
                <img src="/source/ketupat.png" alt="Ketupat" class="w-full h-full object-contain filter drop-shadow opacity-90" />
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
             </div>
          </div>
          
          <!-- Bagian Depan Kartu (Isi) -->
          <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-card border flex items-center justify-center shadow-md p-2 sm:p-3"
               :class="i - 1 === winningIndex ? 'border-[#90C078] bg-[#C0D890]/20 dark:bg-[#C0D890]/10 ring-inset ring-2 ring-[#90C078]/50' : 'border-border bg-accent/20'">
            
            <div v-if="i - 1 === winningIndex" class="flex flex-col items-center gap-2 sm:gap-3 text-center w-full">
              <Icon icon="lucide:party-popper" class="w-8 h-8 sm:w-10 sm:h-10 text-[#609060] animate-bounce filter drop-shadow-sm" style="animation-duration: 2s" />
              <div class="px-1 py-1 sm:px-2 sm:py-1.5 bg-[#90C078]/20 dark:bg-[#90C078]/30 rounded-md w-full border border-[#90C078]/30">
                <span class="text-[0.7rem] sm:text-xs block text-[#304830] dark:text-[#C0D890] uppercase tracking-widest mb-0.5">Selamat!</span>
                <span class="text-xs sm:text-sm font-bold text-[#304830] dark:text-white leading-tight block truncate">
                  {{ formatRupiah(nominal) }}
                </span>
              </div>
            </div>
            
            <div v-else class="flex flex-col items-center gap-2 text-muted-foreground opacity-60">
              <Icon icon="lucide:wind" class="w-8 h-8 sm:w-10 sm:h-10 grayscale opacity-80" />
              <span class="text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest">Kosong</span>
            </div>
          </div>
        </div>
      </button>
    </div>
    
    <div class="mt-4 h-10 w-full flex justify-center">
       <transition enter-active-class="animate-in fade-in slide-in-from-bottom-2" leave-active-class="animate-out fade-out">
          <p v-if="!store.isRevealed && selectedIndex === null" class="flex items-center gap-2 text-sm font-bold text-primary animate-pulse bg-primary/10 px-5 py-2.5 rounded-full ring-1 ring-primary/20">
            Pilih satu kartu keberuntungan Anda! <Icon icon="lucide:target" class="w-5 h-5" />
          </p>
       </transition>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
</style>
