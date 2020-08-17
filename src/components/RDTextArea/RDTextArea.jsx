import React, { useContext } from 'react';
import { RDFormContext } from '../RDForm/RDFormContext';

export function RDTextArea(props) {

    const { styles } = useContext(RDFormContext);

    const { id, label,
        hint, err, valid,
        required, showInput,
        clickable, btn, penclick,
        _classes, msg,
        ...rest } = props;

    const _input = (
        <div style={{ ...styles.rdWrap }}
            className={_classes.rdWrap.join(" ")}
        >
            <div style={{ ...styles.label }}
                className={_classes.label.join(" ")}
            >
                <label htmlFor={id}>{label}{required ? <span>*</span> : null}</label>
                <div style={{ ...styles.hint }}
                    className={_classes.hint.join(" ")}
                >
                    {err ?
                        <p style={{ ...styles.hintP }}
                            className={_classes.hintP.join(" ")}> - {err}</p>
                        :
                        hint ?
                            <p style={{ ...styles.hintP }}
                                className={_classes.hintP.join(" ")}> - {hint}</p>
                            :
                            null}
                </div>
            </div>
            <textarea
                style={{ ...styles.textArea }}
                id={id}
                className={_classes.textArea.join(" ")}
                autoComplete="on" spellCheck="true"
                // wrap="hard"
                {...rest}
            // rows="4"
            ></textarea>
            {msg ? <span className={_classes.characterCount.join(" ")}>{msg}</span> : null}

        </div>
    )

    const _content = (
        <div style={{ ...styles.rdWrap }}
            className={_classes.rdWrap.join(" ")}
        >
            <div style={{ ...styles.contentLabel }}
                className={_classes.contentLabel.join(" ")}
            >{label}{required ? <span>*</span> : null}</div>
            <div style={{ ...styles.inputContent }}
                className={_classes.inputContent.join(" ")}
                onClick={(e) => penclick(e)}
            >
                <div style={{ ...styles.content }}
                    className={_classes.content.join(" ")}
                >

                    {rest.value}
                </div>
                <span
                    style={{ ...styles.clickable }}
                    className={_classes.clickable.join(" ")}
                    onClick={(e) => penclick(e)}
                >
                    {btn}
                </span>
            </div>
        </div>
    )

    return (
        <>
            {

                clickable ?
                    showInput ?
                        _input
                        :
                        _content
                    :
                    _input
            }
        </>
    )
}