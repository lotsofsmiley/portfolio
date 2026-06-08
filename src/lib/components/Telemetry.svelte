<script lang="ts">
	import { onMount } from 'svelte';

	let scrollY = $state(0);
	let entered = $state(false);

	onMount(() => {
		requestAnimationFrame(() => (entered = true));
		const onScroll = () => (scrollY = window.scrollY);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// present on every page, but fades out fast as you scroll (so it never collides
	// with the page heading) and fades back in at the top. Scroll-linked = no lag.
	const op = $derived(Math.max(0, Math.min(1, 1 - scrollY / 38)));
</script>

<!-- top-left status readout — on every page; fades on scroll to stay out of the text -->
<div class="telem" class:entered style="opacity: {op}" aria-hidden="true">
	<span class="led"></span><span class="s">system online</span><br />
	node: ag-core · Porto, PT · 41.1°N<br />
	uptime 99.98% · since 2024
</div>

<style>
	.telem {
		position: fixed;
		top: 28px;
		left: 34px;
		z-index: 5;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--dim);
		line-height: 1.85;
		pointer-events: none;
		transform: translateY(-4px);
		transition: transform 0.5s ease;
	}
	.telem.entered {
		transform: none;
	}
	.s {
		color: var(--sig);
	}
	.led {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--sig);
		box-shadow: 0 0 8px var(--sig);
		margin-right: 7px;
		animation: blink 2.6s infinite;
	}
	@keyframes blink {
		0%,
		93%,
		100% {
			opacity: 1;
		}
		96% {
			opacity: 0.3;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.telem {
			transition: none;
		}
		.led {
			animation: none;
		}
	}
	@media (max-width: 640px) {
		.telem {
			font-size: 10px;
			top: 18px;
			left: 20px;
		}
	}
</style>
