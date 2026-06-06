<svelte:head>
	<title>António Guimarães — systems &amp; software</title>
	<meta
		name="description"
		content="António Guimarães builds the platforms, infrastructure and automations behind a Douro tourism group. Systems &amp; software, from Porto."
	/>
</svelte:head>

<section class="hero">
	<div class="name">
		<div class="kick">systems · software · infrastructure</div>
		<h1>
			António Guimarães<br />
			<span class="g">builds quiet systems.</span>
		</h1>
		<p class="sub">
			The <b>platforms, infrastructure and automations</b> behind a Douro tourism group — engineered
			to be fast, correct, and to run without anyone watching.
		</p>
		<a class="more" href="/work">selected work →</a>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 0 var(--pad);
	}
	.name {
		max-width: 42ch;
	}
	.kick {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--sig);
		margin-bottom: 28px;
		opacity: 0;
		animation: up 1s 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	h1 {
		font-size: clamp(2.4rem, 6vw, 4.6rem);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.025em;
		opacity: 0;
		transform: translateY(14px);
		animation: up 1.1s 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	h1 .g {
		color: var(--dim);
		font-weight: 400;
	}
	.sub {
		font-size: 1.05rem;
		color: var(--dim);
		margin-top: 28px;
		max-width: 40ch;
		line-height: 1.6;
		opacity: 0;
		transform: translateY(14px);
		animation: up 1.1s 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	.sub b {
		color: var(--ink);
		font-weight: 500;
	}
	.more {
		display: inline-flex;
		margin-top: 48px;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.04em;
		color: var(--ink);
		opacity: 0;
		animation: up 1.1s 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transition: color 0.25s;
	}
	.more:hover {
		color: var(--sig);
	}

	@keyframes up {
		to {
			opacity: 1;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.kick,
		h1,
		.sub,
		.more {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>
