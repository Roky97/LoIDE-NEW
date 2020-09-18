import React from "react";
import AceEditor from "react-ace";

import "../lib/ace/mode-asp";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

const LoideAceEditor = (props) => {
    var langTools = ace.require("ace/ext/language_tools");

    var languageChosen = props.mode;

    var solverChosen = "dlv2";

    const onChange = (value) => {
        console.log(props.mode);
        inizializeAutoComplete(value);
    };

    const onFocus = () => {
        window.dispatchEvent(new Event("resize"));
    };

    const inizializeSnippets = () => {
        console.log("langTools", langTools);

        langTools.setCompleters([]); // reset completers.

        // completer that include snippets and some keywords
        var completer;

        switch (languageChosen) {
            case "asp":
                switch (solverChosen) {
                    case "dlv":
                        completer = {
                            identifierRegexps: [
                                /[a-zA-Z_0-9#$\-\u00A2-\uFFFF]/,
                            ],
                            getCompletions: function (
                                editor,
                                session,
                                pos,
                                prefix,
                                callback
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

                    case "dlv2":
                        completer = {
                            identifierRegexps: [
                                /[a-zA-Z_0-9#$\-\u00A2-\uFFFF]/,
                            ],
                            getCompletions: function (
                                editor,
                                session,
                                pos,
                                prefix,
                                callback
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
                    case "clingo":
                    // add snippets
                }
                break;

            default:
                break;
        }
    };

    const inizializeAutoComplete = (editorText) => {
        inizializeSnippets();

        switch (languageChosen) {
            case "asp": {
                let splitRegex = /(([a-zA-Z_]+[0-9]*)*)(\(.+?\))/gi;
                let words = editorText.match(splitRegex);
                if (words != null) {
                    let map = new Map();
                    words.forEach(function (word) {
                        let name = word.match(/[^_](([a-zA-Z_]+[0-9]*)*)/)[0];
                        let arities = word.match(/\(.+?\)/)[0].split(",")
                            .length;
                        map.set(name, arities);
                    });
                    let completions = [];
                    map.forEach(function (key, value) {
                        completions.push({
                            caption: value,
                            snippet: value + giveBrackets(key),
                            meta: "atom",
                        });
                    });

                    let completer = {
                        getCompletions: function (
                            editor,
                            session,
                            pos,
                            prefix,
                            callback
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

    const giveBrackets = (value) => {
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

    return <AceEditor {...props} onChange={onChange} onFocus={onFocus} />;
};

export default LoideAceEditor;
