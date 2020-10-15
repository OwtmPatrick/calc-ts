interface error {
    className: string,
    message: string
}

const err: error = {
	className: 'calc__input_error',
	message: 'Please enter the correct expression'
};

export default err;
