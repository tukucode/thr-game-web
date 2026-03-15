<script setup lang="ts">
import { useTHRStore } from "@/composables/useTHRStore";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { Button } from '@/components/ui/button'

const { config } = useTHRStore();
const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 leading-none"
  >
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-2 cursor-pointer" @click="goHome">
        <span
          class="font-bold text-xl inline-flex items-center gap-2 text-primary"
        >
          THR Game
        </span>
      </div>
      <div class="flex items-center gap-4">
        <span
          v-if="$route.path === '/game'"
          class="text-xs text-muted-foreground hidden sm:inline-block"
        >
          Mode Permainan:
          <strong class="text-foreground capitalize">{{
            config.activeGame.replace("-", " ")
          }}</strong>
        </span>
        <Button
          v-if="$route.path === '/game'"
          @click="goHome"
          variant="secondary"
          size="sm"
          class="flex items-center gap-2"
        >
          <Icon icon="radix-icons:gear" class="w-4 h-4" /> Ubah Nominal
        </Button>
      </div>
    </div>
  </header>
</template>
