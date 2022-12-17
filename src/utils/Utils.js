function validateInput(value, minLength, setError) {
	if (value.length < minLength) {
		setError("Invalid Input");
	} else setError("");
}
const utils = {
	validateInput,
};
export default utils;
