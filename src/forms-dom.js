const {up} = require('ireactivity');

const input = (model, path) => {
    return {
        onChange: (event) => up(model, () => model[path] = event.target.value),
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