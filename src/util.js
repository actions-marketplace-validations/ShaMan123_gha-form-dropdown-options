import fs from 'fs';
import YAML from 'js-yaml';

export function writeYAML(file, dropdownId, tags) {
	const content = YAML.load(fs.readFileSync(file).toString());
	const found = content.body.find(
		(entry) => entry.id === dropdownId && entry.type === 'dropdown',
	);
	if (!found) {
		throw new Error(
			`dropdown ${dropdownId} not found.\n${content.body.filter(
				(entry) => entry.type === 'dropdown',
			)}`,
		);
	}
	const prevOptions = found.attributes.options;
	found.attributes.options = tags;
	fs.writeFileSync(file, YAML.dump(content));
	return prevOptions;
}
