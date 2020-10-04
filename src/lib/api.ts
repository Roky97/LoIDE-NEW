import { APIUrl } from "./constants";
import { ILanguageData, ILoideRunData, IOutputData, IOutputProblemData } from "./LoideAPIInterfaces";
import io from "socket.io-client"

export const runProject = (data: ILoideRunData, callbackOutput: (output: IOutputData) => void, callbackProblem?: (problem: IOutputProblemData) => void) => {
    let socket = io.connect(APIUrl);

    socket.on('connect_error', (error: any) => {
        console.warn('Falied to run the project. Maybe the server or you are offline. \n Try it later.');
        socket.disconnect();
    });

    socket.emit('run', JSON.stringify(data));

    socket.on('problem', (response: IOutputProblemData) => {
        console.error(response)
        socket.disconnect();
        if (callbackProblem) callbackProblem(response);
    });

    socket.on('output', (response: IOutputData) => {
        // FIX: put `socket.disconnect();`
        callbackOutput(response);
    });
}

export const getLanguages = (callbackLanguages: (output: ILanguageData[]) => void) => {
    let socket = io.connect(APIUrl);
    socket.on('connect_error', (error: any) => {
        console.warn('Falied to get the languages. Maybe the server or you are offline. \n I\'m trying to reconnect.');
        socket.disconnect();

    });

    socket.emit('getLanguages');

    socket.on('languages', (response: string) => {
        let data: ILanguageData[] = Array.from(JSON.parse(response));
        socket.disconnect();
        callbackLanguages(data);
    })
}