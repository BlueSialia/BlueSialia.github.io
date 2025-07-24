// Function to create an element with given tag, class, text content, and attributes
function createElement(
	tagName,
	className = "",
	textContent = "",
	attributes = {},
) {
	let element = `<${tagName}`;
	if (className) element += ` class="${className}"`;
	for (const [key, value] of Object.entries(attributes)) {
		element += ` ${key}="${value}"`;
	}
	element += `>${textContent}</${tagName}>`;
	return element;
}

// Function to create a section and its content
function createSection(title) {
	let sectionDiv = `<div class="section">`;
	if (title) {
		sectionDiv += createElement("h2", null, title);
	}
	return sectionDiv;
}

// Function to add contact information
function addContactInfo(email, phone, url) {
	let contactInfo = ``;
	if (email) {
		contactInfo += createElement("a", "contact-item", email, {
			href: `mailto:${email}`,
		});
	}
	if (phone) {
		contactInfo += createElement("a", "contact-item", phone, {
			href: `tel:${phone}`,
		});
	}
	if (url) {
		contactInfo += createElement("a", "contact-item", url, { href: url });
	}
	return contactInfo;
}

// Function to add location information
function addLocation(location) {
	let locationLine = `<div class="location">`;
	const locationParts = [];
	if (location.address) locationParts.push(location.address);
	if (location.city) locationParts.push(location.city);
	if (location.region) locationParts.push(location.region);
	if (location.postalCode) locationParts.push(location.postalCode);
	if (location.countryCode) locationParts.push(location.countryCode);
	locationLine += locationParts.join(", ");
	locationLine += `</div>`;
	return locationLine;
}

// Function to add chips
function addChips(keywords) {
	let keywordChips = `<div class="chips">`;
	for (const keyword of keywords) {
		keywordChips += createElement("span", "chip", keyword);
	}
	keywordChips += `</div>`;
	return keywordChips;
}

// Function to add highlights
function addHighlights(highlights) {
	if (!highlights || !highlights.length) return ``;
	let highlightList = `<ul class="highlights">`;
	for (const highlight of highlights) {
		highlightList += createElement("li", null, highlight);
	}
	highlightList += `</ul>`;
	return highlightList;
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

	let basicsSection = createSection(null);
	if (image) {
		basicsSection += createElement("img", null, "", {
			src: image,
			alt: "Profile Picture",
			style: "float: left; margin-right: 20px; width: 100px; height: 100px; border-radius: 50%; object-fit: cover;",
		});
	}
	basicsSection += createElement("h1", null, name);
	if (label) {
		basicsSection += createElement("h2", "subtitle", label);
	}
	basicsSection += addContactInfo(email, phone, url);
	basicsSection += addLocation(location);
	if (summary) {
		basicsSection += createElement("p", null, summary);
	}
	basicsSection += `</div>`;
	return basicsSection;
}

// Function to create a section and its content for Skills
function createSkillsSection(skills) {
	let skillsSection = createSection("Skills");

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
			skillItem += addChips(keywords);
		}
		skillItem += `</div>`;
		skillsSection += skillItem;
	}

	skillsSection += `</div>`;
	return skillsSection;
}

// Function to create a section and its content for Languages
function createLanguagesSection(languages) {
	let languagesSection = createSection("Languages");

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
	let workSection = createSection("Work");

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
				timeline += ` <br> `;
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
				locationUrl += createElement("a", "url", url, { href: url });
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
			jobItem += addHighlights(highlights);
		}

		jobItem += `</div>`;

		jobItem += `</div>`;
		workSection += jobItem;
	}

	workSection += `</div>`;
	return workSection;
}

// Function to create a section and its content for Volunteer
function createVolunteerSection(volunteer) {
	let volunteerSection = createSection("Volunteer");

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
				timeline += ` <br> `;
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
			volItem += createElement("a", "description", url, { href: url });
		}

		if (position) {
			volItem += createElement("h4", "subtitle", position);
		}
		if (summary) {
			volItem += createElement("p", null, summary);
		}
		if (highlights && highlights.length > 0) {
			volItem += addHighlights(highlights);
		}

		volItem += `</div>`;

		volItem += `</div>`;
		volunteerSection += volItem;
	}

	volunteerSection += `</div>`;
	return volunteerSection;
}

// Function to create a section and its content for Education
function createEducationSection(education) {
	let educationSection = createSection("Education");

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
				timeline += ` <br> `;
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
			eduItem += createElement("a", "description", url, { href: url });
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

// Function to create a section and its content for General
function createGeneralSection(title, data) {
	let sectionDiv = createSection(title);

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
  .resume-container {
    display: flex;
    width: 100%;
    margin: 0;
    font-family: Arial, sans-serif;
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
    margin-bottom: 10px;
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
  .skill-item h3, .language-item h3 {
    display: inline-block;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .skill-item h4, .language-item h4 {
    display: inline-block;
    color: #666;
    margin: 0;
 }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
  }
  .chip {
    background-color: #007BFF;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
  .work, .volunteer, .education {
      position: relative;
  }
  .job-item, .vol-item, .edu-item {
      position: relative;
      display: flex;
      margin-bottom: 10px;
      align-items: flex-start;
  }
  .job-item::before, .vol-item::before, .edu-item::before {
      content: "";
      position: absolute;
      left: 95px; /* Adjusted to align with the timeline */
      top: 40px;
      width: 8px;
      height: calc(100% - 35px);
      background-color: #ccc;
      border-radius: 4px;
  }
  .job-item .timeline, .vol-item .timeline, .edu-item .timeline {
      margin-right: 20px;
      position: relative;
      width: 82px;
      text-align: center;
  }
  .job-item .job-details, .vol-item .vol-details, .edu-item .edu-details {
      position: relative;
      left: 15px;
  }
  .job-item h3, .vol-item h3, .edu-item h3 {
      display: inline-block;
      margin: 0;
  }
  .job-item h4, .vol-item h4, .edu-item h4 {
      margin: 10px 0;
  }
  .job-item .description, .vol-item .description, .edu-item .description {
      color: #666;
      font-size: 14px;
      display: inline-block;
      margin-left: 5px;
  }
  .job-item .location-url, .edu-item .area-study {
      margin-top: 5px;
      color: #666;
      font-size: 12px;
  }
  .job-item p, .vol-item p, .edu-item p {
      margin-top: 5px;
  }
  .highlights, .courses {
      list-style-type: none;
      padding: 0;
      margin-top: 5px;
  }
  .highlights li, .courses li {
      margin-bottom: 5px;
  }
  .timeline::before {
      content: "";
      position: absolute;
      left: 90px; /* Adjusted to align with the timeline */
      top: 10px;
      width: 18px;
      height: 18px;
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
