<script lang="ts">
	import { stack } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';
	import Logo from './Logo.svelte';

	// Brand colour on hover, unless it's too dark to read on the dark theme (Next.js, Rust, Express).
	function brand(hex: string) {
		const n = parseInt(hex, 16);
		const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
		return lum < 0.25 ? 'var(--text)' : `#${hex}`;
	}
</script>

<section id="stack">
	<div class="container">
		<h2 {@attach reveal()}>Tools I reach for</h2>

		<div class="grid">
			{#each stack as g, i (g.group)}
				<div class="card c{i} tint shell" {@attach reveal(i)}>
					<h3>{g.group}</h3>
					<ul class="tools">
						{#each g.items as icon (icon.slug)}
							<li style="--brand: {brand(icon.hex)}">
								<Logo {icon} size={28} />
								<span>{icon.title}</span>
							</li>
						{/each}
					</ul>
					{#if g.skills}
						<ul class="skills">
							{#each g.skills as skill (skill)}
								<li>{skill}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 28px;
	}
	.c0,
	.c1 {
		grid-column: span 6;
	}
	.c2 {
		grid-column: span 5;
	}
	.c3 {
		grid-column: span 4;
	}
	.c4 {
		grid-column: span 3;
	}

	.card {
		padding: 24px;
		border-radius: var(--radius);
	}
	.c0 {
		--tint-angle: 150deg;
		--tint-cool: 10%;
		--tint-warm: 12%;
	}
	.c1 {
		--tint-angle: 210deg;
		--tint-cool: 12%;
		--tint-warm: 14%;
	}
	.c2 {
		--tint-angle: 120deg;
		--tint-cool: 8%;
		--tint-warm: 14%;
	}
	.c3 {
		--tint-angle: 30deg;
		--tint-warm: 18%;
	}
	.c4 {
		--tint-angle: 300deg;
		--tint-cool: 12%;
		--tint-warm: 12%;
	}
	h3 {
		margin-bottom: 20px;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.tools {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
		gap: 8px;
	}
	.tools li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 16px 6px 14px;
		border-radius: 12px;
		text-align: center;
		transition:
			background-color 0.3s var(--ease),
			translate 0.4s var(--ease);
	}
	.tools li :global(svg) {
		color: var(--muted);
		transition:
			color 0.3s var(--ease),
			scale 0.4s var(--ease);
	}
	.tools span {
		font-size: 0.8125rem;
		color: var(--muted);
		line-height: 1.3;
		transition: color 0.3s var(--ease);
	}
	.tools li:hover {
		background: var(--surface-2);
		translate: 0 -2px;
	}
	.tools li:hover :global(svg) {
		color: var(--brand);
		scale: 1.1;
	}
	.tools li:hover span {
		color: var(--text);
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 16px;
	}
	.skills li {
		padding: 6px 12px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent-text);
		font-family: var(--mono);
		font-size: 0.75rem;
	}

	@media (max-width: 1023px) {
		.c0,
		.c1,
		.c2,
		.c3 {
			grid-column: span 6;
		}
		.c4 {
			grid-column: span 12;
		}
	}
	@media (max-width: 767px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.card {
			grid-column: auto !important;
			padding: 20px;
		}
		.tools {
			grid-template-columns: repeat(4, 1fr);
			gap: 4px;
		}
		.tools li {
			padding: 12px 2px;
		}
		.tools span {
			font-size: 0.75rem;
		}
	}
</style>
