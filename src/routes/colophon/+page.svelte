<script lang="ts">
	const rows: [string, string][] = [
		['Framework', 'SvelteKit — static, fully prerendered'],
		['Styling', 'Hand-written CSS. No UI kit, no template.'],
		['Motion', 'A canvas node-graph + Svelte transitions'],
		['Type', 'Inter Tight · IBM Plex Mono'],
		['Signal', 'One colour — coral / ember (#ff6a45)'],
		['Hosting', 'Cloudflare Pages'],
		['Source', 'github.com/lotsofsmiley/portfolio']
	];
</script>

<svelte:head>
	<title>Colophon — António Guimarães</title>
	<meta name="description" content="How this site is built." />
</svelte:head>

<section class="page">
	<div class="eyebrow rise" style="animation-delay: 0.05s">— colophon</div>
	<h2 class="rise" style="animation-delay: 0.12s">This site is a system too.</h2>
	<p class="lede rise" style="animation-delay: 0.2s">
		No template, no page builder, no component library. Just the same way I build everything else:
		small, fast, observable, and made by hand. The graph behind this page is real code, not a
		picture.
	</p>

	<dl class="spec rise" style="animation-delay: 0.28s">
		{#each rows as [k, v] (k)}
			<div class="line">
				<dt>{k}</dt>
				<dd>{v}</dd>
			</div>
		{/each}
	</dl>

	<p class="foot rise" style="animation-delay: 0.36s">
		Built in Porto by <a href="/about">António Guimarães</a>. Press <kbd>/</kbd> anywhere to navigate.
	</p>
</section>

<style>
	.page {
		max-width: 720px;
		margin: 0 auto;
		padding: clamp(130px, 20vh, 240px) var(--pad) 18vh;
	}
	.eyebrow {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: var(--faint);
		margin-bottom: 18px;
	}
	h2 {
		font-size: clamp(1.9rem, 4.4vw, 3.2rem);
		font-weight: 500;
		letter-spacing: -0.025em;
	}
	.lede {
		margin-top: 28px;
		max-width: 54ch;
		color: var(--dim);
		line-height: 1.7;
		font-size: 1.05rem;
	}
	.spec {
		margin-top: 6vh;
		border-top: 1px solid var(--line);
	}
	.line {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 20px;
		padding: 16px 0;
		border-bottom: 1px solid var(--line);
	}
	dt {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 2px;
	}
	dd {
		font-size: 0.98rem;
		color: var(--ink);
	}
	.foot {
		margin-top: 5vh;
		color: var(--dim);
		font-size: 0.95rem;
		line-height: 1.6;
	}
	.foot a {
		color: var(--ink);
		border-bottom: 1px solid var(--line);
	}
	.foot a:hover {
		border-color: var(--sig);
	}
	kbd {
		font-family: var(--mono);
		font-size: 11px;
		border: 1px solid var(--line);
		border-radius: 5px;
		padding: 2px 7px;
		color: var(--ink);
	}
	@media (max-width: 560px) {
		.line {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
