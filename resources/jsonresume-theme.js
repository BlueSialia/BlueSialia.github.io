// Function to create an element with given tag, class, text content, and parent
function createElement(tagName, className, textContent) {
	let element = `<${tagName}`;
	if (className) element += ` class="${className}"`;
	element += `>${textContent}</${tagName}>`;
	return element;
}

// Function to create a section and its content
function createSection(title, data) {
	let sectionDiv = `<div class="section">`;
	sectionDiv += createElement("h2", null, title);

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (typeof value === "object" && !Array.isArray(value)) {
				// Handle nested objects
				sectionDiv += createSection(`${title} - ${key}`, value);
			} else if (Array.isArray(value)) {
				// Handle arrays
				let list = `<ul>`;
				value.forEach((item) => {
					if (typeof item === "object") {
						let listItem = `<li>`;
						for (const subKey in item) {
							if (item.hasOwnProperty(subKey)) {
								listItem += createElement(
									"div",
									"sub-item",
									`${subKey}: ${JSON.stringify(item[subKey])}`,
								);
							}
						}
						listItem += `</li>`;
						list += listItem;
					} else {
						list += createElement("li", null, JSON.stringify(item));
					}
				});
				list += `</ul>`;
				sectionDiv += list;
			} else {
				// Handle primitive types
				sectionDiv += createElement(
					"div",
					"item",
					`${key}: ${JSON.stringify(value)}`,
				);
			}
		}
	}

	sectionDiv += `</div>`;
	return sectionDiv;
}

// Expose a single render function that accepts the JSON object and returns the HTML string
export function render(data) {
	let resumeContainer = `<div class="resume-container">`;

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			resumeContainer += createSection(key, data[key]);
		}
	}

	resumeContainer += `</div>`;
	return resumeContainer;
}
