import { APIWSEvents, Errors } from "./constants";
import io from "socket.io-client"
import { toastController } from "@ionic/core";
import { ILanguageData, ILoideRunData, IOutputData, IOutputProblemData } from "./LoideAPIInterfaces";

// LoIDE Web Server API URL
const APIUrl = "localhost:8084";

var socket: SocketIOClient.Socket | undefined = undefined;

const createSocket = () => {
    if (!socket) {
        socket = io(APIUrl, { reconnection: false });

        socket.on(APIWSEvents.on.connectError, (error: any) => {
            toastController.create({
                position: "top",
                header: "Error",
                message: Errors.ConnectionError,
                color: "danger",
                duration: 3000,
                buttons: ["OK"]
            })
                .then(toast => {
                    toast.present()
                });
            console.error(Errors.ConnectionError);
        });
    }
}

const setRunProjectListener = (callbackOutput: (output: IOutputData) => void) => {
    if (socket) {
        socket.off(APIWSEvents.on.problem);
        socket.off(APIWSEvents.on.output);

        socket.on(APIWSEvents.on.problem, (response: IOutputProblemData) => {
            toastController.create({
                position: "top",
                header: "Execution error",
                message: response.reason,
                color: "danger",
                duration: 3000,
                buttons: ["OK"]
            })
                .then(toast => {
                    toast.present()
                });
        });

        socket.on(APIWSEvents.on.output, (response: IOutputData) => {
            callbackOutput(response);
        });
    }
}

const setGetLanguagesListener = (callbackLanguages: (output: ILanguageData[]) => void) => {
    if (socket) {
        socket.off(APIWSEvents.on.languages);
        socket.on(APIWSEvents.on.languages, (response: string) => {
            let data: ILanguageData[] = Array.from(JSON.parse(response));
            callbackLanguages(data);
        })
    }
}

const emitGetLanguages = () => {
    if (socket) {
        if (socket.disconnected) socket.connect();
        socket.emit(APIWSEvents.emit.getLanguages);
    }
}

const emitRunProject = (data: ILoideRunData) => {
    if (socket) {
        if (socket.disconnected) socket.connect();
        socket.emit(APIWSEvents.emit.run, JSON.stringify(data));
    }
}

const isConnected = (): boolean => {
    if (socket) {
        return socket.connected;
    }
    return false;
}


const disconnectAndClearSocket = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
    }
}

const API = { createSocket, isConnected, disconnectAndClearSocket, setRunProjectListener, setGetLanguagesListener, emitRunProject, emitGetLanguages }

export default API;