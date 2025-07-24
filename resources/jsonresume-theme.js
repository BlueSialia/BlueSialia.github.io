// Function to create an element with given tag, class, text content, and parent
function createElement(tagName, className, textContent) {
	let element = `<${tagName}`;
	if (className) element += ` class="${className}"`;
	element += `>${textContent}</${tagName}>`;
	return element;
}

// Function to create a section and its content for Basics
function createBasicsSection(basics) {
	const {
		name,
		label,
		image,
		email,
		phone,
		url,
		location = {},
		summary,
	} = basics;

	let basicsSection = `<div class="section basics">`;

	// Image
	if (image) {
		basicsSection += `<img src="${image}" alt="Profile Picture" style="float: left; margin-right: 20px; width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">`;
	}

	// Name and Label
	basicsSection += createElement("h1", null, name);
	if (label) {
		basicsSection += createElement("h2", "subtitle", label);
	}

	// Contact Information
	let contactInfo = `<div class="contact-info">`;

	if (email) {
		contactInfo += createElement(
			"a",
			"contact-item",
			email,
			null,
			`mailto:${email}`,
		);
	}
	if (phone) {
		contactInfo += createElement("span", "contact-item", phone);
	}
	if (url) {
		contactInfo += createElement("a", "contact-item", url, null, url);
	}

	contactInfo += `</div>`;

	basicsSection += contactInfo;

	// Location
	let locationLine = `<div class="location">`;
	const locationParts = [];
	if (location.address) locationParts.push(location.address);
	if (location.city) locationParts.push(location.city);
	if (location.region) locationParts.push(location.region);
	if (location.postalCode) locationParts.push(location.postalCode);
	if (location.countryCode) locationParts.push(location.countryCode);
	locationLine += locationParts.join(", ");
	locationLine += `</div>`;
	basicsSection += locationLine;

	// Summary
	if (summary) {
		basicsSection += createElement("p", null, summary);
	}

	basicsSection += `</div>`;

	return basicsSection;
}

// Function to create a section and its content for Skills
function createSkillsSection(skills) {
	let skillsSection = `<div class="section skills">`;
	skillsSection += createElement("h2", null, "Skills");

	for (const skill of skills) {
		const { name, level, keywords } = skill;
		let skillItem = `<div class="skill-item">`;

		if (name) {
			skillItem += createElement("h3", null, name);
		}
		if (level) {
			skillItem += createElement("h4", "subtitle", level);
		}
		if (keywords && keywords.length > 0) {
			let keywordChips = `<div class="chips">`;
			for (const keyword of keywords) {
				keywordChips += createElement(
					"span",
					"chip",
					keyword,
					null,
					`#${keyword}`,
				);
			}
			keywordChips += `</div>`;
			skillItem += keywordChips;
		}
		skillItem += `</div>`;
		skillsSection += skillItem;
	}

	skillsSection += `</div>`;
	return skillsSection;
}

// Function to create a section and its content for Languages
function createLanguagesSection(languages) {
	let languagesSection = `<div class="section languages">`;
	languagesSection += createElement("h2", null, "Languages");

	for (const language of languages) {
		const { language: lang, fluency } = language;
		let languageItem = `<div class="language-item">`;

		if (lang) {
			languageItem += createElement("h3", null, lang);
		}
		if (fluency) {
			languageItem += createElement("h4", "subtitle", fluency);
		}

		languageItem += `</div>`;
		languagesSection += languageItem;
	}

	languagesSection += `</div>`;
	return languagesSection;
}

// Function to create a section and its content
function createGeneralSection(title, data) {
	let sectionDiv = `<div class="section">`;
	sectionDiv += createElement("h2", null, title);

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (typeof value === "object" && !Array.isArray(value)) {
				// Handle nested objects
				sectionDiv += createGeneralSection(`${title} - ${key}`, value);
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
	const styles = `
<style>
  body {
    display: flex;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .resume-container {
    display: flex;
    width: 100%;
  }
  .column {
    flex: 1;
    padding: 20px;
  }
  .basics, .skills, .languages {
    background-color: #f4f4f9;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
  }
  .section h2 {
    margin-top: 0;
  }
  .contact-info {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .contact-item {
    text-decoration: none;
    color: #007BFF;
  }
  .location {
    margin-top: 10px;
  }
  .chips {
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }
  .chip {
    background-color: #007BFF;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
</style>
`;

	let resumeContainer = `<div class="resume-container">`;
	resumeContainer += styles;

	// Create the left column
	let leftColumn = `<div class="column">`;
	if (data.basics) {
		leftColumn += createBasicsSection(data.basics);
	}
	if (data.skills) {
		leftColumn += createSkillsSection(data.skills);
	}
	if (data.languages) {
		leftColumn += createLanguagesSection(data.languages);
	}
	leftColumn += `</div>`;

	// Create the right column
	let rightColumn = `<div class="column">`;
	for (const key in data) {
		if (
			data.hasOwnProperty(key) &&
			key !== "basics" &&
			key !== "skills" &&
			key !== "languages"
		) {
			rightColumn += createGeneralSection(key, data[key]);
		}
	}
	rightColumn += `</div>`;

	resumeContainer += leftColumn;
	resumeContainer += rightColumn;

	resumeContainer += `</div>`;
	return resumeContainer;
}
