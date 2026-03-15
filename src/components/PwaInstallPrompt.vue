<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import gsap from 'gsap'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const showPrompt = ref(false)

const promptRef = ref<HTMLElement | null>(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent standard Chrome install prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e as BeforeInstallPromptEvent
    
    // Show the custom prompt
    showPrompt.value = true
    
    // Animate in
    setTimeout(() => {
      if (promptRef.value) {
        gsap.fromTo(promptRef.value, 
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )
      }
    }, 100)
  })

  window.addEventListener('appinstalled', () => {
    // Log install success
    deferredPrompt.value = null
    showPrompt.value = false
  })
})

const handleInstall = async () => {
  if (!deferredPrompt.value) return

  // Show the install prompt
  deferredPrompt.value.prompt()
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice
  
  if (outcome === 'accepted') {
    deferredPrompt.value = null
    showPrompt.value = false
  }
}

const dismissPrompt = () => {
  if (promptRef.value) {
    gsap.to(promptRef.value, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        showPrompt.value = false
      }
    })
  } else {
    showPrompt.value = false
  }
}
</script>

<template>
  <div v-if="showPrompt" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md px-4 pointer-events-none">
    <div 
      ref="promptRef"
      class="pointer-events-auto bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 overflow-hidden relative group"
    >
      <!-- Background Glow -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full transition-opacity group-hover:opacity-60 duration-500"></div>
      <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-3xl rounded-full transition-opacity group-hover:opacity-60 duration-500"></div>

      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
          <img src="/source/ketupat.png" alt="App Icon" class="w-8 h-8 object-contain drop-shadow-md" />
        </div>
        
        <div class="flex-1">
          <h3 class="font-bold text-base text-foreground leading-tight mb-1">
            Instal THR Game? 🌙
          </h3>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Instal di perangkat kamu untuk pengalaman bermain yang lebih seru dan akses cepat kapanpun!
          </p>
        </div>

        <button 
          @click="dismissPrompt"
          class="p-1.5 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
          aria-label="Tutup"
        >
          <Icon icon="lucide:x" class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="handleInstall"
          class="flex-1 h-11 bg-primary text-primary-foreground font-semibold rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Icon icon="lucide:download-cloud" class="w-4 h-4" />
          Pasang Sekarang
        </button>
        <button 
          @click="dismissPrompt"
          class="px-4 h-11 bg-muted/30 text-muted-foreground font-medium rounded-xl text-sm hover:bg-muted/50 transition-colors"
        >
          Nanti Saja
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-card\/80 {
  background-color: hsl(var(--card) / 0.8);
}
</style>
