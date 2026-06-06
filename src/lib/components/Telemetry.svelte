<!-- top-left status readout — small "this is a live system" signal -->
<div class="telem" aria-hidden="true">
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
		opacity: 0;
		animation: fade 1s 0.3s forwards;
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
	@keyframes fade {
		to {
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.telem {
			opacity: 1;
			animation: none;
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
