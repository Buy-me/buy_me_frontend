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


function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value == "") {
        setPasswordError("")
    }
    else if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

function validateUsername(value, setUsernameError) {
    if (value == "") {
        setUsernameError("")
    }
    else if (value.length < 5) {
        setUsernameError("Username must be 5 characters")
    } else {
        setUsernameError("")
    }
}

const utils = {
	validateInput,
    isValidEmail,
    validateEmail,
    validateUsername,
    validatePassword,
	convertToDateString
};

export default utils;
