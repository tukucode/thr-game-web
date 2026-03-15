<script setup lang="ts">
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emit = defineEmits<{
  (e: "add", nominal: number): void;
}>();

const rawInput = ref("");
const error = ref("");

const formattedInput = computed({
  get: () => {
    if (!rawInput.value) return "";
    const num = parseInt(rawInput.value.replace(/\D/g, ""), 10);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("id-ID").format(num);
  },
  set: (val) => {
    rawInput.value = val.replace(/\D/g, "");
    if (error.value) error.value = "";
  },
});

const submit = () => {
  const nominal = parseInt(rawInput.value, 10);
  if (isNaN(nominal) || nominal <= 0) {
    error.value = "Mohon masukkan nominal yang sah (contoh: 50.000)";
    return;
  }
  emit("add", nominal);
  rawInput.value = "";
};
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <div class="flex gap-2">
      <div class="relative flex-1 group">
        <Input
          v-model="formattedInput"
          type="text"
          inputmode="tel"
          placeholder="50.000"
          maxlength="15"
          class="pl-[34px] backdrop-blur transition-all font-medium"
        />
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10"
          >Rp</span
        >
      </div>
      <Button type="submit" variant="default" :disabled="!rawInput">
        Tambah
      </Button>
    </div>
    <p v-if="error" class="text-xs text-destructive font-medium">{{ error }}</p>
  </form>
</template>
