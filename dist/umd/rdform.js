(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactDynamicForm = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var RDFormContext = React__default.createContext();

  var classes = {
    form: [],
    inputWrap: [],
    inputContent: [],
    contentLabel: [],
    content: [],
    clickable: [],
    label: [],
    labelErr: [],
    labelValid: [],
    hint: [],
    input: []
  };
  function reducer(state, action) {
    switch (action.type) {
      default:
        throw Error('RDForm Reducer Error');
    }
  }

  var defaultStyles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px'
    },
    rdWrap: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '16px'
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
      flexDirection: 'row'
    },
    content: {},
    clickable: {
      cursor: 'pointer'
    },
    label: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontStyle: 'italic',
      marginBottom: '4px'
    },
    labelWrap: {
      flex: '1',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    hint: {},
    hintP: {
      margin: '0',
      marginLeft: '4px'
    },
    input: {},
    textArea: {
      resize: 'none'
    },
    question: {}
  };
  function RDForm(_ref) {
    var {
      styles,
      children
    } = _ref;
    var [_styles, setStyles] = React.useState(defaultStyles);
    var [state, dispatch] = React.useReducer(reducer, classes);
    React.useEffect(() => {
      if (styles) {
        try {
          var newState = {};

          for (var key in _styles) {
            newState[key] = _objectSpread2({}, _styles[key]);

            if (styles[key]) {
              newState[key] = _objectSpread2(_objectSpread2({}, newState[key]), styles[key]);
            }
          }

          setStyles(newState);
        } catch (e) {
          throw e;
        }
      }
    }, []);
    return React__default.createElement("form", {
      style: _objectSpread2({}, _styles.form),
      className: "rd-form"
    }, React__default.createElement(RDFormContext.Provider, {
      value: {
        styles: _styles
      }
    }, children));
  }

  function RDInput(props) {
    var {
      styles
    } = React.useContext(RDFormContext);

    var {
      id,
      label,
      hint,
      err,
      valid,
      required,
      showInput,
      clickable,
      btn,
      penclick,
      _classes,
      spinner,
      question,
      validator
    } = props,
        rest = _objectWithoutProperties(props, ["id", "label", "hint", "err", "valid", "required", "showInput", "clickable", "btn", "penclick", "_classes", "spinner", "question", "validator"]);

    var _input = React__default.createElement("div", {
      style: _objectSpread2({}, styles.rdWrap),
      className: _classes.rdWrap.join(" ")
    }, React__default.createElement("div", {
      style: _objectSpread2({}, styles.label),
      className: _classes.label.join(" ")
    }, React__default.createElement("div", {
      style: _objectSpread2({}, styles.labelWrap),
      className: _classes.labelWrap.join(" ")
    }, React__default.createElement("label", {
      htmlFor: id
    }, label, required ? React__default.createElement("span", null, "*") : null), React__default.createElement("div", {
      style: _objectSpread2({}, styles.hint),
      className: _classes.hint.join(" ")
    }, err ? React__default.createElement("p", {
      style: _objectSpread2({}, styles.hintP),
      className: _classes.hintP.join(" ")
    }, " - ", err) : hint ? React__default.createElement("p", {
      style: _objectSpread2({}, styles.hintP),
      className: _classes.hintP.join(" ")
    }, " - ", hint) : null)), spinner ? React__default.createElement("div", {
      className: _classes.spinner.join(" ")
    }) : null), React__default.createElement("input", _extends({
      id: id
    }, rest, {
      style: _objectSpread2({}, styles.input),
      className: _classes.input.join(" ")
    })));

    var _content = React__default.createElement("div", {
      style: _objectSpread2({}, styles.rdWrap),
      className: _classes.rdWrap.join(" ")
    }, React__default.createElement("div", {
      style: _objectSpread2({}, styles.contentLabel),
      className: _classes.contentLabel.join(" ")
    }, React__default.createElement("div", {
      style: _objectSpread2({}, styles.contentLabelWrap),
      className: _classes.contentLabelWrap.join(" ")
    }, label, required ? React__default.createElement("span", null, "*") : null), question ? React__default.createElement("span", {
      style: _objectSpread2({}, styles.question),
      className: _classes.question.join(" ")
    }, " ?", React__default.createElement("span", {
      className: "question-hide"
    }, question)) : null), React__default.createElement("div", {
      style: _objectSpread2({}, styles.inputContent),
      className: _classes.inputContent.join(" "),
      onClick: e => penclick(e)
    }, React__default.createElement("div", {
      style: _objectSpread2({}, styles.content),
      className: _classes.content.join(" ")
    }, rest.value), React__default.createElement("span", {
      style: _objectSpread2({}, styles.clickable),
      className: _classes.clickable.join(" "),
      onClick: e => penclick(e)
    }, btn)));

    return React__default.createElement(React__default.Fragment, null, clickable ? showInput ? _input : _content : _input);
  }

  var _classes = {
    rdWrap: ['rd-input-wrap'],
    inputContent: ['rd-input-content'],
    contentLabel: ['rd-content-label'],
    contentLabelWrap: ['rd-content-label-wrap'],
    content: ['rd-content'],
    clickable: ['rd-clickable'],
    label: ['rd-label'],
    labelWrap: ['rd-label-wrap'],
    labelErr: [],
    labelValid: [],
    hint: ['rd-hint'],
    hintP: ['rd-hint-p'],
    input: ['rd-input'],
    spinner: ['rd-spinner'],
    question: ['rd-question']
  };
  var types = {
    set: 'set',
    showInput: 'showInput',
    spinner: 'spinner',
    validationResult: 'validationResult',
    resetClasses: 'resetClasses',
    validate: 'validate'
  };
  var state = {
    type: '',
    id: '',
    name: '',
    label: '',
    hint: '',
    required: null,
    clickable: false,
    btn: null,
    question: '',
    _classes,
    valid: null,
    err: '',
    validator: null,
    showInput: false,
    spinner: false
  };
  function reducer$1(state, action) {
    switch (action.type) {
      case types.set:
        return _objectSpread2(_objectSpread2({}, state), action.payload);

      case types.resetClasses:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          _classes: _classes
        });

      case types.showInput:
        var close = !action.payload;

        if (close) {
          var {
            valid
          } = state;
          var showInput = !valid;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            showInput
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          showInput: action.payload
        });

      case types.spinner:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          spinner: action.payload
        });

      case types.validate:
        if (state.validator) {
          var [_valid, err] = state.validator(action.payload);
          var classToAdd = _valid ? 'rd-valid' : 'rd-error';

          var _showInput = !_valid;

          var _toSet = _objectSpread2(_objectSpread2({}, state), {}, {
            _classes: _objectSpread2(_objectSpread2({}, state._classes), {}, {
              rdWrap: [..._classes.rdWrap, classToAdd]
            }),
            valid: _valid,
            err,
            showInput: _showInput
          });

          return _toSet;
        }

        return _objectSpread2({}, state);

      default:
        throw Error("Reducer error: shoudn't have happend");
    }
  }

  function useRDInput() {
    var [_value, _setValue] = React.useState('');
    var [_state, dispatch] = React.useReducer(reducer$1, state);
    var timeout;
    React.useEffect(() => {
      timeout = setTimeout(() => {
        _validate();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }, [_value]);
    var timeout2;
    React.useEffect(() => {
      timeout2 = setTimeout(() => {
        var {
          valid
        } = _getState();

        if (valid) {
          dispatch({
            type: types.showInput,
            payload: false
          });
        }
      }, 2000);
      return () => {
        clearTimeout(timeout2);
      };
    }, [_state.showInput, _value]);

    function set(conf) {
      if (!conf.type || !conf.id || !conf.name || !conf.label) {
        throw Error("type, id, name or label wasn't provided... make sure to pass type, unique id, unique name and label to every RDInput");
      }

      if (conf.value) _setValue(conf.value);
      var [valid, required] = conf.validator ? [false, true] : [true, null];
      var showInput = valid === false;
      dispatch({
        type: types.set,
        payload: _objectSpread2(_objectSpread2({}, conf), {}, {
          valid,
          required,
          showInput
        })
      });

      _validate();
    }

    function penclick(e) {
      e.preventDefault();
      dispatch({
        type: types.showInput,
        payload: true
      });
    }

    function _spinner(bool) {
      dispatch({
        type: types.spinner,
        payload: bool
      });
    }

    function _validate() {
      _spinner(true);

      dispatch({
        type: types.validate,
        payload: _value
      });

      _spinner(false);
    }

    function _getState() {
      _validate();

      return {
        value: _value,
        valid: _state.valid
      };
    }

    return {
      set,
      getState: () => _getState(),
      clear: () => {
        _setValue(''), dispatch({
          type: types.resetClasses
        });
      },
      props: _objectSpread2(_objectSpread2({}, _state), {}, {
        value: _value,
        penclick,
        onChange: e => {
          _setValue(e.target.value);

          dispatch({
            type: types.resetClasses
          });
        },
        onBlur: () => _validate()
      })
    };
  }

  exports.RDForm = RDForm;
  exports.RDInput = RDInput;
  exports.useRDInput = useRDInput;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
