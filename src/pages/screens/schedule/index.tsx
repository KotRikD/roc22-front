import React, {useEffect, useState} from 'react';
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";

import styles from './index.module.scss';
import { getSdk, MatchQueryQuery } from "@/graphql/queries/MatchQuery.sdk";
import { graphqlClient } from "@/graphql/client";
import { format } from 'date-fns'
import { ComponentStructuresPlayerFields } from "@/graphql/__generated__/types";

export const Schedule: React.FC = () => {
    const [allMatches, setAllMatches] = useState<null | MatchQueryQuery>(null);

    useEffect(() => {
        const sdk = getSdk(graphqlClient);

        sdk.MatchQuery({
            filter: {
                // @ts-ignore
                date_start: {
                    gte: new Date().toISOString()
                }
            },
            // @ts-ignore
            pagination: {
                limit: 3
            }
        })
            .then((data) => setAllMatches(data))
            .catch(() => console.error("[GQL] can't ask for all matches"))
    }, [])

    if (!allMatches || !allMatches.matches || allMatches.matches.data.length < 1) return null;

    const anyMatchStage = String(allMatches.matches.data[0].attributes?.stage);
    const todayIs = format(new Date(), 'eeee');

    const renderPlayers = (player: ComponentStructuresPlayerFields) => (
        <div className={styles.avatar} key={player.osu_id}>
            <div className={styles.avatar_img} style={{
                backgroundImage: `url("https://a.ppy.sh/${player.osu_id}")`
            }}/>
            <div className={styles.avatar_name}>{player.osu_name}</div>
        </div>
    )

    const renderGroups = allMatches.matches.data.map((match) => (
        <div className={styles.card} key={match.attributes?.lobby_id}>
            <div className={styles.card_name}>
                Group <span className={styles.card_lightName}>{match.attributes?.lobby_id}</span>
            </div>
            <div className={styles.avatars}>
                {
                    // @ts-ignore
                    match.attributes!.players!.map(player => renderPlayers(player))
                }
            </div>
            <div className={styles.card_name}>
                <span className={styles.card_lightName}>{
                    new Date(match.attributes?.date_start).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                }</span> MSK
            </div>
        </div>
    ))

    return (
        <Screen>
            <Header customTextStart={anyMatchStage}/>
            <div className={styles.header}>
                ROC22 - {anyMatchStage} - {todayIs}
            </div>
            <div className={styles.cards}>
                {renderGroups}
            </div>
            <div className={styles.xpPenHolder}>
                <div className={styles.scheduleXpPenWithROC} />
            </div>
        </Screen>
    )
}
