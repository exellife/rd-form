import React, { useEffect, useState, useReducer } from 'react';
import { RDFormContext } from './RDFormContext';
import { reducer, classes } from './reducer';

const defaultStyles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
    },
    rdWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
    },
    inputContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLabelWrap: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'italic',
        textTransform: 'capitalize'
    },
    contentLabel: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {

    },
    clickable: {
        cursor: 'pointer',
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'italic',
        marginBottom: '4px',
    },
    labelWrap: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hint: {
        // margin: '0',
        // fontSize: '14px',
    },
    hintP: {
        margin: '0',
        marginLeft: '4px',
    },
    input: {

    },
    // TextArea
    textArea: {
        resize: 'none',
    },
    question: {

    }
};



export function RDForm({ styles, children }) {

    const [_styles, setStyles] = useState(defaultStyles);

    const [state, dispatch] = useReducer(reducer, classes)

    useEffect(() => {
        if (styles) {
            try {
                const newState = {};
                for (const key in _styles) {
                    newState[key] = { ..._styles[key] }
                    if (styles[key]) {
                        newState[key] = {
                            ...newState[key],
                            ...styles[key],
                        }
                    }
                }

                setStyles(newState);
            } catch (e) {
                throw e;
            }
        }
    }, [])

    return (
        <form style={{ ..._styles.form }} className="rd-form">
            <RDFormContext.Provider
                value={{
                    styles: _styles
                }}
            >
                {children}
            </RDFormContext.Provider>
        </form>
    )
}



