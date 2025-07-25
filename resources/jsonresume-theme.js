/**
 * Creates an HTML element with given tag, class, text content, and attributes.
 *
 * @param {string} tagName - The name of the HTML tag.
 * @param {string} [className=""] - The class name for the element.
 * @param {string} [textContent=""] - The text content for the element.
 * @param {Object} [attributes={}] - Additional attributes for the element.
 * @returns {string} - The generated HTML string.
 */
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

/**
 * Creates a section with a title and data content.
 *
 * @param {string} title - The title of the section.
 * @returns {string} - The generated HTML string for the section.
 */
function createSection(title) {
	let sectionDiv = `<div class="section">`;
	if (title) {
		sectionDiv += createElement("h2", null, title);
	}
	return sectionDiv;
}

/**
 * Adds contact information to an HTML string.
 *
 * @param {string} email - The email address.
 * @param {string} phone - The phone number.
 * @param {string} url - The URL.
 * @returns {string} - The generated HTML string for the contact information.
 */
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

/**
 * Adds location information to an HTML string.
 *
 * @param {Object} location - An object containing location details (address, city, region, postalCode, countryCode).
 * @returns {string} - The generated HTML string for the location information.
 */
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

/**
 * Adds chips (keyword tags) to an HTML string.
 *
 * @param {Array<string>} keywords - An array of keywords.
 * @returns {string} - The generated HTML string for the chips.
 */
function addChips(keywords) {
	let keywordChips = `<div class="chips">`;
	for (const keyword of keywords) {
		keywordChips += createElement("span", "chip", keyword);
	}
	keywordChips += `</div>`;
	return keywordChips;
}

/**
 * Adds highlights to an HTML string.
 *
 * @param {Array<string>} highlights - An array of highlight descriptions.
 * @returns {string} - The generated HTML string for the highlights.
 */
function addHighlights(highlights) {
	if (!highlights || !highlights.length) return ``;
	let highlightList = `<ul class="highlights">`;
	for (const highlight of highlights) {
		highlightList += createElement("li", null, highlight);
	}
	highlightList += `</ul>`;
	return highlightList;
}

/**
 * Creates a section and its content for Basics based on the given data.
 *
 * @param {Object} basics - An object containing basic information (name, label, image, email, phone, url, location, summary).
 * @returns {string} - The generated HTML string for the Basics section.
 */
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

/**
 * Creates a section and its content for Languages based on the given data.
 *
 * @param {Array<Object>} languages - An array of language objects (language, fluency).
 * @returns {string} - The generated HTML string for the Languages section.
 */
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

/**
 * Creates a section and its content for Skills based on the given data.
 *
 * @param {Array<Object>} skills - An array of skill objects (name, level, keywords).
 * @returns {string} - The generated HTML string for the Skills section.
 */
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

/**
 * Creates a section and its content for References based on the given data.
 *
 * @param {Array<Object>} references - An array of reference objects (name, reference).
 * @returns {string} - The generated HTML string for the References section.
 */
function createReferencesSection(references) {
	let referencesSection = `<div class="section references">`;
	referencesSection += createElement("h2", null, "References");

	for (const ref of references) {
		const { name, reference } = ref;
		let referenceItem = `<div class="reference-item">`;

		if (name) {
			referenceItem += createElement("h3", null, name);
		}

		if (reference) {
			try {
				new URL(reference); // Check if reference is a valid URL
				referenceItem += createElement(
					"a",
					"reference-link",
					reference,
					{ href: reference },
				);
			} catch (e) {
				referenceItem += createElement("p", null, reference);
			}
		}

		referenceItem += `</div>`;
		referencesSection += referenceItem;
	}

	referencesSection += `</div>`;
	return referencesSection;
}

/**
 * Creates a section and its content for Work based on the given data.
 *
 * @param {Array<Object>} work - An array of work objects (name, description, location, url, position, summary, highlights, startDate, endDate).
 * @returns {string} - The generated HTML string for the Work section.
 */
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
			if (endDate) {
				timeline += createElement("span", "date", endDate);
			} else {
				timeline += createElement("span", "date", "Present");
			}
			if (startDate) {
				timeline += ` <br> `;
				timeline += createElement("span", "date", startDate);
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

/**
 * Creates a section and its content for Projects based on the given data.
 *
 * @param {Array<Object>} projects - An array of project objects (name, url, description, highlights, keywords, startDate, endDate).
 * @returns {string} - The generated HTML string for the Projects section.
 */
function createProjectsSection(projects) {
	let projectsSection = `<div class="section projects">`;
	projectsSection += createElement("h2", null, "Projects");

	for (const project of projects) {
		const {
			name,
			url,
			description,
			highlights,
			keywords,
			startDate,
			endDate,
		} = project;
		let projectItem = `<div class="project-item">`;

		if (startDate || endDate) {
			let timeline = `<div class="timeline">`;
			if (endDate) {
				timeline += createElement("span", "date", endDate);
			} else {
				timeline += createElement("span", "date", "Present");
			}
			if (startDate) {
				timeline += ` <br> `;
				timeline += createElement("span", "date", startDate);
			}
			timeline += `</div>`;
			projectItem += timeline;
		}

		projectItem += `<div class="project-details">`;

		if (name || url) {
			let titleAndUrl = `<div style="display: flex; align-items: center;">`;
			if (name) {
				titleAndUrl += createElement("h3", null, name);
			}
			if (url) {
				try {
					new URL(url); // Check if url is a valid URL
					titleAndUrl += ` &bull; `;
					titleAndUrl += createElement("a", "description", url, {
						href: url,
					});
				} catch (e) {
					titleAndUrl += ` &bull; `;
					titleAndUrl += createElement("span", null, url);
				}
			}
			titleAndUrl += `</div>`;
			projectItem += titleAndUrl;
		}

		if (description) {
			projectItem += createElement("p", null, description);
		}

		if (highlights && highlights.length > 0) {
			let highlightList = `<ul class="highlights">`;
			for (const highlight of highlights) {
				highlightList += createElement("li", null, highlight);
			}
			highlightList += `</ul>`;
			projectItem += highlightList;
		}

		if (keywords && keywords.length > 0) {
			projectItem += addChips(keywords);
		}

		projectItem += `</div>`;
		projectItem += `</div>`;
		projectsSection += projectItem;
	}

	projectsSection += `</div>`;
	return projectsSection;
}

/**
 * Creates a section and its content for Volunteer based on the given data.
 *
 * @param {Array<Object>} volunteer - An array of volunteer objects (organization, url, position, summary, highlights, startDate, endDate).
 * @returns {string} - The generated HTML string for the Volunteer section.
 */
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
			if (endDate) {
				timeline += createElement("span", "date", endDate);
			} else {
				timeline += createElement("span", "date", "Present");
			}
			if (startDate) {
				timeline += ` <br> `;
				timeline += createElement("span", "date", startDate);
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

/**
 * Creates a section and its content for Education based on the given data.
 *
 * @param {Array<Object>} education - An array of education objects (institution, url, area, studyType, courses, startDate, endDate).
 * @returns {string} - The generated HTML string for the Education section.
 */
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
			if (endDate) {
				timeline += createElement("span", "date", endDate);
			} else {
				timeline += createElement("span", "date", "Present");
			}
			if (startDate) {
				timeline += ` <br> `;
				timeline += createElement("span", "date", startDate);
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

/**
 * Creates a section and its content for General data not covered by specific sections.
 *
 * @param {string} title - The title of the general section.
 * @param {*} data - The general data to be included in the section.
 * @returns {string} - The generated HTML string for the general section.
 */
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

/**
 * Renders the JSON resume data into an HTML string with defined styles and sections.
 *
 * @param {Object} data - The JSON resume data.
 * @returns {string} - The generated HTML string representing the rendered resume.
 */
export function render(data) {
	const styles = `
<style>
  .resume-container {
    display: flex;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .resume-container p {
      margin: 5px 0 0 0;
  }
  .left-column {
    flex: 1;
    background-color: #f4f4f9;
    border-radius: 8px;
  }
  .right-column {
    flex: 2;
  }
  .section {
    padding: 20px;
  }
  .section h1 {
    margin-top: 0;
    margin-bottom: 10px;
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
  .job-item, .project-item, .vol-item, .edu-item {
      position: relative;
      display: flex;
      align-items: flex-start;
      margin-top: 10px;
  }
  .job-item .timeline, .project-item .timeline, .vol-item .timeline, .edu-item .timeline {
      margin-right: 20px;
      position: relative;
      width: 82px;
      text-align: center;
  }
  .job-item .job-details, .project-details .timeline, .vol-item .vol-details, .edu-item .edu-details {
      position: relative;
      left: 15px;
  }
  .job-item h3, .project-item h3, .vol-item h3, .edu-item h3 {
      display: inline-block;
      margin: 0;
  }
  .job-item h4, .project-item h4, .vol-item h4, .edu-item h4 {
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
  .highlights, .courses {
      padding-left: 15px;
      margin-top: 5px;
      margin-bottom: 5px;
  }
  .highlights li, .courses li {
      margin-bottom: 5px;
  }
  .job-item::before, .project-item::before, .vol-item::before, .edu-item::before {
      content: "";
      position: absolute;
      left: 95px; /* Adjusted to align with the timeline */
      top: 40px;
      width: 8px;
      height: calc(100% - 40px);
      background-color: #ccc;
      border-radius: 4px;
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
	if (data.languages) {
		leftColumn += createLanguagesSection(data.languages);
	}
	if (data.skills) {
		leftColumn += createSkillsSection(data.skills);
	}
	if (data.references) {
		leftColumn += createReferencesSection(data.references);
	}
	leftColumn += `</div>`;

	// Create the right column
	let rightColumn = `<div class="right-column">`;
	if (data.work) {
		rightColumn += createWorkSection(data.work);
	}
	if (data.projects) {
		rightColumn += createProjectsSection(data.projects);
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
			key !== "education" &&
			key !== "references" &&
			key !== "projects"
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
