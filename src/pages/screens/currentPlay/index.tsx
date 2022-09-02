import React, { useEffect, useState } from "react";
import { getQueryVariable } from "../../../utils/getQueryVariable";
import './index.css';

// interface AppState {
//     scoreVisibleTemp?: boolean;
// }

export const CurrentPlay: React.FC = () => {
    const [state, setState] = useState<any>(null);
    // const [appState, setAppState] = useState<AppState>({});

    /*  
        Короче, давай попробую объяснить что такое useEffect и почему он здесь нужен
        В реакте useEffect, нужен для того, чтобы выполнять любой side effect,
        в обычном js очень сильно можно сравнить с setTimeout, но так как реакт реактивен,
        а значит может обновлять своё состояние 500 миллионов раз в секунду, 
        setTimeout нам не подходит.

        Соответственно, useEffect здесь будет вызван один раз, при первом вызове компонента
    */
    useEffect(() => {
        // @ts-ignore
        const callback = (data) => {
            setState(data);
        }
        window.GOSU.on("data", callback)

        // Здесь я очищаю компонент от слушателя data, аналог в обычном js - clearTimeout(callback)
        return () => {
            console.log("[Current Play] Callback 'data' removed")
            window.GOSU.removeListener("data", callback)
        }
    }, [])
    // "один раз" вызов компонента обеспечивается здесь, вторым аргументом
    // иначе мы бы на каждый перерендер страницы, добавляли бы callback :)
    // более подробно можно почитать на доке реакта

    if (state === null) return null;

    const backendVariable = getQueryVariable('backend');
    const hostBackend = new URL(backendVariable || '').host;

    const { scoreVisible } = state.tourney.manager.bools;

    // if(appState.scoreVisibleTemp !== state.tourney.manager.bools.scoreVisible) {
    //     setAppState({
    //         ...appState,
    //         scoreVisibleTemp: state.tourney.manager.bools.scoreVisible
    //     })
    // }

    // const chatStyle = {
    //     opacity: appState.scoreVisibleTemp ? 0 : 1,
    // }
    // const playerScoreOneStyle = {
    //     opacity: appState.scoreVisibleTemp ? 1 : 0
    // }
    // const playerScoreTwoStyle = {
    //     opacity: appState.scoreVisibleTemp ? 1 : 0
    // }
    // const playerScoreThreeStyle = {
    //     opacity: appState.scoreVisibleTemp ? 1 : 0
    // }
    // const playerScoreFourStyle = {
    //     opacity: appState.scoreVisibleTemp ? 1 : 0
    // }

    const pathToImage = state.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
    const backgroundStyle = {
        backgroundImage: `url('http://${hostBackend}/Songs/${pathToImage}')`
    }

    const mapTitle = `${state.menu.bm.metadata.artist} - ${state.menu.bm.metadata.title}`;
    const mapDifficulty = `${state.menu.bm.metadata.difficulty}`;

    const playerDataOne = [
        state.tourney.ipcClients['0'].spectating.name, 
        `url('https://a.ppy.sh/${state.tourney.ipcClients['0'].spectating.userID}')`,
        state.tourney.ipcClients['0'].gameplay.score
    ];
    const playerDataTwo = [
        state.tourney.ipcClients['1'].spectating.name, 
        `url('https://a.ppy.sh/${state.tourney.ipcClients['1'].spectating.userID}')`,
        state.tourney.ipcClients['1'].gameplay.score,
    ];
    const playerDataThree = [
        state.tourney.ipcClients['2'].spectating.name, 
        `url('https://a.ppy.sh/${state.tourney.ipcClients['2'].spectating.userID}')`,
        state.tourney.ipcClients['2'].gameplay.score
    ]; 
    const playerDataFour = [
        state.tourney.ipcClients['3'].spectating.name, 
        `url('https://a.ppy.sh/${state.tourney.ipcClients['3'].spectating.userID}')`,
        state.tourney.ipcClients['3'].gameplay.score
    ];

    var testScoreMassive = [
        [state.tourney.ipcClients['0'].gameplay.score],
        [state.tourney.ipcClients['1'].gameplay.score],
        [state.tourney.ipcClients['2'].gameplay.score],
        [state.tourney.ipcClients['3'].gameplay.score]    
    ];
    console.log(testScoreMassive);
    
    var Or1, Or2, Or3, Or4, Sb1, Sb2, Sb3, Sb4;

    if (testScoreMassive[0] === state.tourney.ipcClients['0'].gameplay.score) { Or1 = "setOrder4"; Sb1 = Number(testScoreMassive[0])-Number(testScoreMassive[3])}
    if (testScoreMassive[0] === state.tourney.ipcClients['1'].gameplay.score) { Or2 = "setOrder4"; Sb2 = Number(testScoreMassive[0])-Number(testScoreMassive[3])}
    if (testScoreMassive[0] === state.tourney.ipcClients['2'].gameplay.score) { Or3 = "setOrder4"; Sb3 = Number(testScoreMassive[0])-Number(testScoreMassive[3])}
    if (testScoreMassive[0] === state.tourney.ipcClients['3'].gameplay.score) { Or4 = "setOrder4"; Sb4 = Number(testScoreMassive[0])-Number(testScoreMassive[3])}

    if (testScoreMassive[1] === state.tourney.ipcClients['0'].gameplay.score) { Or1 = "setOrder3"; Sb1 = Number(testScoreMassive[0])-Number(testScoreMassive[2])}
    if (testScoreMassive[1] === state.tourney.ipcClients['1'].gameplay.score) { Or2 = "setOrder3"; Sb2 = Number(testScoreMassive[0])-Number(testScoreMassive[2])}
    if (testScoreMassive[1] === state.tourney.ipcClients['2'].gameplay.score) { Or3 = "setOrder3"; Sb3 = Number(testScoreMassive[0])-Number(testScoreMassive[2])}
    if (testScoreMassive[1] === state.tourney.ipcClients['3'].gameplay.score) { Or4 = "setOrder3"; Sb4 = Number(testScoreMassive[0])-Number(testScoreMassive[2])}

    if (testScoreMassive[2] === state.tourney.ipcClients['0'].gameplay.score) { Or1 = "setOrder2"; Sb1 = Number(testScoreMassive[0])-Number(testScoreMassive[1])}
    if (testScoreMassive[2] === state.tourney.ipcClients['1'].gameplay.score) { Or2 = "setOrder2"; Sb2 = Number(testScoreMassive[0])-Number(testScoreMassive[1])}
    if (testScoreMassive[2] === state.tourney.ipcClients['2'].gameplay.score) { Or3 = "setOrder2"; Sb3 = Number(testScoreMassive[0])-Number(testScoreMassive[1])}
    if (testScoreMassive[2] === state.tourney.ipcClients['3'].gameplay.score) { Or4 = "setOrder2"; Sb4 = Number(testScoreMassive[0])-Number(testScoreMassive[1])}

    if (testScoreMassive[3] === state.tourney.ipcClients['0'].gameplay.score) { Or1 = "setOrder1"; Sb1 = ""}
    if (testScoreMassive[3] === state.tourney.ipcClients['1'].gameplay.score) { Or2 = "setOrder1"; Sb2 = ""}
    if (testScoreMassive[3] === state.tourney.ipcClients['2'].gameplay.score) { Or3 = "setOrder1"; Sb3 = ""}
    if (testScoreMassive[3] === state.tourney.ipcClients['3'].gameplay.score) { Or4 = "setOrder1"; Sb4 = ""}
    


    /*
        Теперь всё состояние у нас доступно в переменной state, с которой мы вольны творить что угодно
    */
    return (
        <div>
            {/* {JSON.stringify(state)} */}
            <div id="main">
                <div id="mapContainer" style={backgroundStyle}>
                    <div id="overlay">
                        <div id="NowPlaying">NOW PLAYING</div>
                        <div id="mapTitle">{mapTitle}</div>
                        <div id="mapDifficulty">[{mapDifficulty}]</div>
                    </div>
                </div>
                <div id="top">
                    <div id="StageName">ROUND OF 16</div>
                    <div id="ROC22">#roc22</div>
                    <div id="XP-Logo"></div>
                </div>
                <div id="bottom">
                    {/* <chat><players> | <chat><--players--> | <---chat--->{не будет задержки}<players>    */}
                    {!scoreVisible ? <div id="chats"></div> : null}
                    {scoreVisible ? 
                        <>
                            <div id="SlotP1" className={Or1}>
                                <div id="avatarOne" className="inline" style={{ backgroundImage: playerDataOne[1] }}></div>
                                <div id="playerNameOne" className="inline">{playerDataOne[0]}</div>
                                <div id="playScoreOne" className="inline">{playerDataOne[2]}</div>
                                <div id="ScoreBetweenOne" className="inline ScoreBetween">{Sb1}</div>
                            </div>
                            <div id="SlotP2" className={Or2}>
                                <div id="avatarTwo" className="inline" style={{ backgroundImage: playerDataTwo[1] }}></div>
                                <div id="playerNameTwo" className="inline">{playerDataTwo[0]}</div>
                                <div id="playScoreTwo" className="inline">{playerDataTwo[2]}</div>
                                <div id="ScoreBetweenTwo" className="inline ScoreBetween">{Sb2}</div>
                            </div>
                            <div id="SlotP3" className={Or3}>
                                <div id="avatarThree" className="inline" style={{ backgroundImage: playerDataThree[1] }}></div>
                                <div id="playerNameThree" className="inline">{playerDataThree[0]}</div>
                                <div id="playScoreThree" className="inline">{playerDataThree[2]}</div>
                                <div id="ScoreBetweenThree" className="inline ScoreBetween">{Sb3}</div>
                            </div>
                            <div id="SlotP4" className={Or4}>
                                <div id="avatarFour" className="inline" style={{ backgroundImage: playerDataFour[1] }}></div>
                                <div id="playerNameFour" className="inline">{playerDataFour[0]}</div>
                                <div id="playScoreFour" className="inline">{playerDataFour[2]}</div>
                                <div id="ScoreBetweenFour" className='inline ScoreBetween'>{Sb4}</div>
                            </div> 
                        </> : null
                    }
                </div>
            </div>
        </div>
    )
}