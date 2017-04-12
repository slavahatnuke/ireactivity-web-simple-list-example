const {update} = require('ireactivity');

const input = (model, path) => {
    return {
        onChange: (event) => update(model, () => model[path] = event.target.value),
        value: model[path]
    }
};

const submit = (next = () => null) => {
    return {
        onSubmit: (event) => {
            event.preventDefault();
            next(event);
        }
    }
};

module.exports = {
    input,
    submit
};