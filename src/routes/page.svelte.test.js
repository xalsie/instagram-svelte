import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Page from './+page.svelte';

describe('Page', () => {
	it('doit afficher la navbar', () => {
		render(Page);
		// Vérifie la présence d'un élément avec le texte Instagram (logo wordmark)
		expect(screen.getByAltText(/instagram wordmark/i)).toBeInTheDocument();
	});

	it('doit afficher le composant Stories', () => {
		render(Page);
		// Vérifie la présence d'un élément qui pourrait appartenir à Stories
		// (à adapter si Stories a un texte ou un alt spécifique)
		expect(screen.getByTestId('stories')).toBeInTheDocument();
	});

	it('doit afficher le composant Feed', () => {
		render(Page);
		// Vérifie la présence d'un élément qui pourrait appartenir à Feed
		expect(screen.getByTestId('feed')).toBeInTheDocument();
	});
});
