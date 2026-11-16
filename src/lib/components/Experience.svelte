<script lang="ts">
	import { experience } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';

	let active = $state(0);

	function onkeydown(e: KeyboardEvent) {
		const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
		if (!step) return;
		e.preventDefault();
		active = (active + step + experience.length) % experience.length;
		const tabs = (e.currentTarget as HTMLElement).parentElement!.querySelectorAll<HTMLElement>('[role="tab"]');
		tabs[active].focus();
	}

	// "**x**" in content marks the resume's bold key phrases; odd segments render bold.
	const segments = (text: string) => text.split('**');
</script>

<section id="work">
	<div class="container">
		<h2 {@attach reveal()}>Where I've worked</h2>

		<div class="layout" {@attach reveal(1)}>
			<div class="tabs" role="tablist" aria-label="Companies" aria-orientation="vertical" style="--i: {active}">
				<span class="highlight" aria-hidden="true"></span>
				{#each experience as job, i (job.company)}
					<button
						role="tab"
						id="tab-{i}"
						aria-selected={active === i}
						aria-controls="panel-{i}"
						tabindex={active === i ? 0 : -1}
						onclick={() => (active = i)}
						{onkeydown}
					>
						<span class="company">
							{job.company}
							{#if job.period.endsWith('Present')}<span class="now">Now</span>{/if}
						</span>
						<span class="period">{job.period}</span>
					</button>
				{/each}
			</div>

			<div class="panels">
				{#each experience as job, i (job.company)}
					<div
						class="panel tint shell"
						id="panel-{i}"
						role="tabpanel"
						aria-labelledby="tab-{i}"
						inert={active !== i}
						class:active={active === i}
					>
						<header>
							<h3>{job.role} <span>at {job.company}</span></h3>
							<p class="meta">{job.period}{job.place ? ` · ${job.place}` : ''}</p>
						</header>
						<ul class="points">
							{#each job.points as point (point)}
								<li>
									{#each segments(point) as seg, k (k)}{#if k % 2}<strong>{seg}</strong>{:else}{seg}{/if}{/each}
								</li>
							{/each}
						</ul>
						<ul class="tech" aria-label="Tech used">
							{#each job.tech as t (t)}
								<li>{t}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: clamp(24px, 4vw, 48px);
		align-items: start;
	}

	/* Timeline of companies */
	.tabs {
		--h: 76px;
		position: relative;
		display: flex;
		flex-direction: column;
		padding-left: 28px;
	}
	.tabs::before {
		content: '';
		position: absolute;
		left: 7px;
		top: calc(var(--h) / 2);
		bottom: calc(var(--h) / 2);
		width: 1px;
		background: var(--line);
	}
	.highlight {
		position: absolute;
		left: 28px;
		right: 0;
		top: 0;
		height: var(--h);
		border-radius: var(--radius);
		background: var(--surface);
		border: 1px solid var(--line);
		transform: translateY(calc(var(--i) * var(--h)));
		transition: transform 0.55s var(--ease);
	}
	button {
		all: unset;
		box-sizing: border-box;
		position: relative;
		height: var(--h);
		padding-inline: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
		cursor: pointer;
	}
	/* timeline node */
	button::before {
		content: '';
		position: absolute;
		left: -26px;
		top: 50%;
		width: 11px;
		height: 11px;
		margin-top: -5.5px;
		border-radius: 50%;
		background: var(--bg);
		border: 1.5px solid var(--line);
		transition:
			background-color 0.3s var(--ease),
			border-color 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}
	button[aria-selected='true']::before {
		background: var(--accent);
		border-color: var(--accent);
		box-shadow: 0 0 0 4px var(--accent-soft);
	}
	button:hover::before {
		border-color: var(--accent);
	}
	button:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
		border-radius: var(--radius);
	}
	.company {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 500;
		color: var(--muted);
		transition: color 0.25s var(--ease);
	}
	button:hover .company,
	button[aria-selected='true'] .company {
		color: var(--text);
	}
	.now {
		padding: 1px 8px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent-text);
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 400;
		line-height: 1.6;
	}
	.period {
		font-family: var(--mono);
		font-size: 0.75rem;
		color: var(--muted);
	}

	/* Only the selected company renders, so the section fits its content */
	.panel {
		padding: clamp(28px, 3.5vw, 44px);
		border-radius: var(--radius);
		--tint-angle: 165deg;
		--tint-cool: 10%;
		--tint-warm: 14%;
		--tint-mid: 55%;
	}
	.panel:not(.active) {
		display: none;
	}
	@media (prefers-reduced-motion: no-preference) {
		.panel.active {
			animation: panel-in 0.7s var(--ease) both;
		}
	}
	@keyframes panel-in {
		from {
			opacity: 0;
			translate: 0 14px;
			filter: blur(6px);
		}
	}
	header {
		padding-bottom: 24px;
		border-bottom: 1px solid var(--line);
	}
	h3 {
		font-size: clamp(1.375rem, 2.2vw, 1.75rem);
		font-weight: 600;
		letter-spacing: -0.025em;
		line-height: 1.2;
	}
	h3 span {
		color: var(--accent-text);
	}
	.meta {
		margin-top: 8px;
		font-family: var(--mono);
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.points {
		margin-top: 24px;
		display: grid;
		gap: 14px;
		max-width: 70ch;
	}
	.points li {
		position: relative;
		padding-left: 24px;
		color: var(--muted);
	}
	.points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: calc(0.8em - 1px);
		width: 10px;
		height: 2px;
		background: var(--accent);
	}
	.points strong {
		color: var(--text);
		font-weight: 500;
	}
	.tech {
		margin-top: 28px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tech li {
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent-text);
		font-family: var(--mono);
		font-size: 0.8125rem;
	}

	@media (max-width: 899px) {
		.layout {
			grid-template-columns: 1fr;
		}
		.tabs {
			flex-direction: row;
			gap: 8px;
			overflow-x: auto;
			scrollbar-width: none;
			margin-inline: -16px;
			padding-inline: 16px;
		}
		.tabs::before,
		.highlight,
		button::before {
			display: none;
		}
		button {
			flex: none;
			height: 56px;
			padding-inline: 16px;
			border-radius: var(--radius);
			border: 1px solid var(--line);
			gap: 2px;
		}
		button[aria-selected='true'] {
			background: var(--surface);
			border-color: var(--accent);
		}
	}
</style>
