import React, { useEffect, useState } from 'react';

import { backendUrl } from '.';

export const CastersLoginRedirect: React.FC = () => {
	const [text, setText] = useState('Loading...');

	useEffect(() => {
		// Successfully logged with the provider
		// Now logging with strapi by using the access_token (given by the provider) in props.location.search
		fetch(`${backendUrl}/api/auth/osu/callback${window.location.hash.replace('#/casters/getToken', '')}`)
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
				}
				return res;
			})
			.then((res) => res.json())
			.then((res) => {
				// Successfully logged with Strapi
				// Now saving the jwt to use it for future authenticated requests to Strapi
				localStorage.setItem('jwt', res.jwt);
				localStorage.setItem('username', res.user.username);
				localStorage.setItem('userId', res.user.id);
				setText('You have been successfully logged in. You will be redirected in a few seconds...');
				// eslint-disable-next-line
				setTimeout(() => (document.location.href = '#/casters'), 3000); // Redirect to homepage after 3 sec
			})
			.catch((err) => {
				console.log(err);
				setText('An error occurred, please see the developer console.');
			});
	}, []);

	return <p>{text}</p>;
};
