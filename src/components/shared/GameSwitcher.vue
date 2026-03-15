<script setup lang="ts">
import { useTHRStore } from "@/composables/useTHRStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

const { config, switchGame } = useTHRStore();

const options = [
  {
    id: "kocok-amplop",
    label: "Kocok Amplop",
    description:
      "Kocok dan pilih amplop keberuntunganmu untuk mendapatkan hadiah kejutan!",
    icon: "lucide:mail",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "buka-kartu",
    label: "Buka Kartu",
    description:
      "Asah instingmu! Cari kartu dengan reward tertinggi di antara pilihan yang ada.",
    icon: "lucide:layout-template",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex items-center gap-3">
      <div
        class="w-1 h-6 bg-primary rounded-full shadow-sm shadow-primary/20"
      ></div>
      <h3 class="text-lg font-extrabold text-foreground/90 tracking-tight">
        Pilih Mode Permainan
      </h3>
    </div>

    <RadioGroup
      :model-value="config.activeGame"
      @update:model-value="(val) => switchGame(val as any)"
      class="flex flex-col gap-4"
    >
      <Field
        v-for="option in options"
        :key="option.id"
        :class="[
          'relative p-2.5 cursor-pointer backdrop-blur-sm border-2 transition-all duration-500 overflow-hidden',
          config.activeGame === option.id
            ? 'border-primary bg-gradient-to-br from-primary/10 via-card to-card shadow-xl shadow-primary/10 scale-[1.01]'
            : 'border-border/40 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-md',
        ]"
        orientation="horizontal"
      >
        <RadioGroupItem
          :value="option.id"
          :id="option.id"
          class="shrink-transition-transform duration-300"
          :class="config.activeGame === option.id ? 'scale-110' : ''"
        />

        <FieldContent>
          <FieldLabel
            :for="option.id"
            class="text-xs sm:text-sm transition-colors duration-300"
            :class="
              config.activeGame === option.id
                ? 'text-primary'
                : 'text-foreground/90'
            "
          >
            {{ option.label }}
          </FieldLabel>
          <FieldDescription
            class="text-xs leading-relaxed transition-opacity duration-300"
            :class="
              config.activeGame === option.id
                ? 'text-foreground/70'
                : 'text-muted-foreground/80'
            "
          >
            {{ option.description }}
          </FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  </div>
</template>

<style scoped>
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
