fetch("data.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		return response.json();
	})
	.then((data) => {
		const container = document.querySelector("#projects");

		for (const section of data.sections) {
			const heading = document.createElement("h2");
			heading.textContent = section.title;
			container.append(heading);

			if (section.description) {
				const paragraph = document.createElement("p");
				paragraph.append(document.createTextNode(section.description.text));

				if (section.description.link) {
					paragraph.append(document.createElement("br"));

					const link = document.createElement("a");
					link.id = section.description.link.id;
					link.href = section.description.link.url;
					link.textContent = section.description.link.text;
					paragraph.append("Read my ", link, "!");
				}

				container.append(paragraph);
			}

			const row = document.createElement("div");
			row.className = "link-row";

			for (const item of section.links) {
				const link = document.createElement("a");
				link.className = "link-button";
				link.href = item.url;
				link.target = item.newTab ? "_blank" : "_self";

				const icon = document.createElement("img");
				icon.className = ["icon", ...(item.classes ?? [])].join(" ");
				icon.src = item.icon;
				icon.alt = item.alt;

				link.append(icon, document.createTextNode(item.name));
				row.append(link);
			}

			container.append(row);
		}
	})
	.catch((error) => {
		console.error("Failed to load project data:", error);
	});
