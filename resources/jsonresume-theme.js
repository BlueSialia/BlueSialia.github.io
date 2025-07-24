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

// Function to create a section and its content for Work
function createWorkSection(work) {
	let workSection = `<div class="section work">`;
	workSection += createElement("h2", null, "Work");

	for (const job of work) {
		const {
			name,
			description,
			location,
			url,
			position,
			summary,
			highlights,
			startDate,
			endDate,
		} = job;

		let jobItem = `<div class="job-item">`;

		if (startDate || endDate) {
			let timeline = `<div class="timeline">`;
			if (startDate) {
				timeline += createElement("span", "date", startDate);
			}
			if (endDate) {
				timeline += ` &mdash; `;
				timeline += createElement("span", "date", endDate);
			}
			timeline += `</div>`;
			jobItem += timeline;
		}

		jobItem += `<div class="job-details">`;

		if (name) {
			jobItem += createElement("h3", null, name);
		}
		if (description) {
			jobItem += createElement("span", "description", description);
		}
		if (location || url) {
			let locationUrl = `<div class="location-url">`;
			if (location) {
				locationUrl += createElement("span", null, location);
			}
			if (url) {
				locationUrl += ` &bull; `;
				locationUrl += createElement("a", "url", url, null, url);
			}
			locationUrl += `</div>`;
			jobItem += locationUrl;
		}

		if (position) {
			jobItem += createElement("h4", "subtitle", position);
		}
		if (summary) {
			jobItem += createElement("p", null, summary);
		}
		if (highlights && highlights.length > 0) {
			let highlightList = `<ul class="highlights">`;
			for (const highlight of highlights) {
				highlightList += createElement("li", null, highlight);
			}
			highlightList += `</ul>`;
			jobItem += highlightList;
		}

		jobItem += `</div>`;

		jobItem += `</div>`;
		workSection += jobItem;
	}

	workSection += `</div>`;
	return workSection;
}

function createVolunteerSection(volunteer) {
	let volunteerSection = `<div class="section volunteer">`;
	volunteerSection += createElement("h2", null, "Volunteer");

	for (const vol of volunteer) {
		const {
			organization,
			url,
			position,
			summary,
			highlights,
			startDate,
			endDate,
		} = vol;

		let volItem = `<div class="vol-item">`;

		if (startDate || endDate) {
			let timeline = `<div class="timeline">`;
			if (startDate) {
				timeline += createElement("span", "date", startDate);
			}
			if (endDate) {
				timeline += ` &mdash; `;
				timeline += createElement("span", "date", endDate);
			}
			timeline += `</div>`;
			volItem += timeline;
		}

		volItem += `<div class="vol-details">`;

		if (organization) {
			volItem += createElement("h3", null, organization);
		}
		if (url) {
			volItem += createElement("a", "description", url, null, url);
		}

		if (position) {
			volItem += createElement("h4", "subtitle", position);
		}
		if (summary) {
			volItem += createElement("p", null, summary);
		}
		if (highlights && highlights.length > 0) {
			let highlightList = `<ul class="highlights">`;
			for (const highlight of highlights) {
				highlightList += createElement("li", null, highlight);
			}
			highlightList += `</ul>`;
			volItem += highlightList;
		}

		volItem += `</div>`;

		volItem += `</div>`;
		volunteerSection += volItem;
	}

	volunteerSection += `</div>`;
	return volunteerSection;
}

function createEducationSection(education) {
	let educationSection = `<div class="section education">`;
	educationSection += createElement("h2", null, "Education");

	for (const edu of education) {
		const {
			institution,
			url,
			area,
			studyType,
			courses,
			startDate,
			endDate,
		} = edu;

		let eduItem = `<div class="edu-item">`;

		if (startDate || endDate) {
			let timeline = `<div class="timeline">`;
			if (startDate) {
				timeline += createElement("span", "date", startDate);
			}
			if (endDate) {
				timeline += ` &mdash; `;
				timeline += createElement("span", "date", endDate);
			}
			timeline += `</div>`;
			eduItem += timeline;
		}

		eduItem += `<div class="edu-details">`;

		if (institution) {
			eduItem += createElement("h3", null, institution);
		}
		if (url) {
			eduItem += createElement("a", "description", url, null, url);
		}

		if (area || studyType) {
			let areaStudy = `<div class="area-study">`;
			if (area) {
				areaStudy += createElement("span", null, area);
			}
			if (studyType) {
				areaStudy += ` &bull; `;
				areaStudy += createElement("span", "description", studyType);
			}
			areaStudy += `</div>`;
			eduItem += areaStudy;
		}

		if (courses && courses.length > 0) {
			let courseList = `<ul class="courses">`;
			for (const course of courses) {
				courseList += createElement("li", null, course);
			}
			courseList += `</ul>`;
			eduItem += courseList;
		}

		eduItem += `</div>`;

		eduItem += `</div>`;
		educationSection += eduItem;
	}

	educationSection += `</div>`;
	return educationSection;
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
  .left-column {
    flex: 1;
    padding: 20px;
  }
  .right-column {
    flex: 2;
    padding: 20px;
  }
  .section {
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
  .work {
      position: relative;
  }
  .job-item {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;
  }
  .job-item::before {
      content: "";
      position: absolute;
      left: -4px; /* Adjusted to align with the timeline */
      top: 5px;
      width: 8px;
      height: calc(100% - 10px);
      background-color: #ccc;
  }
  .job-item .timeline {
      margin-right: 20px;
      position: relative;
  }
  .job-item .job-details {
      flex: 1;
  }
  .job-item h3, .job-item h4 {
      margin-top: 0;
  }
  .job-item .description {
      color: #666;
      font-size: 14px;
      display: inline-block;
      margin-left: 5px;
  }
  .job-item .location-url {
      margin-top: 5px;
      color: #666;
      font-size: 12px;
  }
  .job-item h4 {
      margin-top: 0;
      font-weight: normal;
  }
  .job-item p {
      margin-top: 5px;
  }
  .volunteer, .education {
      position: relative;
  }
  .vol-item, .edu-item {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;
  }
  .vol-item::before, .edu-item::before {
      content: "";
      position: absolute;
      left: -4px; /* Adjusted to align with the timeline */
      top: 5px;
      width: 8px;
      height: calc(100% - 10px);
      background-color: #ccc;
  }
  .vol-item .timeline, .edu-item .timeline {
      margin-right: 20px;
      position: relative;
  }
  .vol-item .vol-details, .edu-item .edu-details {
      flex: 1;
  }
  .vol-item h3, .vol-item h4, .edu-item h3, .edu-item h4 {
      margin-top: 0;
  }
  .vol-item .description, .edu-item .description {
      color: #666;
      font-size: 14px;
      display: inline-block;
      margin-left: 5px;
  }
  .vol-item .area-study, .edu-item .area-study {
      margin-top: 5px;
      color: #666;
      font-size: 12px;
  }
  .vol-item h4, .edu-item h4 {
      margin-top: 0;
      font-weight: normal;
  }
  .vol-item p, .edu-item p {
      margin-top: 5px;
  }
  .highlights {
      list-style-type: none;
      padding: 0;
      margin-top: 5px;
  }
  .highlights li {
      margin-bottom: 5px;
  }
  .courses {
      list-style-type: none;
      padding: 0;
      margin-top: 5px;
  }
  .courses li {
      margin-bottom: 5px;
  }
  .timeline::before {
      content: "";
      position: absolute;
      left: -6px; /* Adjusted to align with the timeline */
      top: 0;
      width: 12px;
      height: 12px;
      background-color: #007BFF;
      border-radius: 50%;
      z-index: 1; /* Ensure it stays above the line */
  }
</style>
`;

	let resumeContainer = `<div class="resume-container">`;
	resumeContainer += styles;

	// Create the left column
	let leftColumn = `<div class="left-column">`;
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
	let rightColumn = `<div class="right-column">`;
	if (data.work) {
		rightColumn += createWorkSection(data.work);
	}
	if (data.volunteer) {
		rightColumn += createVolunteerSection(data.volunteer);
	}
	if (data.education) {
		rightColumn += createEducationSection(data.education);
	}

	for (const key in data) {
		if (
			data.hasOwnProperty(key) &&
			key !== "basics" &&
			key !== "skills" &&
			key !== "languages" &&
			key !== "work" &&
			key !== "volunteer" &&
			key !== "education"
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
