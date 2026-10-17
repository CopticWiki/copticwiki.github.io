// Renders the Compléments entries from the Kasser sheet into #dictionary.
// The transcription syntax is defined in the ⲣⲉⲙⲛ̀Ⲭⲏⲙⲓ pipeline, at
// dictionary/marcion_sourceforge_net/kasser.py. This is a port of its
// substitutions, minus the validation, which the pipeline already enforces.

// The Compléments tab of the sheet. (The Morphologiques have their own tab.)
const url = "https://docs.google.com/spreadsheets/d/1sGTjLGFtehosDszPNPur_isYfIDo-jRoAfKax9mJJbU/export?format=tsv&gid=0";

// A siglum: an optional asterisk, a base, then any sequence of superscripts
// (`^`) and subscripts (`~`). A² is a base of its own.
const siglumRegex = /^(\*)?(A\^2|\p{Script=Latin})((?:[\^~][^\^~]+)*)$/u;
const siglumMarkRegex = /([\^~])([^\^~]+)/gu;

function siglumReplace(_, g1) {
	const siglum = g1.match(siglumRegex);
	if (!siglum) {
		console.error("Error! Invalid siglum:", g1);
		return `[[${g1}]]`;
	}
	const [, asterisk, base, marks] = siglum;
	let html = asterisk ? "&ast;" : "";
	html += base === "A^2" ? "<i>A</i><sup>2</sup>" : `<i>${base}</i>`;
	for (const [, marker, mark] of marks.matchAll(siglumMarkRegex)) {
		html += marker === "^" ? `<sup><i>${mark}</i></sup>` : `<sub>${mark}</sub>`;
	}
	return `<span class="dialect">${html}</span>`;
}

function languageReplace(_, g1) {
	// An asterisk marks a Coptic form as a reconstruction.
	const asterisk = g1.startsWith("*") ? "&ast;" : "";
	const text = g1.replace(/^\*/, "");
	let lang;
	if (/\p{Script=Greek}/u.test(text)) {
		lang = "greek";
	} else if (/\p{Script=Coptic}/u.test(text)) {
		lang = "coptic";
	} else {
		console.error("Error! Can not determine the language of bracketed expression:", g1);
		return `[[${g1}]]`;
	}
	return `<span class="${lang}">${asterisk}${text}</span>`;
}

function addendumReplace(_, del, ins) {
	return (del ? `<del>${del}</del>` : "") + (del && ins ? " " : "") + (ins ? `<ins>${ins}</ins>` : "");
}

// The order is load-bearing; it follows kasser.py.
const substitutions = [
	[/&/g, "&amp;"],
	[/</g, "&lt;"],
	[/>/g, "&gt;"],
	[/_(.+?)_/g, "<i>$1</i>"],
	// A siglum must be matched before other bracketed text.
	[/(?<!\[)\[\[(\*?\p{Script=Latin}[^\[\]]*)\]\](?!\])/gu, siglumReplace],
	[/(?<!\[)\[\[(.*?)\]\](?!\])/gu, languageReplace],
	// Outside sigla, a subscript only occurs in the manuscript numbers M₁ to M₁₀.
	[/M~([1-9]|10)(?!\d)/g, "M<sub>$1</sub>"],
	[/\\n/g, "</p><p>"],
	[/\/\/(.*?)\/\/(.*?)\/\//g, addendumReplace],
];

function render(entry) {
	for (const [regex, replacement] of substitutions) {
		entry = entry.replace(regex, replacement);
	}
	return `<p>${entry}</p>`;
}

function parse(tsv) {
	const [header, ...lines] = tsv.split(/\r?\n/).map(line => line.split("\t"));
	const column = name => {
		const i = header.indexOf(name);
		if (i < 0) {
			throw new Error(`The Kasser sheet has no ${name} column.`);
		}
		return i;
	};
	const kasser = column("Kasser");
	const vide = column("_v_");
	const entry = column("Entry");
	const wip = column("WIP");
	return lines
		// A partially written entry is treated as if it were empty.
		.filter(cells => cells[entry] && !cells[wip])
		.map(cells => ({ kasser: cells[kasser], vide: !!cells[vide], entry: cells[entry] }));
}

function rows(entries) {
	// Like the printed page, name a column only where it begins.
	return entries.map((e, i) => {
		const kasser = i > 0 && entries[i - 1].kasser === e.kasser ? "" : e.kasser;
		const klass = e.vide ? ' class="vide"' : "";
		return `<tr${klass}><td>${kasser}</td><td>${render(e.entry)}</td></tr>`;
	}).join("\n");
}

fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error(`Fetching the Kasser sheet failed: ${response.status}`);
		}
		return response.text();
	})
	.then(tsv => {
		const entries = parse(tsv);
		if (entries.length) {
			document.querySelector("#dictionary").innerHTML = rows(entries);
		}
	})
	// The hand-written rows stay in place as a fallback.
	.catch(error => console.error(error));
