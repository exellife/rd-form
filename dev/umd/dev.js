(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('React'), require('ReactDynamicForm')) :
    typeof define === 'function' && define.amd ? define(['React', 'ReactDynamicForm'], factory) :
    (global = global || self, factory(global.React, global.ReactDynamicForm));
}(this, (function (React$1, ReactDynamicForm) { 'use strict';

    function validateEmail(str) {
      if (!str.length) return [false, 'This field is required to proceed'];
      var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
      var valid = re.test(str);
      var msg = '';
      if (!valid) msg = 'Invalid email address';
      return [valid, msg];
    }

    function validatePswd(str) {
      if (str.length > 10) {
        return [true, ''];
      }

      return [false, 'Too short password'];
    }

    var target = document.getElementById('target');

    function App() {
      var EmailInput = ReactDynamicForm.useRDInput();

      var _btn = React.createElement("i", null, "edit");

      var PswdInput = ReactDynamicForm.useRDInput();
      var NameInput = ReactDynamicForm.useRDInput();
      React$1.useEffect(() => {
        EmailInput.set({
          validator: validateEmail,
          type: 'email',
          id: 'email',
          name: 'email',
          label: 'email',
          value: '',
          hint: '',
          clickable: true,
          btn: _btn,
          value: 'invalid.email'
        });
        PswdInput.set({
          validator: validatePswd,
          type: 'password',
          id: 'password',
          name: 'password',
          label: 'password',
          value: '',
          hint: 'Must be at least 6 characters long',
          clickable: true,
          btn: _btn
        });
        NameInput.set({
          type: 'text',
          id: 'full-name',
          name: 'full-name',
          label: 'Full Name',
          value: 'James Bond',
          clickable: true,
          btn: _btn,
          question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
        });
      }, []);

      function submit(e) {
        e.preventDefault();
        var m = EmailInput.getState();
        var n = NameInput.getState();
        console.log(m);
        console.log(n);
      }

      var styles = {
        form: {
          maxWidth: '400px'
        }
      };
      return React.createElement(React.Fragment, null, React.createElement(ReactDynamicForm.RDForm, {
        styles: styles
      }, React.createElement(ReactDynamicForm.RDInput, EmailInput.props), React.createElement(ReactDynamicForm.RDInput, NameInput.props), React.createElement(ReactDynamicForm.RDInput, PswdInput.props), React.createElement("button", {
        onClick: e => submit(e)
      }, "submit")));
    }

    ReactDOM.render(React.createElement(App, null), target);

})));
