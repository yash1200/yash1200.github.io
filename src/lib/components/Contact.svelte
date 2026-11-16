<script lang="ts">
	import Copy from 'phosphor-svelte/lib/Copy';
	import Check from 'phosphor-svelte/lib/Check';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
	import XLogo from 'phosphor-svelte/lib/XLogo';
	import MediumLogo from 'phosphor-svelte/lib/MediumLogo';
	import InstagramLogo from 'phosphor-svelte/lib/InstagramLogo';
	import { email, socials } from '#lib/content.js';
	import { reveal } from '#lib/reveal.js';

	const icons = { GitHub: GithubLogo, LinkedIn: LinkedinLogo, X: XLogo, Medium: MediumLogo, Instagram: InstagramLogo };

	let copied = $state(false);
	let failed = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			failed = false;
		} catch {
			failed = true;
		}
		clearTimeout(timer);
		timer = setTimeout(() => ((copied = false), (failed = false)), 2000);
	}
</script>

<section id="contact">
	<div class="container">
		<div class="panel tint shell" {@attach reveal()}>
			<div class="main">
				<h2>Get in touch</h2>
				<p class="lede">Have a role, a project or a question? Email is the fastest way to reach me.</p>
				<a class="email" href="mailto:{email}">{email}</a>
				<div class="actions">
					<a class="btn btn-primary" href="mailto:{email}">Email me <span class="ico"><ArrowUpRight size={16} weight="bold" /></span></a>
					<button class="btn btn-ghost" onclick={copy} aria-live="polite">
						{#if copied}<Check size={18} weight="bold" /> Copied{:else if failed}Copy failed{:else}<Copy size={18} weight="light" /> Copy address{/if}
					</button>
				</div>
			</div>

			<ul class="socials">
				{#each socials as s, i (s.label)}
					{@const Icon = icons[s.label]}
					<li {@attach reveal(i + 1)}>
						<a href={s.href} target="_blank" rel="noreferrer">
							<Icon size={22} weight="light" />
							<span class="name">{s.label}</span>
							<span class="handle">{s.handle}</span>
							<ArrowUpRight size={16} class="arrow" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<footer class="container">
	<p>© {new Date().getFullYear()} Yash Johri</p>
</footer>

<style>
	.panel {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: clamp(32px, 5vw, 72px);
		padding: clamp(28px, 5vw, 64px);
		border-radius: var(--radius);
	}
	h2 {
		margin-bottom: 16px;
	}
	.lede {
		color: var(--muted);
		max-width: 44ch;
		font-size: 1.0625rem;
	}
	.email {
		display: inline-block;
		margin-top: 40px;
		font-size: clamp(1.375rem, 3.2vw, 2.5rem);
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.2;
		overflow-wrap: anywhere;
		background: linear-gradient(var(--accent), var(--accent)) left bottom / 0% 2px no-repeat;
		transition:
			background-size 0.6s var(--ease),
			color 0.3s var(--ease);
	}
	.email:hover {
		color: var(--accent-text);
		background-size: 100% 2px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 28px;
	}
	button {
		font: inherit;
		background: none;
		cursor: pointer;
	}

	.socials {
		align-self: center;
	}
	.socials li + li {
		border-top: 1px solid var(--line);
	}
	.socials a {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
		gap: 14px;
		padding-block: 16px;
		color: var(--muted);
		transition: color 0.3s var(--ease);
	}
	.name {
		color: var(--text);
		font-weight: 500;
		transition: translate 0.4s var(--ease);
	}
	.handle {
		font-family: var(--mono);
		font-size: 0.8125rem;
	}
	.socials :global(.arrow) {
		opacity: 0;
		translate: -6px 0;
		transition:
			opacity 0.3s var(--ease),
			translate 0.4s var(--ease);
	}
	.socials a:hover {
		color: var(--accent-text);
	}
	.socials a:hover .name {
		translate: 4px 0;
	}
	.socials a:hover :global(.arrow),
	.socials a:focus-visible :global(.arrow) {
		opacity: 1;
		translate: 0 0;
	}

	footer {
		padding-block: 28px 40px;
		color: var(--muted);
		font-size: 0.875rem;
	}

	@media (max-width: 899px) {
		.panel {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 479px) {
		.handle {
			display: none;
		}
	}
</style>
