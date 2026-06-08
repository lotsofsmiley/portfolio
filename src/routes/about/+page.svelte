<script lang="ts">
	const stack = [
		'TypeScript',
		'Svelte',
		'React',
		'Astro',
		'Drizzle',
		'PostgreSQL',
		'Docker',
		'Proxmox',
		'TrueNAS',
		'n8n',
		'Cloudflare'
	];
</script>

<svelte:head>
	<title>About — António Guimarães</title>
	<meta
		name="description"
		content="António Guimarães — a systems-minded developer from Porto who builds full-stack software and the infrastructure beneath it."
	/>
</svelte:head>

<section class="page">
	<div class="eyebrow rise" style="animation-delay: 0.05s">— the operator</div>
	<h2 class="rise" style="animation-delay: 0.12s">
		I build software and the<br /><span class="g">infrastructure beneath it.</span>
	</h2>

	<div class="prose rise" style="animation-delay: 0.22s">
		<p>
			I'm a systems-minded developer based in <b>Porto</b>. I work across the whole stack — from the
			Postgres schema to the Proxmox cluster to the pixels on the screen — and I like the parts most
			people would rather not think about: the boring, load-bearing systems that have to be there at
			3am.
		</p>
		<p>
			For the last few years I've built and run the internal platforms, self-hosted infrastructure
			and automations for a Douro tourism group: the back-office that keeps three companies in sync,
			the cluster their services live on, and the pipelines that handle the work nobody wants to do
			by hand.
		</p>
		<p>
			Open-source first. Fast by default. I'd rather ship something small and correct than something
			large and impressive — and I think a system you can't observe is a system you don't really
			run.
		</p>
	</div>

	<div class="stack rise" style="animation-delay: 0.3s">
		<div class="lbl">stack</div>
		<div class="chips">
			{#each stack as s (s)}
				<span class="chip">{s}</span>
			{/each}
		</div>
	</div>

	<div class="contact rise" style="animation-delay: 0.38s">
		<a href="mailto:f.guimaraes@adayindouro.com">f.guimaraes@adayindouro.com</a>
		<a href="https://github.com/lotsofsmiley" target="_blank" rel="noopener noreferrer"
			>github.com/lotsofsmiley</a
		>
	</div>
</section>

<style>
	.page {
		max-width: 760px;
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
		line-height: 1.05;
	}
	h2 .g {
		color: var(--dim);
		font-weight: 400;
	}
	.prose {
		margin-top: 6vh;
		max-width: 60ch;
	}
	.prose p {
		color: var(--dim);
		line-height: 1.7;
		font-size: 1.05rem;
		margin-bottom: 1.4em;
	}
	.prose b {
		color: var(--ink);
		font-weight: 500;
	}
	.stack {
		margin-top: 5vh;
	}
	.lbl {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--faint);
		margin-bottom: 16px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
	}
	.chip {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--dim);
		border: 1px solid var(--line);
		border-radius: 30px;
		padding: 7px 14px;
		transition:
			border-color 0.25s,
			color 0.25s;
	}
	.chip:hover {
		border-color: rgba(var(--sig-rgb), 0.5);
		color: var(--ink);
	}
	.contact {
		margin-top: 6vh;
		display: flex;
		gap: 28px;
		flex-wrap: wrap;
		font-family: var(--mono);
		font-size: 13px;
	}
	.contact a {
		color: var(--ink);
		border-bottom: 1px solid var(--line);
		padding-bottom: 3px;
		transition: border-color 0.25s;
	}
	.contact a:hover {
		border-color: var(--sig);
	}
</style>
