// Generate fake list of ideas
let faker = require('faker');

let randomDate = (start, end) => {
	let dt = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
}

module.exports = () => {
	const data = {
		ideas: []
	};

	for(let i=0; i<20; i++) {
		let id = faker.random.uuid();
		let title = faker.random.word();
		let body = faker.lorem.sentence();

		body = body.length > 140 ? body.substr(0,140) : body;

		let created_date = randomDate(new Date(2019,1,1), new Date());
	
		data.ideas.push({
			"id": id,
			"title": title,
			"body": body,
			"created_date": created_date
		});
	}

	return data;
}