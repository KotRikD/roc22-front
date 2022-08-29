import React, { useEffect, useState } from "react";

export const CurrentPlay: React.FC = () => {
    const [state, setState] = useState(null);

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


    /*
        Теперь всё состояние у нас доступно в переменной state, с которой мы вольны творить что угодно
    */
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}