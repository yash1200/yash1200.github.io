import type { Attachment } from 'svelte/attachments';

/** Marks an element to fade up once it scrolls into view. `delay` is a stagger index. */
export const reveal =
	(delay = 0): Attachment<HTMLElement> =>
	(el) => {
		el.dataset.reveal = '';
		el.style.setProperty('--d', String(delay));
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				el.dataset.reveal = 'in';
				io.disconnect();
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);
		io.observe(el);
		return () => io.disconnect();
	};
