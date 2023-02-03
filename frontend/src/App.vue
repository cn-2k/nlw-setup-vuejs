<template>
  <router-view />
</template>

<script setup lang="ts">
import { api } from "./lib/axios";

navigator.serviceWorker
  .register("service-worker.js")
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      const publicKeyRes = await api.get("/push/public_key");

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyRes.data.publicKey,
      });
    }

    await api.post("/push/register", {
      subscription,
    });

    await api.post("/push/send", {
      subscription,
    });
  });
</script>
