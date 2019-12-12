// Custom hook for FetchAPI
const useFetch = (endpoint) => {

	// Common headers used
	const defaultHeader = {
		"Accept": "application/json",
		"Content-Type": "application/json"
	};

	// Custom fetch method -- Default method is GET
	const customFetch = (url, method="GET", body=false, headers=defaultHeader) => {
		const options = {
			method,
			headers
		};

		if(body){options.body = JSON.stringify(body);}

		return fetch(url, options)
		.then(res => res.json())
		.catch(err => {
			throw new Error(err);
		});
	};

	// GET method
	const get = (id) => {
		const url = `${endpoint}${id ? `${id}` : ""}`;
		return customFetch(url);
	};

	// POST method
	const post = (body=false) => {
		if(!body) {
			throw new Error("Record creation failed. Body is missing.");
		}
		return customFetch(endpoint, "POST", body);
	};

	// PATCH method
	const patch = (id=false, body=false) => {
		if(!id || !body) {
			throw new Error("Record update failed. Body and ID is missing");
		}
		const url = `${endpoint}/${id}`;
		return customFetch(url, "PATCH", body);
	};

	// DELETE method
	const del = (id=false) => {
		if(!id) {
			throw new Error("Record delete failed. ID is missing");
		}
		const url = `${endpoint}/${id}`;
		return customFetch(url, "DELETE");
	};

	return {get, post, patch, del};
};

export default useFetch;