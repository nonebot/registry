<script setup lang="ts">
import { NLayoutHeader } from "naive-ui";

import GithubButton from "@/components/GithubButton.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import Statistic from "@/components/statistic/Statistic.vue";
</script>

<template>
  <n-layout-header class="py-4" bordered>
    <div class="mx-auto lg:max-w-[90rem] max-w-3xl">
      <div class="px-4 sm:px-6 md:px-8 flex items-center">
        <a
          class="flex items-center decoration-inherit no-underline text-inherit flex-1"
          target="_self"
          href="/"
        >
          <img
            class="mr-1"
            src="https://nonebot.dev/logo.png"
            alt="Logo"
            width="30"
            height="30"
          />
          <span class="text-lg">商店测试结果</span>
        </a>
        <div class="flex items-center" :span="1">
          <div class="flex items-center gap-3">
            <GithubButton />
            <Statistic />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped></style>
