import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

import chakraTheme from '@/utils/chakraTheme';

import { LoggedScreen } from './components/LoggedScreen';
import { UnloggedScreen } from './components/UnloggedScreen';

export const backendUrl = 'https://roc22-admin.kotworks.cyou';

export const Casters: React.FC = () => {
	const isLogged = !!localStorage.getItem('jwt');

	let returnComponent: React.ReactNode = <LoggedScreen />;
	if (!isLogged) {
		returnComponent = <UnloggedScreen />;
	}

	return <ChakraProvider theme={chakraTheme}>{returnComponent}</ChakraProvider>;
};
