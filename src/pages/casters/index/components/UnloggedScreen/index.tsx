import { Button, Container } from '@chakra-ui/react';

import { backendUrl } from '../..';

export const UnloggedScreen: React.FC = () => (
	<Container w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
		<a href={`${backendUrl}/api/connect/osu`}>
			<Button colorScheme="pink">Зайти через osu!</Button>
		</a>
	</Container>
);
