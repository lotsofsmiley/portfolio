<script lang="ts">
	import { onMount } from 'svelte';
	import { ui } from '$lib/ui.svelte';

	// vivid on the index (where the graph is the hero), faint ambience elsewhere
	let { dim = false }: { dim?: boolean } = $props();

	// hover only reacts when the graph is the foreground hero:
	// on the index (not dimmed) AND with no overlay (palette) open.
	let hoverable = true;
	$effect(() => {
		hoverable = !dim && !ui.paletteOpen;
	});

	let canvas: HTMLCanvasElement;

	type Node = {
		x: number;
		y: number;
		r: number;
		core?: boolean;
		label?: string;
		ph: number;
		sp: number;
		hl: number; // 0..1 hover highlight, eased
	};

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
		const css = getComputedStyle(document.documentElement);
		const SIG = css.getPropertyValue('--sig').trim() || '#ff6a45';
		const RGB = css.getPropertyValue('--sig-rgb').trim() || '255,106,69';
		const BG = css.getPropertyValue('--bg').trim() || '#0a0c0d';

		let W = 0,
			H = 0,
			DPR = 1,
			raf = 0,
			mx = -1e4,
			my = -1e4;

		function size() {
			DPR = Math.min(window.devicePixelRatio || 1, 2);
			W = canvas.width = window.innerWidth * DPR;
			H = canvas.height = window.innerHeight * DPR;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
		}
		size();
		const onResize = () => size();
		const onMove = (e: MouseEvent) => {
			mx = e.clientX;
			my = e.clientY;
		};
		const onLeave = () => {
			mx = my = -1e4;
		};
		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMove, { passive: true });
		document.addEventListener('mouseleave', onLeave);

		const N: Node[] = [
			{ x: 0.6, y: 0.5, r: 9, core: true, ph: 0, sp: 0, hl: 0 },
			{ x: 0.79, y: 0.29, r: 5, label: 'web', ph: 0, sp: 0, hl: 0 },
			{ x: 0.92, y: 0.45, r: 5, label: 'data', ph: 0, sp: 0, hl: 0 },
			{ x: 0.86, y: 0.66, r: 5, label: 'infra', ph: 0, sp: 0, hl: 0 },
			{ x: 0.69, y: 0.75, r: 5, label: 'automation', ph: 0, sp: 0, hl: 0 },
			{ x: 0.94, y: 0.31, r: 4, label: 'commerce', ph: 0, sp: 0, hl: 0 }
		];
		const E = [
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
			[2, 5],
			[1, 5],
			[3, 2]
		];
		N.forEach((n) => {
			n.ph = Math.random() * 6.28;
			n.sp = 0.35 + Math.random() * 0.4;
		});
		const packets = E.map(() => ({ t: Math.random(), sp: 0.1 + Math.random() * 0.16 }));
		const start = performance.now();

		function pos(n: Node): [number, number] {
			return [(n.x + Math.cos(n.ph) * 0.006) * W, (n.y + Math.sin(n.ph) * 0.008) * H];
		}

		const HIT = 52; // hover radius in CSS px

		function dot(x: number, y: number, r: number, color: string) {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 6.28);
			ctx.fill();
		}

		function draw(now: number) {
			const t = (now - start) / 1000;
			ctx.clearRect(0, 0, W, H);
			const reveal = reduce ? 1 : Math.min(1, (t - 0.8) / 1.1);
			const shown = Math.floor(reveal * N.length + 0.001);

			// eased hover per node
			N.forEach((n, i) => {
				let target = 0;
				if (i < shown && hoverable && mx > -999) {
					const [px, py] = pos(n);
					const dx = px / DPR - mx;
					const dy = py / DPR - my;
					if (dx * dx + dy * dy < HIT * HIT) target = 1;
				}
				n.hl += (target - n.hl) * 0.14;
			});

			// edges + flowing packets (cheap solid fills, no per-frame gradients)
			E.forEach((e, i) => {
				if (e[0] >= shown || e[1] >= shown) return;
				const [ax, ay] = pos(N[e[0]]);
				const [bx, by] = pos(N[e[1]]);
				const h = Math.max(N[e[0]].hl, N[e[1]].hl);
				ctx.lineWidth = (1 + 1.3 * h) * DPR;
				ctx.strokeStyle = h > 0.02 ? `rgba(${RGB},${0.18 + 0.55 * h})` : 'rgba(140,165,180,.16)';
				ctx.beginPath();
				ctx.moveTo(ax, ay);
				ctx.lineTo(bx, by);
				ctx.stroke();
				if (!reduce) {
					const pk = packets[i];
					pk.t += pk.sp * 0.016;
					if (pk.t > 1) pk.t -= 1;
					const px = ax + (bx - ax) * pk.t;
					const py = ay + (by - ay) * pk.t;
					dot(px, py, 5 * DPR, `rgba(${RGB},0.16)`); // halo
					dot(px, py, 2.2 * DPR, `rgba(${RGB},0.9)`); // core
				}
			});

			// nodes
			N.forEach((n, i) => {
				if (i >= shown) return;
				if (!reduce) n.ph += 0.004 * n.sp;
				const [x, y] = pos(n);
				const hl = n.hl;
				if (n.core) {
					const pulse = 1 + Math.sin(t * 1.5) * 0.16;
					// soft layered glow (replaces expensive shadowBlur)
					dot(x, y, n.r * DPR * (3.4 + hl), `rgba(${RGB},${0.06 + 0.06 * hl})`);
					dot(x, y, n.r * DPR * (2.1 + 0.4 * hl), `rgba(${RGB},${0.12 + 0.1 * hl})`);
					// breathing ring
					ctx.strokeStyle = `rgba(${RGB},${0.35 + 0.4 * hl})`;
					ctx.lineWidth = 1.4 * DPR;
					ctx.beginPath();
					ctx.arc(x, y, n.r * DPR * 2.2 * pulse * (1 + 0.25 * hl), 0, 6.28);
					ctx.stroke();
					dot(x, y, n.r * DPR * (1 + 0.15 * hl), SIG);
				} else {
					const r = n.r * DPR * (1 + 0.85 * hl);
					if (hl > 0.04) dot(x, y, r * 2.4, `rgba(${RGB},${0.14 * hl})`); // hover halo
					dot(x, y, r, BG);
					ctx.lineWidth = (1.3 + hl) * DPR;
					ctx.strokeStyle = hl > 0.04 ? `rgba(${RGB},${0.5 + 0.5 * hl})` : 'rgba(190,205,215,.5)';
					ctx.beginPath();
					ctx.arc(x, y, r, 0, 6.28);
					ctx.stroke();
					// label — tints grey → coral on hover
					const lr = Math.round(165 + (255 - 165) * hl);
					const lg = Math.round(180 + (106 - 180) * hl);
					const lb = Math.round(190 + (69 - 190) * hl);
					ctx.fillStyle = `rgba(${lr},${lg},${lb},${0.7 + 0.3 * hl})`;
					ctx.font = `${11 * DPR}px 'IBM Plex Mono',monospace`;
					ctx.fillText(n.label ?? '', x + r + 8 * DPR, y + 4 * DPR);
				}
			});

			raf = requestAnimationFrame(draw);
		}
		raf = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseleave', onLeave);
		};
	});
</script>

<canvas bind:this={canvas} class="net" class:dim aria-hidden="true"></canvas>

<style>
	.net {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 1;
		transition: opacity 0.7s ease;
	}
	.net.dim {
		opacity: 0.22;
	}
	@media (max-width: 820px) {
		.net {
			opacity: 0.32;
		}
		.net.dim {
			opacity: 0.16;
		}
	}
</style>
