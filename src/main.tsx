import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { client } from './ApolloClient';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<GoogleOAuthProvider
					clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
					<App />
				</GoogleOAuthProvider>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);
