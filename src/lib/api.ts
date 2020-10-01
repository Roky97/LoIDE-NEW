import { APIUrl } from "./constants";
import { ILoideRunData, IOutputData, IOutputProblemData } from "./LoideAPIInterfaces";
import io from "socket.io-client"
export const runProject = (data: ILoideRunData, callbackOutput: (output: IOutputData) => void, callbackProblem?: (problem: IOutputProblemData) => void) => {

    let socket = io.connect(APIUrl);
    console.log('data json', JSON.stringify(data))

    socket.emit('run', JSON.stringify(data));

    socket.on('problem', (response: IOutputProblemData) => {
        // console.error(response); // debug string
        if (callbackProblem) callbackProblem(response);
    });
    socket.on('output', (response: IOutputData) => {
        // console.log("output", response); // debug string
        if (callbackOutput) callbackOutput(response);
    });

}