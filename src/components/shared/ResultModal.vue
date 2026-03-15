<script setup lang="ts">
import { useTHRGameStore } from "@/stores/thr.store";
import { formatRupiah } from "@/utils/currency";
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const store = useTHRGameStore();

const props = defineProps<{
  nominal: number | null;
}>();

const emit = defineEmits<{
  (e: "next"): void;
}>();

const show = computed(() => store.isRevealed);
</script>

<template>
  <Dialog :open="show">
    <DialogContent
      class="w-full max-w-sm mx-auto overflow-hidden rounded-3xl sm:rounded-3xl border border-border bg-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] [&>button]:hidden"
      @pointer-down-outside="(e) => e.preventDefault()"
      @escape-key-down="(e) => e.preventDefault()"
    >
      <DialogHeader class="hidden">
        <DialogTitle>Hasil Permainan</DialogTitle>
        <DialogDescription>
          Dialog ini menampilkan hasil dari permainan THR.
        </DialogDescription>
      </DialogHeader>

      <!-- Dekorasi cahaya di belakang -->
      <div
        class="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full pointer-events-none"
      ></div>
      <div
        class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none"
      ></div>

      <div class="flex flex-col items-center gap-3 relative z-10 text-center">
        <div
          class="w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center mb-2 animate-bounce shadow-lg"
        >
          <Icon
            icon="lucide:party-popper"
            class="w-10 h-10 text-primary"
          />
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-foreground">
          Alhamdulillah!
        </h2>
        <p class="text-muted-foreground text-base font-medium">
          Anda berhak mendapatkan THR senilai:
        </p>

        <div class="my-4 relative w-full group">
          <div
            class="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors rounded-2xl"
          ></div>
          <div
            class="relative py-5 px-6 bg-muted/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl w-full shadow-inner flex justify-center items-center"
          >
            <span
              class="text-3xl sm:text-4xl font-black text-primary block tracking-tighter drop-shadow-sm"
            >
              {{ props.nominal ? formatRupiah(props.nominal) : "Rp 0" }}
            </span>
          </div>
        </div>

        <Button @click="emit('next')">
          Lanjutkan Permainan <Icon icon="lucide:arrow-right" class="w-6 h-6" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
