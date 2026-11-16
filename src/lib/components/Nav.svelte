<script lang="ts">
	import { email } from '#lib/content.js';

	const links = [
		{ href: '#work', label: 'Work' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#stack', label: 'Stack' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header>
	<nav aria-label="Primary">
		<a href="#top" class="brand">Yash Johri</a>
		<ul>
			{#each links as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
		<a class="btn btn-primary cta" href="mailto:{email}">Email me</a>
	</nav>
</header>

<style>
	/* Floating island: the header is a transparent rail, only the pill takes clicks */
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		padding: 16px 16px 0;
		pointer-events: none;
	}
	nav {
		pointer-events: auto;
		display: flex;
		align-items: center;
		gap: 28px;
		padding: 6px 6px 6px 22px;
		border-radius: 999px;
		background: color-mix(in oklab, var(--surface) 72%, transparent);
		backdrop-filter: blur(18px) saturate(160%);
		-webkit-backdrop-filter: blur(18px) saturate(160%);
		box-shadow:
			inset 0 0 0 1px var(--line),
			inset 0 1px 0 rgb(255 255 255 / 0.06),
			0 20px 40px -24px rgb(8 12 16 / 0.4);
	}
	.brand {
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	ul {
		display: flex;
		gap: 2px;
	}
	ul a {
		display: block;
		padding: 8px 14px;
		border-radius: 999px;
		color: var(--muted);
		font-size: 0.9375rem;
		transition:
			color 0.4s var(--ease),
			background-color 0.4s var(--ease);
	}
	ul a:hover {
		color: var(--text);
		background: color-mix(in oklab, var(--text) 7%, transparent);
	}
	.cta {
		height: 40px;
		padding-inline: 18px;
		font-size: 0.9375rem;
	}
	@media (max-width: 767px) {
		nav {
			width: 100%;
			justify-content: space-between;
		}
		ul {
			display: none;
		}
	}
	@media (prefers-reduced-transparency: reduce) {
		nav {
			background: var(--surface);
			backdrop-filter: none;
		}
	}
</style>
