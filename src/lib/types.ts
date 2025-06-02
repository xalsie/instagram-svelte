// Types utilitaires pour le client
export interface UserLite {
	_id: string;
	username: string;
	src?: string;
	role?: string;
	email?: string;
	followers?: Array<string>;
	following?: Array<string>;
	// Ajoutez ici les autres champs nécessaires côté client
}
