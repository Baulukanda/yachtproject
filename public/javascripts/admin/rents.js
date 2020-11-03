function deleteRent(id) {
	if (confirm("Do you wish to delete this rent?"))
		fetch('/admin/rents/id/' + id, {method: "DELETE"}).then(res => {
			if (res.status >= 400) {
				throw new Error(res.status);
			}
			else {
				location.reload();
			}
		}).catch(err => {
			console.error(err);
		});
}

function updateRent(id) {
	window.location = "/admin/rents/id/" + id;
}
function createRent() {
	window.location = "/admin/rents/create";
}