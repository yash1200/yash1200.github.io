<script lang="ts">
	let { icon, size = 24 }: { icon: { path: string }; size?: number } = $props();
</script>

<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
	<path d={icon.path} />
</svg>
