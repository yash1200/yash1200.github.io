<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Waveform from 'phosphor-svelte/lib/Waveform';
	import { projects } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';
	import Logo from './Logo.svelte';

	// Spotlight follows the pointer; writes CSS vars directly so nothing re-renders.
	const spotlight: Attachment<HTMLElement> = (el) => {
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			el.style.setProperty('--x', `${e.clientX - r.left}px`);
			el.style.setProperty('--y', `${e.clientY - r.top}px`);
		};
		el.addEventListener('pointermove', move);
		return () => el.removeEventListener('pointermove', move);
	};
</script>

<section id="projects">
	<div class="container">
		<h2 {@attach reveal()}>Things I've built</h2>

		<div class="bento">
			{#each projects as p, i (p.name)}
				<svelte:element
					this={p.href ? 'a' : 'article'}
					href={p.href}
					target={p.href ? '_blank' : undefined}
					rel={p.href ? 'noreferrer' : undefined}
					class="cell c{i} tint shell"
					{@attach spotlight}
					{@attach reveal(i)}
				>
					{#if p.href}
						<span class="go" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
					{/if}
					{#if p.image}
						<img class="shot" src={p.image} alt="" width="200" height="200" loading="lazy" />
					{/if}
					{#if p.wave}
						<span class="mark" aria-hidden="true"><Waveform size={160} /></span>
					{/if}
					{#if p.icon}
						<span class="mark" aria-hidden="true"><Logo icon={p.icon} size={160} /></span>
					{/if}
					<div class="body">
						<h3>{p.name}</h3>
						<p>{p.blurb}</p>
						<ul>
							{#each p.tags as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
					</div>
				</svelte:element>
			{/each}
		</div>
	</div>
</section>

<style>
	.bento {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-auto-rows: minmax(240px, auto);
		gap: 28px;
	}
	.c0 {
		grid-column: span 4;
		grid-row: span 2;
	}
	.c1,
	.c2 {
		grid-column: span 2;
	}
	.c3,
	.c4 {
		grid-column: span 3;
	}

	.cell {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		padding: 28px;
		border-radius: var(--radius);
		transition:
			box-shadow 0.6s var(--ease),
			transform 0.6s var(--ease);
	}
	.cell::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(
			420px circle at var(--x, 50%) var(--y, 50%),
			var(--accent-soft),
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.4s var(--ease);
	}
	.cell:hover {
		--ring: color-mix(in oklab, var(--accent) 55%, var(--line));
	}
	.cell:hover::after {
		opacity: 1;
	}
	a.cell:active {
		transform: scale(0.99);
	}

	/* Each tile tints from a different direction. Mystique runs warmer: its warm
	   corner sits behind the icon, away from the text. */
	.c0 {
		--tint-angle: 45deg;
		--tint-cool: 16%;
		--tint-warm: 26%;
		--tint-mid: 50%;
	}
	.c1 {
		--tint-angle: 200deg;
		--tint-cool: 12%;
		--tint-warm: 16%;
	}
	.c2 {
		--tint-angle: 320deg;
		--tint-warm: 18%;
	}
	.c3 {
		--tint-angle: 120deg;
		--tint-cool: 10%;
		--tint-warm: 14%;
	}
	.c4 {
		--tint-angle: 250deg;
	}

	.mark {
		position: absolute;
		top: -24px;
		right: -24px;
		z-index: -1;
		color: var(--text);
		opacity: 0.06;
		rotate: -12deg;
		transition:
			rotate 0.8s var(--ease),
			opacity 0.4s var(--ease);
	}
	.cell:hover .mark {
		rotate: 0deg;
		opacity: 0.1;
	}

	/* Mystique: the real app icon */
	.shot {
		position: absolute;
		top: clamp(28px, 4vw, 48px);
		right: clamp(28px, 4vw, 48px);
		z-index: -1;
		width: clamp(120px, 15vw, 196px);
		height: auto;
		filter: drop-shadow(0 18px 32px rgb(0 0 0 / 0.28));
		rotate: 6deg;
		transition:
			rotate 0.8s var(--ease),
			scale 0.8s var(--ease);
	}
	.cell:hover .shot {
		rotate: 0deg;
		scale: 1.04;
	}

	/* Linked tiles: arrow in its own island, bottom-right */
	.go {
		position: absolute;
		right: 22px;
		bottom: 22px;
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: 999px;
		color: var(--text);
		background: color-mix(in oklab, var(--text) 8%, transparent);
		box-shadow: inset 0 0 0 1px var(--line);
		transition:
			transform 0.6s var(--ease),
			background-color 0.4s var(--ease),
			color 0.4s var(--ease);
	}
	.cell:hover .go {
		transform: translate(3px, -3px) scale(1.06);
		background: var(--accent);
		color: var(--on-accent);
	}
	.cell:has(.go) .body {
		padding-right: 56px;
	}
	.body {
		max-width: 52ch;
	}
	h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1.375rem;
		font-weight: 600;
		letter-spacing: -0.025em;
	}
	.c0 h3 {
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: -0.04em;
	}
	p {
		margin-top: 10px;
		color: var(--muted);
	}
	.c0 p {
		font-size: 1.125rem;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 18px;
	}
	li {
		font-family: var(--mono);
		font-size: 0.75rem;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--line);
		color: var(--muted);
	}

	@media (max-width: 1023px) {
		.c0 {
			grid-column: span 6;
			grid-row: span 1;
			min-height: 380px;
		}
		.c1,
		.c2,
		.c3,
		.c4 {
			grid-column: span 3;
		}
	}
	@media (max-width: 767px) {
		.bento {
			grid-template-columns: 1fr;
		}
		.cell {
			grid-column: auto !important;
			padding: 24px;
		}
		.shot {
			width: 96px;
		}
	}
</style>
