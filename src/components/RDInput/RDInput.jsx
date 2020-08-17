import React, { useContext } from 'react';
import { RDFormContext } from '../RDForm/RDFormContext';

export function RDInput(props) {

    const { styles } = useContext(RDFormContext);

    const { id, label,
        hint, err, valid,
        required, showInput,
        clickable, btn, penclick,
        _classes, spinner,
        question,
        validator, ...rest } = props;

    const _input = (
        <div style={{ ...styles.rdWrap }}
            className={_classes.rdWrap.join(" ")}
        >

            <div style={{ ...styles.label }}
                className={_classes.label.join(" ")}
            >
                <div style={{ ...styles.labelWrap }}
                    className={_classes.labelWrap.join(" ")}>


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

                {
                    spinner ?
                        <div className={_classes.spinner.join(" ")}></div>
                        :
                        null
                }


            </div>
            <input
                id={id}
                {...rest}
                style={{ ...styles.input }}
                className={_classes.input.join(" ")}
            />

        </div>
    )

    const _content = (
        <div style={{ ...styles.rdWrap }}
            className={_classes.rdWrap.join(" ")}
        >
            <div style={{ ...styles.contentLabel }}
                className={_classes.contentLabel.join(" ")}
            >
                <div
                    style={{ ...styles.contentLabelWrap }}
                    className={_classes.contentLabelWrap.join(" ")}
                >
                    {label}{required ? <span>*</span> : null}
                </div>

                {question ?
                    <span style={{ ...styles.question }}
                        className={_classes.question.join(" ")}> ?

                    <span className="question-hide">{question}</span>

                    </span>
                    :
                    null
                }


            </div>

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