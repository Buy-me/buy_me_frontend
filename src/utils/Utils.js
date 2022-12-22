function validateInput(value, minLength, setError) {
	if (value.length < minLength) {
		setError("Invalid Input");
	} else setError("");
}

function convertToDateString(date) {
	//split the string date
	let arr = date.toJSON().split("T")[0].split("-")

	//swap values
	let temp = arr[0]
	arr[0] = arr[2]
	arr[2] = temp

	let result = ""
	for (let item of arr) {
		result = result.concat(item, "/")
	}
	
	return result.slice(0, -1)
}

const utils = {
	validateInput,
	convertToDateString
};
export default utils;
