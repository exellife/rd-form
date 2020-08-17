import React, { useState, useEffect } from 'react';

const _classes = {
    rdWrap: ['rd-input-wrap'],
    inputContent: ['rd-input-content'],
    contentLabel: ['rd-content-label'],
    content: ['rd-content'],
    clickable: ['rd-clickable'],
    label: ['rd-label'],
    hint: ['rd-hint'],
    hintP: ['rd-hint-p'],
    textArea: ['rd-text-area'],
    characterCount: ['rd-character-count']
};

const configState = {
    // Provide a function that takes single string input,
    // always returns [boolean, message] 
    // boolean indicates if input is valid
    // message could be an empty string or actual message
    // depending on validity
    validator: null, // - function
    props: {
        id: '',  // *
        name: '', // *
        label: '', // *
        maxLength: null,
        minLength: null,
        value: '',
        hint: '',
        // allways returns true if validator isn't provided
        valid: null,
        err: '',
        required: null,
        spellCheck: true,
        placeholder: '',
        clickable: false,
        btn: null,
        _classes,
    },
}

export function useRDTextArea() {

    const [config, setConfig] = useState(configState);
    const [showInput, setShowInput] = useState(false);
    const [minMax, setMinMax] = useState({
        min: config.props.minLength,
        max: config.props.maxLength,
        msg: '',
    })


    let timeout;
    useEffect(() => {
        const {
            value,
        } = config.props;

        timeout = setTimeout(() => {
            if (value) _validate();
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [config.props.value]);

    let timeout2;
    useEffect(() => {
        timeout2 = setTimeout(() => {
            const { valid } = _getState();
            if (valid) setShowInput(false);
        }, 5000)

        return () => {
            clearTimeout(timeout2)
        }
    }, [config.props.value, showInput])

    function set(conf) {
        setConfig({
            validator: conf.validator || null,
            props: {
                ...config.props,
                ...conf.props,
            }
        });

        _minMaxLength(
            null,
            conf.props.value,
            conf.props.minLength,
            conf.props.maxLength,
        );
    }

    function penclick(e) {
        e.preventDefault();
        setShowInput(true);
    }

    function _validate() {
        let newConfig = {};
        const {
            value,
        } = config.props;

        if (config.validator) {

            const [valid, err] =
                config.validator(value);

            function setResult() {
                valid ?
                    newConfig = {
                        ...config,
                        props: {
                            ...config.props,
                            valid,
                            err,
                            _classes: {
                                ..._classes,
                            }
                        }
                    }
                    :
                    newConfig = {
                        ...config,
                        props: {
                            ...config.props,
                            valid,
                            err,
                            _classes: {
                                ..._classes,
                            }
                        }
                    }
                setConfig(newConfig);
            }

            setResult()
            return newConfig;
        }
        
        // if (config.props.minLength) {
        //     let newConfig = {
        //         ...config,
        //         props: {
        //             ...config.props,
        //             valid: false,
        //         }
        //     }
        //     setConfig(newConfig);
        //     return newConfig
        // }

        return config;
    }

    function _getState() {
        const newConf = _validate();
        const { valid, value } = newConf.props;
        function isValid(valid) {
            return valid === null || valid;
        }

        return { valid: isValid(valid), value };
    }

    function _minMaxLength(e = null, val = null,
        _min = null, _max = null) {

        const l = e ? e.target.value.length :
            val ? val.length : 0;

        let newMsg =
            +_min ? `need more ${+_min - l} characters` :
                +_max ? `${+_max - l} characters left` : null;

        if (newMsg) {
            setMinMax({ min: +_min, max: +_max, msg: newMsg });
            return;
        }


        const { min, max, msg } = minMax;

        if (min && max) {
            if (l > min && min !== max) {
                newMsg = `${max - l} characters left`
            }
            if (l <= min && min !== max) {
                newMsg = `need more ${min - l} characters`
            }

            if (min === max) {
                newMsg = l < Math.floor(min / 2) ?
                    `need more ${min - l} characters` :
                    `${max - l} characters left`
            }
        }
        if (min && !max && (l <= min)) {
            newMsg = `need more ${min - l} characters`
        }
        if (max && !min) newMsg = `${max - l} characters left`

        if (newMsg) setMinMax({ min, max, msg: newMsg });
        console.log(min, max, newMsg);
    }

    return {
        set,
        getState: () => _getState(),
        clear: () => {
            setConfig((prev) => {
                return {
                    ...prev,
                    props: {
                        ...prev.props,
                        value: '',
                        valid: null,
                        err: '',
                    }
                }
            })
        },
        props: {
            // to pass down 
            ...config.props,
            showInput,
            msg: minMax.msg,
            penclick,
            onChange: (e) => {
                setConfig({
                    ...config,
                    props: {
                        ...config.props,
                        value: e.target.value,
                        err: '',
                        valid: null,
                        _classes: {
                            ..._classes,
                        }
                    }
                });
                _minMaxLength(e);
            },
            onBlur: (e) => {
                _validate();
            }
        },

    }
}