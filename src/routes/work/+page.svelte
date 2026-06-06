<script lang="ts">
	type Project = {
		title: string;
		url?: string;
		desc: string;
		stack?: string;
		status: string;
		live?: boolean;
	};

	const projects: Project[] = [
		{
			title: 'aDayinDouro',
			url: 'https://adayindouro.com',
			desc: 'Marketing site for a Douro wine-tourism group — multilingual, fast, with interactive maps.',
			stack: 'ASTRO · TYPESCRIPT · TAILWIND · LEAFLET',
			status: 'live',
			live: true
		},
		{
			title: 'Portugal Wines Club',
			url: 'https://portugalwines.club',
			desc: 'A membership webapp for a Portuguese wine club — gated monthly subscriptions, payments and adopt-a-vine.',
			stack: 'ASTRO · REACT · TAILWIND · SHADCN/UI · BETTER AUTH · DRIZZLE · POSTGRESQL · STRIPE · RESEND',
			status: 'in progress',
			live: false
		},
		{
			title: 'guimavng.com',
			url: 'https://guimavng.com',
			desc: 'A responsive site for the artist Guima — designed and built from scratch, no framework.',
			stack: 'HTML · SCSS · JAVASCRIPT',
			status: 'live',
			live: true
		},
		{
			title: 'Operations Platform',
			desc: 'Back-office for a three-company tourism group — finance, fleet, stock and commerce in one system.',
			stack: 'ASTRO · REACT · DRIZZLE · POSTGRESQL · BETTER AUTH',
			status: 'deployed',
			live: true
		},
		{
			title: 'Self-hosted Infrastructure',
			desc: 'A Proxmox cluster running 30+ services, with DNS high-availability and full observability.',
			stack: 'PROXMOX · DOCKER · TRUENAS · POSTGRESQL · NGINX',
			status: 'live · 30+ svc',
			live: true
		},
		{
			title: 'Automation Pipelines',
			desc: 'Invoice parsing, alerting and cross-system sync that quietly removes manual work.',
			stack: 'N8N · POSTGRESQL · IMAP · WEBHOOKS',
			status: 'live',
			live: true
		}
	];
</script>

<svelte:head>
	<title>Work — António Guimarães</title>
	<meta name="description" content="Selected sites and systems built and run by António Guimarães." />
</svelte:head>

<section class="page">
	<header>
		<div class="eyebrow rise" style="animation-delay: 0.05s">— selected work</div>
		<h2 class="rise" style="animation-delay: 0.12s">Sites &amp; systems I've built.</h2>
	</header>

	<div class="list">
		{#each projects as p, i (p.title)}
			<article class="row rise" style="animation-delay: {0.2 + i * 0.07}s">
				<div class="n">{String(i + 1).padStart(2, '0')}</div>
				<div class="body">
					<h3>
						{#if p.url}
							<a href={p.url} target="_blank" rel="noopener noreferrer"
								>{p.title}<span class="ext">↗</span></a
							>
						{:else}
							{p.title}
						{/if}
					</h3>
					<p class="desc">{p.desc}</p>
					{#if p.stack}<div class="stack">{p.stack}</div>{/if}
				</div>
				<div class="meta">
					<div class="status" class:live={p.live}><span class="d"></span>{p.status}</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.page {
		max-width: 1040px;
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
		margin-bottom: 7vh;
	}
	.row {
		display: grid;
		grid-template-columns: 44px 1fr auto;
		gap: 28px;
		align-items: start;
		padding: 30px 0;
		border-top: 1px solid var(--line);
		transition: padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.row:last-child {
		border-bottom: 1px solid var(--line);
	}
	.row:hover {
		padding-left: 14px;
	}
	.n {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--faint);
		padding-top: 0.5em;
	}
	.body h3 {
		font-size: clamp(1.3rem, 2.6vw, 1.9rem);
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.body h3 a {
		transition: color 0.25s;
	}
	.row:hover .body h3 a,
	.row:hover .body h3 {
		color: var(--sig);
	}
	.ext {
		font-size: 0.6em;
		vertical-align: 0.4em;
		margin-left: 0.3em;
		color: var(--faint);
		transition: color 0.25s;
	}
	.row:hover .ext {
		color: var(--sig);
	}
	.desc {
		color: var(--dim);
		margin-top: 9px;
		max-width: 52ch;
		line-height: 1.55;
		font-size: 0.97rem;
	}
	.stack {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--faint);
		letter-spacing: 0.06em;
		margin-top: 14px;
		line-height: 1.7;
		max-width: 60ch;
	}
	.meta {
		text-align: right;
		white-space: nowrap;
		padding-top: 0.4em;
	}
	.status {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--dim);
		letter-spacing: 0.05em;
	}
	.status .d {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		border: 1px solid var(--dim);
		margin-right: 6px;
		vertical-align: 1px;
	}
	.status.live .d {
		background: var(--sig);
		border-color: var(--sig);
		box-shadow: 0 0 6px var(--sig);
	}
	@media (max-width: 720px) {
		.row {
			grid-template-columns: 30px 1fr;
		}
		.meta {
			grid-column: 2;
			text-align: left;
			margin-top: 10px;
			padding-top: 0;
		}
		.status {
			display: inline-block;
		}
	}
</style>
