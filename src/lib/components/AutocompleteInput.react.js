import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* https://github.com/yury-dymov/react-autocomplete-input */
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export default class AutocompleteInput extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();
    }

    componentDidUpdate(prevProps) {
        /* Focus the input component */
        this.input.current.refInput.current.focus();
        /* Forward external changes to inner component */
        this.input.current.refInput.current.value = this.props.value;
        /* Trigger the menu if appropriate */
        this.input.current.handleChange({ target: this.input.current.refInput.current });
    }

    render () {
        const {id, setProps, value, n_submit, component, quoteWhitespaces, ...other} = this.props;

        return <TextInput
                 id={id}
                 ref={this.input}
                 defaultValue={value}
                 Component={component}
                 onChange={
                     value => setProps({ value: value })
                 }
                 onKeyDown={
                     event => {
                         if (event.key === 'Enter') {
                             setProps({
                                 n_submit: n_submit + 1,
                             });
                         }
                     }
                 }
                 changeOnSelect={
                     (trigger, slug) => {
                         if (quoteWhitespaces && slug.includes(' '))
                             return trigger + '"' + slug + '"';
                         else
                             return trigger + slug;
                     }
                 }
                 {...other}
               />;
    }

}

AutocompleteInput.defaultProps = {
    value: "",
    n_submit: 0,
    component: "input",
    quoteWhitespaces: false,
};

AutocompleteInput.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * Placeholder string
     */
    placeholder: PropTypes.string,

    /**
     * Whether the options containing whitespaces should be quoted
     */
    quoteWhitespaces: PropTypes.bool,

    /**
     * The input's inline styles
     */
    style: PropTypes.object,

    /**
     * Number of times the `Enter` key was pressed while the input had focus.
     */
    n_submit: PropTypes.number,

    /**
     * Component to use, either 'textarea' or 'input'
     */
    component: PropTypes.string,

    /**
     * Character or string, which triggers showing autocompletion option list.
     */
    trigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),

    /**
     * List of available options for autocomplete
     */
    options: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),

    /**
     * Class name for the component
     */
    className: PropTypes.string,

    /**
     * Disables widget, i.e. during form submission
     */
    disabled: PropTypes.bool,

    /**
     * Defines how many options can be listed simultaneously. Show all matched options if maxOptions equals 0.
     */
    maxOptions: PropTypes.number,

    /**
     * If true, will match options in the middle of the word as well
     */
    matchAny: PropTypes.bool,

    /**
     * Popup horizontal offset
     */
    offsetX: PropTypes.number,

    /**
     * Popup vertical offset
     */
    offsetY: PropTypes.number,

    /**
     * This regular expression checks if text after trigger can be autocompleted or not.
     */
    regex: PropTypes.string,

    /**
     * Remove spacer if user inputs one of these characters.
     */
    spaceRemovers: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),

    /**
     * Character which is inserted along with the selected option.
     */
    spacer: PropTypes.string,

    /**
     * Only show autocompletion option list after this many characters have been typed after the trigger character.
     */
    minChars: PropTypes.number,

    /**
     * If true, then an enter / return keypress is passed on (after being used to autocomplete).
     */
    passThroughEnter: PropTypes.bool,

    /**
     * If true, then an Tab keypress is passed on (after being used to autocomplete) to the next form input.
     */
    passThroughTab: PropTypes.bool,

    /**
     * autofocus
     */
    autoFocus: PropTypes.bool,

    /**
     * Do case-insensitive comparison with the trigger
     */
    ignoreCase: PropTypes.bool,
};
