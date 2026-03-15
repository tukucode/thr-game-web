<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
const showPrompt = ref(false);
const isAppleDevice = ref(false);
const promptRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const ua = window.navigator.userAgent.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const isDebugMode = urlParams.get("debug_pwa") === "true";

  // Detect iOS / iPadOS
  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1);
  // Detect Mac
  const isMac = /macintosh/.test(ua) && !isIOS;
  // Detect Safari (excluding Chrome on iOS/Mac)
  const isSafari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("crios") &&
    !ua.includes("android");
  // Detect Standalone (Installed) Mode
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && (window.navigator as any).standalone);

  // Force show prompt in debug mode
  if (isDebugMode) {
    console.log("🚀 PWA: Debug mode active, forcing prompt");
    isAppleDevice.value = true;
    setTimeout(() => {
      showPrompt.value = true;
      animateIn();
    }, 500);
    return;
  }

  // Handle Apple Devices (iOS or Mac Safari have no beforeinstallprompt)
  if ((isIOS || (isMac && isSafari)) && !isStandalone) {
    console.log("🍎 PWA: Apple device detected, showing manual instructions");
    isAppleDevice.value = true;
    setTimeout(() => {
      showPrompt.value = true;
      animateIn();
    }, 1500);
  } else if (!isStandalone) {
    // Handle Chrome/Android (standard beforeinstallprompt)
    console.log("🌐 PWA: Listening for beforeinstallprompt event");
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("📥 PWA: beforeinstallprompt event received");
      e.preventDefault();
      deferredPrompt.value = e as BeforeInstallPromptEvent;
      showPrompt.value = true;
      animateIn();
    });
  }

  window.addEventListener("appinstalled", () => {
    console.log("✅ PWA: App installed successfully");
    deferredPrompt.value = null;
    showPrompt.value = false;
  });
});

const animateIn = () => {
  setTimeout(() => {
    if (promptRef.value) {
      gsap.fromTo(
        promptRef.value,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      );
    }
  }, 100);
};

const handleInstall = async () => {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;
  if (outcome === "accepted") {
    deferredPrompt.value = null;
    showPrompt.value = false;
  }
};

const dismissPrompt = () => {
  if (promptRef.value) {
    gsap.to(promptRef.value, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        showPrompt.value = false;
      },
    });
  } else {
    showPrompt.value = false;
  }
};
</script>

<template>
  <div
    v-if="showPrompt"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md px-2 pointer-events-none"
  >
    <div
      ref="promptRef"
      class="pointer-events-auto bg-card/90 backdrop-blur-2xl border border-primary/20 rounded-[2rem] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] shadow-primary/10 flex flex-col gap-5 overflow-hidden relative group"
    >
      <!-- Background Glow -->
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full transition-opacity group-hover:opacity-60 duration-500"
      ></div>
      <div
        class="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-3xl rounded-full transition-opacity group-hover:opacity-60 duration-500"
      ></div>

      <div class="flex items-start gap-4 z-10">
        <div
          class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-inner"
        >
          <img
            src="/source/ketupat.png"
            alt="App Icon"
            class="w-10 h-10 object-contain drop-shadow-md p-1"
          />
        </div>

        <div class="flex-1">
          <h3
            class="font-extrabold text-lg text-foreground leading-tight mb-1.5 tracking-tight"
          >
            {{ isAppleDevice ? "Instal THR Game 🍎" : "Pasang THR Game 🌙" }}
          </h3>
          <p
            class="text-xs text-muted-foreground/90 leading-relaxed font-medium"
          >
            {{
              isAppleDevice
                ? "Akses cepat & layar penuh langsung dari perangkat Apple-mu!"
                : "Instal di perangkat kamu untuk pengalaman bermain yang lebih seru dan akses cepat kapanpun!"
            }}
          </p>
        </div>

        <button
          @click="dismissPrompt"
          class="p-2 rounded-full hover:bg-muted/80 text-muted-foreground transition-colors"
          aria-label="Tutup"
        >
          <Icon icon="lucide:x" class="w-5 h-5" />
        </button>
      </div>

      <!-- Safari specific instructions -->
      <div
        v-if="isAppleDevice"
        class="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex flex-col gap-3 z-10"
      >
        <div class="flex items-center gap-3 text-xs font-bold text-primary/80">
          <Icon icon="lucide:info" class="w-4 h-4" />
          CARA INSTAL MANUAL:
        </div>
        <div class="flex flex-col gap-2.5">
          <div
            class="flex items-center gap-4 text-xs font-semibold text-foreground/80"
          >
            <span
              class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary shrink-0"
              >1</span
            >
            <span
              >Tap tombol
              <Icon
                icon="lucide:share"
                class="inline-block w-4 h-4 mx-1 text-primary"
              />
              <b>'Share'</b> di browser kamu</span
            >
          </div>
          <div
            class="flex items-center gap-4 text-xs font-semibold text-foreground/80"
          >
            <span
              class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary shrink-0"
              >2</span
            >
            <span
              >Pilih <b>'Add to Home Screen'</b> atau <b>'Add to Dock'</b>
              <Icon
                icon="lucide:plus-square"
                class="inline-block w-4 h-4 mx-1 text-primary"
            /></span>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center gap-3 z-10">
        <button
          @click="handleInstall"
          class="flex-1 h-12 bg-primary text-primary-foreground font-bold rounded-2xl text-sm shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Icon icon="lucide:download-cloud" class="w-5 h-5" />
          Pasang Sekarang
        </button>
        <button
          @click="dismissPrompt"
          class="px-5 h-12 bg-muted/40 text-muted-foreground font-semibold rounded-2xl text-sm hover:bg-muted/60 transition-colors"
        >
          Nanti Saja
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-card\/90 {
  background-color: hsl(var(--card) / 0.9);
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 3s infinite linear;
}
</style>
