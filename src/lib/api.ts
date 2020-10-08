import { APIUrl, APIWSEvents, Errors } from "./constants";
import { ILanguageData, ILoideRunData, IOutputData, IOutputProblemData } from "./LoideAPIInterfaces";
import io from "socket.io-client"
// import { toast } from "react-toastify";
import { toastController } from "@ionic/core";

export const runProject = (data: ILoideRunData, callbackOutput: (output: IOutputData) => void) => {
    let socket = io.connect(APIUrl);
    socket.on(APIWSEvents.on.connectError, (error: any) => {
        console.log('gatta')
        toastController.create({
            position: "top",
            header: "Error",
            message: Errors.RunConnectError,
            color: "danger",
            duration: 3000,
            buttons: ["OK"]
        })
            .then(toast => {
                toast.present()
            });
        console.error(Errors.RunConnectError);
        socket.disconnect();
    });

    socket.emit(APIWSEvents.emit.run, JSON.stringify(data));

    socket.on(APIWSEvents.on.problem, (response: IOutputProblemData) => {
        toastController.create({
            position: "top",
            header: "Error",
            message: response.reason,
            color: "danger",
            duration: 3000,
            buttons: ["OK"]
        })
            .then(toast => {
                toast.present()
            });
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
        toastController.create({
            position: "top",
            header: "Error",
            message: Errors.GetLanguagesError,
            color: "danger",
            duration: 3000,
            buttons: ["OK"]
        })
            .then(toast => toast.present());
        socket.disconnect();
    });

    socket.emit(APIWSEvents.emit.getLanguages);

    socket.on(APIWSEvents.on.languages, (response: string) => {
        let data: ILanguageData[] = Array.from(JSON.parse(response));
        socket.disconnect();
        callbackLanguages(data);
    })
}