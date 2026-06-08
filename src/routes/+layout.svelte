<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import SchematicCanvas from '$lib/components/SchematicCanvas.svelte';
	import Telemetry from '$lib/components/Telemetry.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	let { children } = $props();

	// graph is the hero on the index; faint ambience on content pages
	const dimGraph = $derived(page.url.pathname !== '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- persistent "observable system" shell, shared across every page -->
<SchematicCanvas dim={dimGraph} />
<Telemetry />

<div class="content">
	{@render children()}
</div>

<CommandPalette />

<style>
	.content {
		position: relative;
		z-index: 3;
	}
</style>
