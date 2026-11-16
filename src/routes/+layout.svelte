<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Yash Johri, Full-stack & AI Engineer</title>
	<meta
		name="description"
		content="Yash Johri is a senior full-stack and AI engineer building web, desktop and AI products end to end."
	/>
	<meta property="og:title" content="Yash Johri, Full-stack & AI Engineer" />
	<meta property="og:description" content="Payment systems, AI tutors, and voice and video pipelines, built end to end." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://yash1200.github.io/" />
	<meta property="og:image" content="https://yash1200.github.io/profile.jpg" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@YashJohri17" />
</svelte:head>

{@render children()}
