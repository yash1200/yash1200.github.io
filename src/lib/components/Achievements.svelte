<script lang="ts">
	import Star from 'phosphor-svelte/lib/Star';
	import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
	import { siCodeforces, siCodechef } from 'simple-icons';
	import { reveal } from '#lib/reveal.js';
	import Logo from './Logo.svelte';

	const icpc = [
		{ year: '2020', regional: 120, india: 350 },
		{ year: '2019', regional: 90, india: 584 }
	];
</script>

<section>
	<div class="container">
		<h2 {@attach reveal()}>Achievements</h2>

		<div class="panel tint shell" {@attach reveal(1)}>
			<div class="icpc">
				<p class="big"><span>2×</span> ACM-ICPC Regionalist</p>
				<p class="lede">Ranked first in my university both years I competed.</p>

				<table>
					<thead>
						<tr><th scope="col">Year</th><th scope="col">Regionals</th><th scope="col">India</th></tr>
					</thead>
					<tbody>
						{#each icpc as row, i (row.year)}
							<tr {@attach reveal(i + 2)}>
								<th scope="row">{row.year}</th>
								<td>#{row.regional}</td>
								<td>#{row.india}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<ul class="side">
				<li {@attach reveal(2)}>
					<span class="icon"><Logo icon={siCodeforces} size={20} /></span>
					<div>
						<p class="value">1532</p>
						<p class="label">Codeforces Specialist</p>
					</div>
				</li>
				<li {@attach reveal(3)}>
					<span class="icon"><Logo icon={siCodechef} size={20} /></span>
					<div>
						<p class="value">4<Star size="0.8em" weight="fill" /></p>
						<p class="label">CodeChef</p>
					</div>
				</li>
				<li {@attach reveal(4)}>
					<span class="icon"><GraduationCap size={20} /></span>
					<div>
						<p class="school">Jamia Millia Islamia</p>
						<p class="label">B.Tech, Computer Engineering</p>
						<p class="label">2018 - 2022, GPA 8.33</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.panel {
		display: grid;
		grid-template-columns: 1.45fr 1fr;
		border-radius: var(--radius);
		--tint-angle: 100deg;
		--tint-cool: 12%;
		--tint-warm: 16%;
		--tint-mid: 50%;
		overflow: hidden;
	}
	.icpc {
		padding: clamp(28px, 4vw, 48px);
	}
	.big {
		font-size: clamp(1.75rem, 3.4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.1;
	}
	.big span {
		color: var(--accent-text);
	}
	.lede {
		margin-top: 12px;
		color: var(--muted);
	}
	table {
		width: 100%;
		margin-top: 40px;
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
	}
	thead th {
		padding-bottom: 12px;
		text-align: left;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 400;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	tbody tr {
		border-top: 1px solid var(--line);
	}
	tbody th,
	td {
		padding-block: 18px;
		text-align: left;
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	tbody th {
		color: var(--muted);
		font-weight: 500;
		font-size: 1rem;
		letter-spacing: 0;
		width: 22%;
	}

	.side {
		display: grid;
		border-left: 1px solid var(--line);
	}
	.side li {
		display: flex;
		gap: 18px;
		align-items: flex-start;
		padding: clamp(24px, 3vw, 36px);
	}
	.side li + li {
		border-top: 1px solid var(--line);
	}
	.icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: var(--accent-soft);
		color: var(--accent-text);
	}
	.value {
		display: flex;
		align-items: center;
		gap: 2px;
		font-size: clamp(2rem, 3.4vw, 2.75rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.value :global(svg) {
		color: var(--accent-text);
	}
	.school {
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: -0.015em;
	}
	.label {
		margin-top: 6px;
		color: var(--muted);
		font-size: 0.9375rem;
	}
	.school + .label {
		margin-top: 4px;
	}
	.label + .label {
		margin-top: 0;
	}

	@media (max-width: 899px) {
		.panel {
			grid-template-columns: 1fr;
		}
		.side {
			border-left: 0;
			border-top: 1px solid var(--line);
		}
	}
</style>
