const selectedIds = {};

if (rentPeriods) {
	// This code is only run, when contact.js is called from
	// updateRent.pug, from admin.
	const status = document.querySelector('input[name="status"]:checked').value;
	for (period of rentPeriods) {
		let element = document.getElementById(period);
		if (element.classList.contains('unavailable') && status !== 'accepted') {
			element.style['background-color'] = "red";
			element.click = undefined;
			continue;
		}
		element.style['background-color'] = "lightgreen";
		selectedIds[period] = true;
	}
}

const submit_button = document.getElementById("submit-admin-btn");
function setSubmitButton() {
	const status = document.querySelector('input[name="status"]:checked').value;

	if (submit_button) 
		submit_button['disabled'] = Object.keys(selectedIds).length === 0 && status === "accepted";
}

function validate() {
	document.querySelector('#nameError').innerHTML = ''
	document.querySelector('#phoneError').innerHTML = ''
	document.querySelector('#emailError').innerHTML = ''
	document.querySelector('#countryError').innerHTML = ''
	document.querySelector('#numberOfGuestsError').innerHTML = ''

	const name = document.querySelector('#name').value;
	if(name == '') {
		document.querySelector('#nameError').innerHTML = 'Please enter your name.';
		return false;
	}
	const phone = document.querySelector('#phone').value;
	if(phone == '') {
		document.querySelector('#phoneError').innerHTML = 'Please enter your phone number.';
		return false;
	}
	const email = document.querySelector('#email').value;
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if(!emailRegex.test(email)) {
		document.querySelector('#emailError').innerHTML = 'Please enter a valid e-mail.';
		return false;
	}

	const country = document.querySelector('#country').value;
	if(country == '') {
		document.querySelector('#countryError').innerHTML = 'Please enter your country.';
		return false;
	}

	const numberOfGuests = document.querySelector('#numberOfGuests').value;
	const numberRegex = /^[0-9]*$/
	if(numberOfGuests == '' || !numberRegex.test(numberOfGuests)) {
		document.querySelector('#numberOfGuestsError').innerHTML = 'Please enter the number of guests.';
		return false;
	}

	const rentPeriods = Object.keys(selectedIds);

	const statusRadio = document.querySelector('input[name="status"]:checked');
	const status = statusRadio ? statusRadio.value : undefined;

	const formData = {
		name: name, 
		phone: phone,
		email: email,
		country: country,
		numberOfGuests: numberOfGuests,
		comment: document.querySelector('#comment').value,
		rentPeriods: rentPeriods,
		status: status
	};

	return formData;
}

const submit = function(event) {
	event.preventDefault();

	let formData = validate();
	if (!formData) return;
	
	fetch('/contact', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(formData)
	})
	.then(result => {
		const statusText = document.querySelector('#status');
		if(result >= 400) {
			statusText.innerHTML = 'Something went wrong, please try again.';
		}
		else {
			statusText.innerHTML = 'Your request has been sent.';
			document.querySelector('#name').value = ''
			document.querySelector('#phone').value = ''
			document.querySelector('#email').value = ''
			document.querySelector('#comment').value = ''
			document.querySelector('#country').value = ''
			document.querySelector('#numberOfGuests').value = ''
		}
	})
	.catch(err => {
		statusText.innerHTML = 'Something went wrong, please try again.';
	});
}
function submitAdmin(event) {
	event.preventDefault();

	let formData = validate();
	if (!formData) return;
	
	fetch('/contact', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(formData)
	})
	.then(result => {
		const statusText = document.querySelector('#status');
		if(result >= 400) {
			statusText.innerHTML = 'Something went wrong, please try again.';
		}
		else {
			window.location = "/admin/rents";
		}
	})
	.catch(err => {
		statusText.innerHTML = 'Something went wrong, please try again.';
	});
}

const update = function(event, id) {
	event.preventDefault();
	let formData = validate();
	if (!formData) return;

	fetch('/admin/rents/id/' + id, {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(formData)
	})
	.then(result => {
		const statusText = document.querySelector('#status');
		if(result >= 400) {
			statusText.innerHTML = 'Something went wrong, please try again.';
		}
		else {
			window.location = "/admin/rents";
		}
	})
	.catch(err => {
		statusText.innerHTML = 'Something went wrong, please try again.';
	});

}

function markPeriod(event) {
	let _id = event.target.id;
	if (event.target.style['background-color']) {
		event.target.style['background-color'] = null;
		delete selectedIds[_id];
	}
	else {
		event.target.style['background-color'] = "lightgreen";
		selectedIds[_id] = true;
	}
	setSubmitButton();
}

let create_btn = document.querySelector('#submit-btn');
if (create_btn) create_btn.addEventListener('click', submit);