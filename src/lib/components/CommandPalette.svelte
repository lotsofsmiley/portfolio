<script lang="ts">
	import { tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto, onNavigate } from '$app/navigation';
	import { ui } from '$lib/ui.svelte';

	type Item = { label: string; meta: string; href: string; ic: string; external?: boolean };

	const items: Item[] = [
		{ label: 'Index', meta: 'home', href: '/', ic: '→' },
		{ label: 'Selected work', meta: 'work', href: '/work', ic: '→' },
		{ label: 'About', meta: 'about', href: '/about', ic: '→' },
		{ label: 'Colophon', meta: "how it's built", href: '/colophon', ic: '→' },
		{
			label: 'Email',
			meta: 'f.guimaraes@adayindouro.com',
			href: 'mailto:f.guimaraes@adayindouro.com',
			ic: '@',
			external: true
		},
		{
			label: 'GitHub',
			meta: 'lotsofsmiley',
			href: 'https://github.com/lotsofsmiley',
			ic: '◇',
			external: true
		}
	];

	let open = $state(false);
	let query = $state('');
	let input = $state<HTMLInputElement | null>(null);
	let selected = $state(0);

	const filtered = $derived(
		items.filter((i) => (i.label + ' ' + i.meta).toLowerCase().includes(query.toLowerCase()))
	);

	async function openPalette() {
		open = true;
		ui.paletteOpen = true; // freeze the canvas while open
		query = '';
		selected = 0;
		await tick();
		input?.focus();
	}
	function closePalette() {
		open = false;
		ui.paletteOpen = false;
	}

	function activate(it: Item) {
		closePalette();
		if (it.external) {
			if (it.href.startsWith('mailto:')) window.location.href = it.href;
			else window.open(it.href, '_blank', 'noopener');
		} else {
			goto(it.href);
		}
	}

	function onKey(e: KeyboardEvent) {
		if (!open) {
			const tag = (document.activeElement?.tagName ?? '').toUpperCase();
			const typing = tag === 'INPUT' || tag === 'TEXTAREA';
			// "/" opens — Ctrl/Cmd+K is reserved by every browser, so we deliberately don't use it
			if (e.key === '/' && !typing) {
				e.preventDefault();
				openPalette();
			}
			return;
		}
		// palette open → arrow keys move the selection, Enter activates it
		const n = filtered.length;
		if (e.key === 'Escape') {
			closePalette();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (n) selected = (selected + 1) % n;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (n) selected = (selected - 1 + n) % n;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (n) activate(filtered[Math.min(selected, n - 1)]);
		}
	}

	// close on client-side navigation
	onNavigate(() => {
		open = false;
		ui.paletteOpen = false;
	});
</script>

<svelte:window onkeydown={onKey} />

<button class="pill" onclick={openPalette} aria-label="Open command menu">
	<span class="led"></span> search <span class="k">/</span>
</button>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="scrim" transition:fade={{ duration: 150 }} onclick={closePalette}></div>
	<div
		class="pal"
		role="dialog"
		aria-modal="true"
		aria-label="Command menu"
		transition:scale={{ duration: 180, start: 0.97, easing: cubicOut, opacity: 0 }}
	>
		<input
			bind:this={input}
			bind:value={query}
			oninput={() => (selected = 0)}
			type="text"
			name="q"
			placeholder="Type a page or action…"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			data-bwignore
			data-1p-ignore
			data-lpignore="true"
			data-form-type="other"
		/>
		<div class="list">
			{#each filtered as it, i (it.href)}
				<a
					href={it.href}
					class:sel={i === selected}
					onmouseenter={() => (selected = i)}
					onclick={closePalette}
					target={it.external ? '_blank' : undefined}
					rel={it.external ? 'noopener noreferrer' : undefined}
				>
					<span class="ic">{it.ic}</span>{it.label}<span class="meta">{it.meta}</span>
				</a>
			{/each}
			{#if filtered.length === 0}
				<div class="empty">no matches</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.pill {
		position: fixed;
		right: 26px;
		bottom: 26px;
		z-index: 20;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 11px 16px;
		border: 1px solid var(--line);
		border-radius: 30px;
		background: rgba(16, 19, 21, 0.92);
		cursor: pointer;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--dim);
		letter-spacing: 0.04em;
		opacity: 0;
		animation: rise 1s 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transition: border-color 0.25s;
	}
	.pill:hover {
		border-color: rgba(var(--sig-rgb), 0.5);
	}
	.led {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--sig);
		box-shadow: 0 0 7px var(--sig);
	}
	.k {
		border: 1px solid var(--line);
		border-radius: 5px;
		padding: 2px 8px;
		color: var(--ink);
		font-size: 12px;
	}

	.scrim {
		position: fixed;
		inset: 0;
		z-index: 80;
		/* solid dim — no backdrop-filter: full-screen blur is the expensive part */
		background: rgba(6, 8, 9, 0.68);
	}
	.pal {
		position: fixed;
		top: 22vh;
		left: 50%;
		translate: -50% 0;
		z-index: 81;
		width: min(520px, 90vw);
		background: rgba(15, 18, 20, 0.93);
		border: 1px solid var(--line);
		border-radius: 16px;
		box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.6);
		overflow: hidden;
	}
	.pal input {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: var(--ink);
		padding: 19px 20px;
		font-family: var(--sans);
		font-size: 1.05rem;
		border-bottom: 1px solid var(--line);
	}
	.pal input::placeholder {
		color: var(--faint);
	}
	.list {
		padding: 8px;
	}
	.list a {
		display: flex;
		align-items: center;
		gap: 13px;
		padding: 12px 14px;
		border-radius: 10px;
		color: var(--ink);
		font-size: 0.96rem;
		transition: background 0.15s;
	}
	.list a .ic {
		font-family: var(--mono);
		color: var(--sig);
		width: 16px;
		font-size: 13px;
	}
	.list a .meta {
		margin-left: auto;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--faint);
	}
	.list a:hover,
	.list a.sel {
		background: rgba(var(--sig-rgb), 0.12);
	}
	.empty {
		padding: 14px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--faint);
	}

	@keyframes rise {
		to {
			opacity: 1;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.pill {
			opacity: 1;
			animation: none;
		}
	}
</style>
