const menuToggler = document.getElementById('menuToggler');
const menuContent = document.getElementById('menuContent');
const dropdown = document.getElementById('dropdown');
const dropdownToggler = document.getElementById('dropdownToggler');
const dropdownContent = document.getElementById('dropdownContent');

menuToggler.addEventListener('click', toggleMenu);
dropdownToggler.addEventListener('click', toggleDropdown);

function toggleMenu(event) {
	if(menuToggler.getAttribute('aria-expanded') === 'false') {
		menuToggler.classList.remove('collapsed');
		menuContent.classList.remove('collapsed');
		menuContent.classList.add('show');
		menuToggler.setAttribute('aria-expanded', 'true');
	} else {
		menuToggler.classList.add('collapsed');
		menuContent.classList.add('collapsed');
		menuContent.classList.remove('show');
		menuToggler.setAttribute('aria-expanded', 'false');
	}
}

function toggleDropdown(event) {
	if(dropdownToggler.getAttribute('aria-expanded') === 'false') {
		dropdown.classList.add('show');
		dropdownToggler.setAttribute('aria-expanded', 'true');
		dropdownContent.classList.add('show');
	} else {
		dropdown.classList.remove('show');
		dropdownToggler.setAttribute('aria-expanded', 'false');
		dropdownContent.classList.remove('show');
	}
}

function toggle(toggler, content) {

}