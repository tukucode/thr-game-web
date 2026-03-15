<script setup lang="ts">
import Navbar from '@/components/shared/Navbar.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
    <Navbar />
    <RouterView />
    <footer class="py-6 border-t border-border/40 bg-background/50 backdrop-blur">
      <div class="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
        <p class="flex items-center gap-1">
          Produk oleh <a href="https://tukucode.com" target="_blank" class="font-bold text-primary hover:underline">tukucode.com</a>
        </p>
        <div class="flex items-center gap-4">
          <a href="https://github.com/orgs/tukucode/repositories" target="_blank" class="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Icon icon="radix-icons:github-logo" class="w-4 h-4" />
            Repositori GitHub
          </a>
          <span class="opacity-20">|</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>
