/// <reference types="vite/client" />
declare module 'react-google-maps';
declare module '*.md';

interface ImportMetaEnv {
	readonly REACT_APP_URL: string;
	readonly REACT_APP_API_URL: string;
	readonly REACT_APP_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
