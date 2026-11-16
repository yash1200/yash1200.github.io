<script lang="ts">
	import { email } from '#lib/content.js'
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight'
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo'
</script>

<section class="hero" id="top">
	<div class="container grid">
		<div class="copy">
			<p class="badge fade" style="--t: 0ms">Senior full-stack & AI engineer</p>
			<h1 class="fade" style="--t: 90ms">Yash<br />Johri</h1>
			<p class="sub fade" style="--t: 220ms">
				7 years shipping payment systems, AI tutors, and voice and video
				pipelines for fast-moving startups. Two-time ACM-ICPC Regionalist.
			</p>
			<div class="ctas fade" style="--t: 340ms">
				<a class="btn btn-primary" href="mailto:{email}">
					Email me <span class="ico"
						><ArrowUpRight size={16} weight="bold" /></span
					>
				</a>
				<a
					class="btn btn-ghost"
					href="https://github.com/yash1200"
					target="_blank"
					rel="noreferrer"
				>
					<GithubLogo size={18} weight="light" /> GitHub
				</a>
			</div>
		</div>

		<!-- Z-axis cascade: ICPC photo tucked behind the portrait, current roles in front -->
		<div class="stack">
			<figure class="bezel back drop" style="--t: 420ms">
				<div class="core">
					<img
						src="/icpc.jpg"
						alt="Yash at ICPC 2019-20, holding a CodeChef frame"
						width="460"
						height="460"
					/>
				</div>
			</figure>
			<figure class="bezel front drop" style="--t: 300ms">
				<div class="core">
					<img
						src="/profile.jpg"
						alt="Yash Johri smiling at his desk"
						width="800"
						height="1000"
						fetchpriority="high"
					/>
				</div>
			</figure>
			<div class="bezel now drop" style="--t: 560ms">
				<div class="core">
					<p class="label">
						<span class="live" aria-hidden="true"></span>Currently
					</p>
					<dl>
						<div>
							<dt>SpaceXAI</dt>
							<dd>Software Engineering Specialist</dd>
						</div>
						<div>
							<dt>Arise</dt>
							<dd>SDE, Full Stack</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(40px, 6vw, 88px) clamp(72px, 9vw, 128px);
		overflow-x: clip; /* the tilted back card may poke past the container edge */
	}
	.grid {
		display: grid;
		grid-template-columns: 7fr 5fr;
		gap: clamp(40px, 6vw, 96px);
		align-items: center;
	}

	.badge {
		display: inline-flex;
		padding: 6px 14px;
		border-radius: 999px;
		font-size: 0.6875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--accent-text);
		background: var(--accent-soft);
		box-shadow: inset 0 0 0 1px
			color-mix(in oklab, var(--accent) 30%, transparent);
	}
	h1 {
		margin-top: 28px;
		font-size: clamp(4rem, 9vw, 8.5rem);
		font-weight: 600;
		letter-spacing: -0.06em;
		line-height: 0.88;
	}
	.sub {
		margin-top: 32px;
		max-width: 40ch;
		font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
		color: var(--muted);
		line-height: 1.55;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 40px;
	}

	/* Cascade */
	.stack {
		position: relative;
		justify-self: end;
		width: 100%;
		max-width: 440px;
		padding: 56px 0 72px 40px;
	}
	.front {
		position: relative;
		z-index: 1;
		rotate: -2deg;
		transition:
			rotate 0.9s var(--ease),
			translate 0.9s var(--ease);
	}
	.front .core {
		aspect-ratio: 4 / 5;
	}
	.back {
		--r: 22px;
		position: absolute;
		top: 0;
		right: -28px;
		width: 52%;
		rotate: 7deg;
		transition:
			rotate 0.9s var(--ease),
			translate 0.9s var(--ease);
	}
	.back .core {
		aspect-ratio: 1;
	}
	figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.now {
		--r: 20px;
		position: absolute;
		z-index: 2;
		left: 0;
		bottom: 28px;
		width: min(260px, 70%);
		background: color-mix(in oklab, var(--surface) 60%, transparent);
		transition: translate 0.9s var(--ease);
	}
	.now .core {
		padding: 16px 18px;
		background: var(--surface);
	}
	.label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.75rem;
		color: var(--muted);
	}
	.live {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-soft);
	}
	dl {
		display: grid;
		gap: 10px;
		margin-top: 12px;
	}
	dt {
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	dd {
		margin: 0;
		font-size: 0.8125rem;
		color: var(--muted);
	}
	/* Fan out on hover */
	.stack:hover .front {
		rotate: 0deg;
		translate: -6px 0;
	}
	.stack:hover .back {
		rotate: 12deg;
		translate: 18px -8px;
	}
	.stack:hover .now {
		translate: -10px -6px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.fade {
			animation: rise 1s var(--ease) var(--t) both;
		}
		.drop {
			animation: drop 1.2s var(--ease) var(--t) both;
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 40px;
			filter: blur(10px);
		}
	}
	@keyframes drop {
		from {
			opacity: 0;
			transform: translateY(60px) scale(0.94);
			filter: blur(8px);
		}
	}

	@media (max-width: 899px) {
		.grid {
			grid-template-columns: 1fr;
		}
		/* No rotations or overlaps on small screens */
		.stack {
			justify-self: stretch;
			max-width: 420px;
			padding: 0;
			display: grid;
			gap: 12px;
		}
		.front,
		.stack:hover .front {
			rotate: 0deg;
			translate: none;
		}
		.back {
			display: none;
		}
		.now,
		.stack:hover .now {
			position: static;
			width: 100%;
			translate: none;
		}
	}
</style>
