/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";

import "../lib/ace/mode-asp";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { LoideLanguages, LoideSolvers } from "../lib/constants";

interface LoideAceEditorProps {
    mode: string;
    solver: string;
    tabKey: number;
    value: string;

    onChange?: (tabKey: number, value: string) => void;
    onFocus?: (tabKey: number, e: any) => void;
}

const LoideAceEditor: React.FC<LoideAceEditorProps> = (props) => {
    const ace = require("ace-builds/src-noconflict/ace");

    var reactAce = useRef<AceEditor>(null);

    useEffect(() => {
        let edt = reactAce.current;
        if (edt) {
            let isInAndSupported = Object.values(LoideLanguages).find(
                (lang) => {
                    return lang.name === props.mode && lang.highlightSupport;
                }
            );

            if (isInAndSupported) {
                edt.editor.getSession().setMode("ace/mode/" + props.mode);
            } else {
                edt.editor.getSession().setMode("ace/mode/text");
            }
        }
    }, [reactAce, props.mode]);

    var langTools = ace.require("ace/ext/language_tools");

    var languageChosen = props.mode;

    var solverChosen = props.solver;

    const onChange = (value: any) => {
        inizializeAutoComplete(value);
        let lastCharacter = value[value.length - 1];
        if (lastCharacter === "'") {
            let edt = reactAce.current;
            if (edt) {
                edt.editor.replaceAll('"', { needle: "'" });
                value = edt.editor.getValue();
            }
        }
        if (props.onChange) props.onChange(props.tabKey, value);
    };

    const onFocus = (e: any) => {
        window.dispatchEvent(new Event("resize"));

        if (props.onFocus) props.onFocus(props.tabKey, e);
    };

    const inizializeSnippets = () => {
        langTools.setCompleters([]); // reset completers.

        // completer that include snippets and some keywords
        var completer;

        switch (languageChosen) {
            case LoideLanguages.ASP.name:
                switch (solverChosen) {
                    case LoideSolvers.DLV:
                        completer = {
                            identifierRegexps: [
                                /[a-zA-Z_0-9#$\-\u00A2-\uFFFF]/,
                            ],
                            getCompletions: function (
                                editor: any,
                                session: any,
                                pos: any,
                                prefix: any,
                                callback: any
                            ) {
                                var completions = [
                                    {
                                        caption: "#const",
                                        snippet:
                                            "#const ${1:namedConstant} = ${2:costant}",
                                        meta: "keyword",
                                    },
                                    {
                                        caption: "#maxint",
                                        snippet: "#maxint = ${1:Number}",
                                        meta: "keyword",
                                    },
                                    {
                                        caption: "#append",
                                        snippet:
                                            "#append(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#delnth",
                                        snippet:
                                            "#delnth(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#flatten",
                                        snippet:
                                            "#flatten(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#head",
                                        snippet:
                                            "#head(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#insLast",
                                        snippet:
                                            "#insLast(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#insnth",
                                        snippet:
                                            "#insnth(${1:X}, ${2:Y}, ${3:Z}, ${4:W})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#last",
                                        snippet: "#last(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#length",
                                        snippet: "#length(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#member",
                                        snippet: "#member(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#reverse",
                                        snippet: "#reverse(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#subList",
                                        snippet: "#subList(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#tail",
                                        snippet: "#tail(${1:X}, ${2:Y})",
                                        meta: "list predicate",
                                    },
                                    {
                                        caption: "#getnth",
                                        snippet:
                                            "#getnth(${1:X}, ${2:Y}, ${3:Z})",
                                        meta: "list predicate",
                                    },

                                    // -------
                                    {
                                        caption: "+",
                                        snippet:
                                            "+(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "-",
                                        snippet:
                                            "-(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "*",
                                        snippet:
                                            "*(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "/",
                                        snippet:
                                            "/(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    // {
                                    //     caption: "#int(X)",
                                    //     snippet: "#int(${1:Var})",
                                    //     meta: "arithmetic predicates"
                                    // },
                                    {
                                        caption: "#int",
                                        snippet:
                                            "#int(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "#suc",
                                        snippet: "#suc(${1:Var1}, ${2:Var2})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "#pred",
                                        snippet: "#pred(${1:Var1}, ${2:Var2})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "#mod",
                                        snippet:
                                            "#mod(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "#absdiff",
                                        snippet:
                                            "#absdiff(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    {
                                        caption: "#rand",
                                        snippet:
                                            "#rand(${1:Var1}, ${2:Var2}, ${3:Var3})",
                                        meta: "arithmetic predicates",
                                    },
                                    // {
                                    //     caption: "#rand(X)",
                                    //     snippet: "#rand(${1:Var})",
                                    //     meta: "arithmetic predicates"
                                    // },
                                    {
                                        caption: "#times",
                                        snippet:
                                            "#times{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#sum",
                                        snippet: "#sum{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#min",
                                        snippet: "#min{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#max",
                                        snippet: "#max{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#count",
                                        snippet:
                                            "#count{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: ":~",
                                        snippet:
                                            ":~ ${1:literals}. [${2:conditions}]",
                                        meta: "weak constraint",
                                    },
                                    {
                                        caption: ":-",
                                        snippet: ":- ${1:literals}.",
                                        meta: "body/constraint",
                                    },
                                ];
                                callback(null, completions);
                            },
                        };
                        langTools.addCompleter(completer);
                        break;
                    case LoideSolvers.DLV2:
                        completer = {
                            identifierRegexps: [
                                /[a-zA-Z_0-9#$\-\u00A2-\uFFFF]/,
                            ],
                            getCompletions: function (
                                editor: any,
                                session: any,
                                pos: any,
                                prefix: any,
                                callback: (
                                    arg0: null,
                                    arg1: {
                                        caption: string;
                                        snippet: string;
                                        meta: string;
                                    }[]
                                ) => void
                            ) {
                                var completions = [
                                    {
                                        caption: "#int",
                                        snippet: "#int",
                                        meta: "keyword",
                                    },
                                    {
                                        caption: "#times",
                                        snippet:
                                            "#times{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#sum",
                                        snippet: "#sum{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#min",
                                        snippet: "#min{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#max",
                                        snippet: "#max{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: "#count",
                                        snippet:
                                            "#count{${1:Vars} : ${2:Congj}}",
                                        meta: "aggregate function",
                                    },
                                    {
                                        caption: ":~",
                                        snippet:
                                            ":~ ${1:literals}. [${2:conditions}]",
                                        meta: "weak constraint",
                                    },
                                    {
                                        caption: ":-",
                                        snippet: ":- ${1:literals}.",
                                        meta: "body/constraint",
                                    },
                                ];
                                callback(null, completions);
                            },
                        };
                        langTools.addCompleter(completer);
                        break;
                    case LoideSolvers.Clingo:
                        // add snippets
                        break;
                }
                break;

            default:
                break;
        }
    };

    const inizializeAutoComplete = (editorText: string) => {
        inizializeSnippets();

        switch (languageChosen) {
            case LoideLanguages.ASP.name: {
                let splitRegex = /(([a-zA-Z_]+[0-9]*)*)(\(.+?\))/gi;
                let words = editorText.match(splitRegex);
                if (words != null) {
                    let map = new Map();
                    words.forEach(function (word: string) {
                        let name = word.match(/[^_](([a-zA-Z_]+[0-9]*)*)/)![0];
                        let arities = word.match(/\(.+?\)/)![0].split(",")
                            .length;
                        map.set(name, arities);
                    });
                    let completions: {
                        caption: any;
                        snippet: string;
                        meta: string;
                    }[] = [];
                    map.forEach(function (key, value) {
                        completions.push({
                            caption: value,
                            snippet: value + giveBrackets(key),
                            meta: "atom",
                        });
                    });

                    let completer = {
                        getCompletions: function (
                            editor: any,
                            session: any,
                            pos: any,
                            prefix: any,
                            callback: (arg0: null, arg1: any[]) => void
                        ) {
                            callback(null, completions);
                        },
                    };

                    langTools.addCompleter(completer);
                }
                break;
            }
            default:
                break;
        }
    };

    const giveBrackets = (value: number) => {
        var par = "(";
        var LETTER = "A";
        var limit = 0;
        if (value <= 26) limit = value;
        else limit = 26;
        for (let i = 0; i < limit; i++) {
            let num = i + 1;
            par += "${" + num + ":" + LETTER + "}";
            if (i !== limit - 1) {
                par += ",";
            }
            LETTER = String.fromCharCode(LETTER.charCodeAt(0) + 1);
        }
        par += ")";
        return par;
    };

    return (
        <AceEditor
            ref={reactAce}
            height="100%"
            width="0px"
            // mode={props.mode}
            mode="text"
            theme="tomorrow"
            name={`editor-${props.tabKey}`}
            value={props.value}
            editorProps={{
                $blockScrolling: true,
            }}
            setOptions={{
                fontSize: 15,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                cursorStyle: "smooth",
                copyWithEmptySelection: true,
                scrollPastEnd: true,
            }}
            onChange={onChange}
            onFocus={onFocus}
            style={{ flexGrow: 1 }}
        />
    );
};

export default LoideAceEditor;
