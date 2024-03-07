<script setup>

definePageMeta (
{
    title: "Redirect...",
});

onMounted (async () =>
{
    await navigateTo ("/auth/login");
});

</script>

<template></template>
