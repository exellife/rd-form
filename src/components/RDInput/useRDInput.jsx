import React, { useState, useEffect, useReducer } from 'react';
import { reducer, state, types } from './reducer';

export function useRDInput() {

    const [_value, _setValue] = useState('');
    const [_state, dispatch] = useReducer(reducer, state)

    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            if (_value) _validate();
        }, 700);

        return () => {
            clearTimeout(timeout);
        }
    }, [_value]);

    let timeout2;
    useEffect(() => {
        timeout2 = setTimeout(() => {
            dispatch({
                type: types.showInput,
                payload: false,
            })
        }, 5000)

        return () => {
            clearTimeout(timeout2)
        }
    }, [_value, _state.showInput])

    function set(conf) {

        if (!conf.type || !conf.id
            || !conf.name || !conf.label) {
            throw Error(`type, id, name or label wasn't provided... make sure to pass type, unique id, unique name and label to every RDInput`);
        }
        if (conf.value) _setValue(conf.value);

        const [valid, required] = conf.validator ?
            [false, true] : [true, null];

        const showInput = valid === false;

        dispatch({
            type: types.set,
            payload: { ...conf, valid, required, showInput }
        });
    }

    function penclick(e) {
        e.preventDefault();
        dispatch({
            type: types.showInput,
            payload: true,
        })
    }

    function _spinner(bool) {
        dispatch({
            type: types.spinner,
            payload: bool,
        })
    }

    function _validate() {
        const { validator } = _state;
        if (validator) {
            _spinner(true);
            validator(_value)
                .then(payload => {
                    dispatch({
                        type: types.validationResult,
                        payload,
                    })
                    _spinner(false);
                });
        }
    }

    function _getState() {

    }

    return {
        set,
        getState: () => _getState(),
        clear: () => _setValue(''),
        props: {
            ..._state,
            value: _value,
            penclick,
            onChange: (e) => {
                _setValue(e.target.value);
                dispatch({ type: types.resetClasses });
            },
            onBlur: () => _validate(),
        },
    }
}