<script setup lang="ts">
import { ref } from 'vue'
import { useTHRGameStore } from '@/stores/thr.store'
import { formatRupiah } from '@/utils/currency'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  nominal: number
}>()

const store = useTHRGameStore()
const isShaking = ref(false)

const play = () => {
  if (store.isRevealed) return
  isShaking.value = true
  
  setTimeout(() => {
    isShaking.value = false
    store.reveal()
  }, 1000)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[350px] w-full py-8">
    <div 
      class="relative cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
      :class="{ 'animate-shake': isShaking, 'pointer-events-none': store.isRevealed }"
      @click="play"
    >
      <!-- Amplop Tertutup -->
      <div 
        v-if="!store.isRevealed"
        class="w-72 h-44 bg-[#90C078] rounded-xl shadow-xl relative overflow-hidden border-2 border-[#609060] flex items-center justify-center"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent"></div>
        <div class="absolute top-0 w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[90px] border-t-[#C0D890] drop-shadow-md z-10"></div>
        <div class="absolute bottom-0 w-full h-[65%] bg-[#90C078] rounded-b-xl border-t border-[#C0D890] z-0 opacity-90 shadow-inner"></div>
        
        <div class="z-20 w-16 h-16 bg-[#C0D890] rounded-full flex items-center justify-center shadow-lg border-2 border-[#609060] transform transition-transform group-hover:scale-110 overflow-hidden p-2">
          <img src="/source/ketupat.png" alt="Ketupat" class="w-full h-full object-contain filter drop-shadow hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>

      <!-- Amplop Terbuka (Isi uang) -->
      <div 
        v-else 
        class="w-72 h-52 bg-[#90C078] rounded-xl shadow-2xl relative flex items-center justify-center animate-in zoom-in-95 duration-500"
      >
        <!-- Tutup amplop terbuka ke atas -->
        <div class="absolute -top-[72px] w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-b-[80px] border-b-[#C0D890] z-0 opacity-80 filter drop-shadow-sm"></div>
        
        <!-- Uang -->
        <div class="absolute w-64 h-36 bg-[#C0D890]/20 rounded-md border border-[#90C078] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center justify-center -translate-y-12 animate-in slide-in-from-bottom-12 duration-700 delay-150 fill-mode-both z-10 transform -rotate-3 hover:translate-y-[-56px] transition-transform backdrop-blur-sm">
          <div class="text-[0.65rem] text-[#304830]/70 font-bold mb-1 tracking-widest uppercase">Republik Indonesia</div>
          <div class="text-3xl font-black text-[#304830] tracking-tight">{{ formatRupiah(nominal) }}</div>
          <Icon icon="lucide:banknote" class="mt-2 w-10 h-10 text-[#609060] opacity-50" />
        </div>

        <!-- Badan amplop depan -->
        <div class="absolute bottom-0 w-full h-full bg-[#90C078] rounded-xl z-20 shadow-[0_-15px_25px_rgba(0,0,0,0.15)] flex items-end justify-center pb-5 opacity-[0.97] border-t-2 border-[#C0D890]/50">
          <div class="text-[#304830] text-sm font-bold tracking-wider flex items-center gap-2">
            <span><Icon icon="lucide:sparkles" class="inline w-3 h-3" /> THR Ceria <Icon icon="lucide:sparkles" class="inline w-3 h-3" /></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-16 h-10 w-full flex justify-center">
      <transition enter-active-class="animate-in fade-in slide-in-from-bottom-2" leave-active-class="animate-out fade-out">
        <p v-if="!store.isRevealed" class="flex items-center gap-2 text-[#609060] animate-pulse text-sm font-bold bg-[#C0D890]/20 px-4 py-2 rounded-full shadow-sm border border-[#90C078]/30">
          <Icon icon="lucide:mouse-pointer-click" class="w-4 h-4" /> Ketuk amplop untuk membuka
        </p>
      </transition>
    </div>
  </div>
</template>

