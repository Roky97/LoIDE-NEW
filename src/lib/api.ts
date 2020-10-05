import { APIUrl, APIWSEvents, Errors } from "./constants";
import { ILanguageData, ILoideRunData, IOutputData, IOutputProblemData } from "./LoideAPIInterfaces";
import io from "socket.io-client"
import { toast } from "react-toastify";

export const runProject = (data: ILoideRunData, callbackOutput: (output: IOutputData) => void) => {
    let socket = io.connect(APIUrl);
    socket.on(APIWSEvents.on.connectError, (error: any) => {
        console.error(Errors.RunConnectError);
        toast.error(Errors.RunConnectError);
        socket.disconnect();
    });

    socket.emit(APIWSEvents.emit.run, JSON.stringify(data));

    socket.on(APIWSEvents.on.problem, (response: IOutputProblemData) => {
        console.error(response)
        toast.error(response.reason);
        socket.disconnect();
    });

    socket.on(APIWSEvents.on.output, (response: IOutputData) => {
        // FIX: put `socket.disconnect();`
        callbackOutput(response);
    });
}

export const getLanguages = (callbackLanguages: (output: ILanguageData[]) => void) => {
    let socket = io.connect(APIUrl);
    socket.on(APIWSEvents.on.connectError, (error: any) => {
        console.error(Errors.GetLanguagesError);
        toast.error(Errors.GetLanguagesError);
        socket.disconnect();
    });

    socket.emit(APIWSEvents.emit.getLanguages);

    socket.on(APIWSEvents.on.languages, (response: string) => {
        let data: ILanguageData[] = Array.from(JSON.parse(response));
        socket.disconnect();
        callbackLanguages(data);
    })
}