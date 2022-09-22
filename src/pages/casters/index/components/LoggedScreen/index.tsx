import { Avatar, Button, Container, Flex, Text, useColorMode } from '@chakra-ui/react';
import { GraphQLClient } from 'graphql-request';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Devushka from '@/assets/images/devushki_molyatsya.png';
import { MatchEntity } from '@/graphql/__generated__/types';
import { getSdk as getCastersSdk } from '@/graphql/queries/Casters/CastersSDK.sdk';
import { getSdk } from '@/graphql/queries/MatchQuery/MatchQuery.sdk';

export const LoggedScreen: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isBusy, setIsBusy] = useState<boolean>(false);

	const username = localStorage.getItem('username');
	const jwt = localStorage.getItem('jwt');
	const userId = localStorage.getItem('userId');

	const authorizedClient = new GraphQLClient('https://roc22-admin.kotworks.cyou/gql', {
		headers: {
			Authorization: `Bearer ${jwt}`
		}
	});

	const matchesSdk = getSdk(authorizedClient);
	const castersSdk = getCastersSdk(authorizedClient);
	const {
		data: allMatches,
		isLoading,
		error
	} = useQuery('currentMatches', () =>
		matchesSdk.MatchQuery({
			filter: {
				// @ts-ignore
				date_start: {
					gte: new Date().toISOString()
				}
			}
		})
	);

	if (isLoading) {
		return (
			<Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
				<img src={Devushka} alt="Молимся" />
			</Flex>
		);
	}
	if (error) {
		return <>Админка лежит, пните котрика</>;
	}

	const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('username');
		window.location.reload();
	};

	const removeMe = (match: MatchEntity) => () => {
		if (isBusy) {
			console.log('im busY!!!');
			return;
		}

		const staffIds = match.attributes!.staff!.data.map((staff) => staff.id);
		staffIds.splice(staffIds.indexOf(userId), 1);
		console.log(staffIds);
		castersSdk
			.GoToCaster({
				matchID: match.id!,
				newStaff: staffIds
			})
			.then(() => {
				setIsBusy(false);
				window.location.reload();
			})
			.catch(() => window.location.reload());
	};

	const addMe = (match: MatchEntity) => () => {
		if (isBusy) {
			console.log('im busY!!!');
			return;
		}

		const staffIds = match.attributes!.staff!.data.map((staff) => staff.id);
		staffIds.push(userId);
		console.log(staffIds);
		castersSdk
			.GoToCaster({
				matchID: match.id!,
				newStaff: staffIds
			})
			.then(() => {
				setIsBusy(false);
				window.location.reload();
			})
			.catch(() => window.location.reload());
	};

	return (
		<div>
			<Container w="100%" margin="5px">
				<Flex gap="10px">
					<Button onClick={logout} colorScheme="red">
						Продать душу (выйти)
					</Button>
					<Button onClick={toggleColorMode}>Turn {colorMode === 'light' ? 'darkness' : 'lights'}</Button>
				</Flex>
			</Container>
			<Container maxWidth="1000px">
				{allMatches?.matches?.data.map((match, index) => (
					<div key={index} style={{ marginBottom: '20px', border: '1px ' }}>
						<Flex direction="column" background="gray" borderRadius="10px" justifyContent="flex-end" padding="10px">
							<Text fontSize="2xl" fontWeight="600">
								GROUP {match.attributes?.lobby_id}
							</Text>
							<Text fontSize="2xl" fontWeight="600">
								{new Date(match.attributes?.date_start).toLocaleString('ru-RU', {
									timeZone: 'Europe/Moscow'
								})}
							</Text>
							<Flex flexDirection="row" flexWrap="wrap" w="100%" gap="10px">
								{match.attributes?.players?.map((player, index) => (
									<Flex justifyContent="space-between" key={index}>
										<Flex gap="10px" alignItems="center">
											<Avatar name={player!.osu_name} src={`https://a.ppy.sh/${player!.osu_id}`} />{' '}
											<Text fontSize="xl" fontWeight="500">
												{player!.osu_name}
											</Text>
										</Flex>
									</Flex>
								))}
							</Flex>
						</Flex>
						<div style={{ padding: '10px' }}>
							<Text fontSize="md" fontWeight="500" marginBottom="10px">
								Текущие кастеры
							</Text>
							<Flex flexDirection="column" w="100%" gap="10px">
								{match.attributes?.staff?.data.map((staff, index) => (
									<Flex w="100%" justifyContent="space-between" key={index}>
										<Flex gap="10px" alignItems="center">
											<Avatar
												name={staff.attributes?.username}
												src={`https://a.ppy.sh/${staff.attributes?.osu_id}`}
											/>{' '}
											<Text fontSize="xl" fontWeight="500">
												{staff.attributes?.username}
											</Text>
										</Flex>
										{staff.attributes?.username === username ? (
											<Flex>
												<Button onClick={removeMe(match as never)} colorScheme="teal" variant="outline">
													X
												</Button>
											</Flex>
										) : null}
									</Flex>
								))}

								{!match.attributes?.staff?.data.some((staff) => staff.attributes?.username === username) ? (
									<Button onClick={addMe(match as never)} colorScheme="green">
										Продать душу (добавить себя)
									</Button>
								) : null}
							</Flex>
						</div>
					</div>
				))}
			</Container>
		</div>
	);
};
