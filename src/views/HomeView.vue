<script setup lang="ts">
import { useTHRStore } from "@/composables/useTHRStore";
import { useRouter } from "vue-router";
import NominalForm from "@/components/setup/NominalForm.vue";
import NominalChip from "@/components/setup/NominalChip.vue";
import GameSwitcher from "@/components/shared/GameSwitcher.vue";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const { config, updateNominals } = useTHRStore();
const router = useRouter();

const addNominal = (nominal: number) => {
  if (config.value.nominals.includes(nominal)) return;
  const newNominals = [...config.value.nominals, nominal];
  updateNominals(newNominals);
};

const removeNominal = (index: number) => {
  const newNominals = [...config.value.nominals];
  newNominals.splice(index, 1);
  updateNominals(newNominals);
};

const startGame = () => {
  if (config.value.nominals.length === 0) return;
  router.push("/game");
};
</script>

<template>
  <main
    class="container py-16 max-w-2xl mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
  >
    <div class="text-center mb-8 sm:mb-12">
      <h1
        class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-foreground drop-shadow-sm"
      >
        Atur
        <span
          class="text-primary bg-primary/10 px-2 rounded-lg mix-blend-multiply dark:mix-blend-screen"
          >Nominal</span
        >
        THR
      </h1>
      <p
        class="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed"
      >
        Tentukan rincian nominal THR yang akan dimainkan. Tambahkan nominal
        secara bertahap di bawah ini.
      </p>
    </div>

    <!-- Section Tutorial / Cara Bermain (Collapsible) -->
    <Accordion
      type="single"
      collapsible
      class="mb-10 w-full max-w-sm mx-auto sm:max-w-none"
    >
      <AccordionItem value="tutorial" class="border-none">
        <AccordionTrigger
          class="w-full flex items-center justify-between p-5 rounded-3xl bg-card backdrop-blur-md border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 group hover:no-underline"
        >
          <div class="flex items-center gap-4 text-foreground">
            <div
              class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <Icon icon="lucide:sparkles" class="w-5 h-5 text-primary" />
            </div>
            <div class="flex flex-col items-start gap-0.5">
              <span class="text-base font-bold tracking-[0.1rem] text-primary"
                >Informasi</span
              >
              <span class="text-xs font-bold text-muted-foreground"
                >Cara Bermain</span
              >
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6 animate-in fade-in slide-in-from-top-4 duration-700 ease-out"
          >
            <Card
              class="group/card relative overflow-hidden flex flex-col items-center text-center rounded-[2rem] bg-card border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader class="pb-2">
                <div
                  class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-2 mx-auto shadow-lg shadow-primary/20 group-hover/card:rotate-12 transition-transform"
                >
                  <Icon
                    icon="lucide:plus-circle"
                    class="w-6 h-6 text-primary-foreground"
                  />
                </div>
                <CardTitle class="text-base font-bold text-foreground">
                  1. Masukkan Nominal
                </CardTitle>
                <CardDescription
                  class="text-sm text-muted-foreground leading-relaxed"
                >
                  Daftarkan rincian uang THR yang ingin Anda bagikan.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              class="group/card relative overflow-hidden flex flex-col items-center text-center rounded-[2rem] bg-card border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader class="pb-2">
                <div
                  class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-2 mx-auto shadow-lg shadow-primary/20 group-hover/card:rotate-12 transition-transform"
                >
                  <Icon
                    icon="lucide:layout-template"
                    class="w-6 h-6 text-primary-foreground"
                  />
                </div>
                <CardTitle class="text-base font-bold text-foreground">
                  2. Pilih Mode
                </CardTitle>
                <CardDescription
                  class="text-sm text-muted-foreground leading-relaxed"
                >
                  Tentukan jenis permainan yang paling seru untuk dimainkan.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              class="group/card relative overflow-hidden flex flex-col items-center text-center rounded-[2rem] bg-card border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader class="pb-2">
                <div
                  class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-2 mx-auto shadow-lg shadow-primary/20 group-hover/card:rotate-12 transition-transform"
                >
                  <Icon
                    icon="lucide:party-popper"
                    class="w-6 h-6 text-primary-foreground"
                  />
                </div>
                <CardTitle class="text-base font-bold text-foreground">
                  3. Bagikan!
                </CardTitle>
                <CardDescription
                  class="text-sm text-muted-foreground leading-relaxed text-balance"
                >
                  Mulai permainan dan buat suasana lebaran makin meriah!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div
      class="grid gap-8 bg-card p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-border/60 relative overflow-hidden"
    >
      <!-- Ornamen Dekorasi BG -->
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      ></div>

      <section class="relative z-10">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-primary rounded-full"></div>
          <h2
            class="text-base font-bold flex items-center gap-2 text-foreground/90"
          >
            Daftar Nominal THR
          </h2>
        </div>
        <NominalForm
          :nominals="config.nominals"
          @add="addNominal"
          class="mb-6"
        />

        <div
          class="flex flex-wrap gap-2.5 min-h-[80px] p-5 bg-muted/40 rounded-2xl border-2 border-dashed border-muted-foreground/25"
        >
          <p
            v-if="config.nominals.length === 0"
            class="text-sm text-muted-foreground flex items-center justify-center w-full min-h-[40px] italic"
          >
            Belum ada nominal yang terdaftar. Yuk, masukkan nominal THR pertama
            Anda!
          </p>
          <NominalChip
            v-for="(n, i) in config.nominals"
            :key="i"
            :nominal="n"
            @remove="removeNominal(i)"
          />
        </div>
      </section>

      <div
        class="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full"
      ></div>

      <section class="relative z-10">
        <GameSwitcher />
      </section>

      <Button
        @click="startGame"
        :disabled="config.nominals.length === 0"
        variant="default"
        size="lg"
      >
        Mulai Permainan
        <Icon icon="lucide:rocket" class="w-6 h-6" />
      </Button>
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
