////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
	id?: string;
	first?: string;
	last?: string;
	avatar?: string;
	twitter?: string;
	notes?: string;
	favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
	id: string;
	createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
	records: {} as Record<string, ContactRecord>,

	async getAll(): Promise<ContactRecord[]> {
		return Object.keys(fakeContacts.records)
			.map((key) => fakeContacts.records[key])
			.sort(sortBy("-createdAt", "last"));
	},

	async get(id: string): Promise<ContactRecord | null> {
		return fakeContacts.records[id] || null;
	},

	async create(values: ContactMutation): Promise<ContactRecord> {
		const id = values.id || Math.random().toString(36).substring(2, 9);
		const createdAt = new Date().toISOString();
	const newContact = { id, createdAt, ...values };
		fakeContacts.records[id] = newContact;
		return newContact;
	},

	async set(id: string, values: ContactMutation): Promise<ContactRecord> {
		const contact = await fakeContacts.get(id);
		invariant(contact, `No contact found for ${id}`);
		const updatedContact = { ...contact, ...values };
		fakeContacts.records[id] = updatedContact;
		return updatedContact;
	},

	destroy(id: string): null {
		delete fakeContacts.records[id];
		return null;
	},
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let contacts = await fakeContacts.getAll();
	if (query) {
		contacts = matchSorter(contacts, query, {
			keys: ["first", "last"],
		});
	}
	return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
	const contact = await fakeContacts.create({});
	return contact;
}

export async function getContact(id: string) {
	return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
	const contact = await fakeContacts.get(id);
	if (!contact) {
		throw new Error(`No contact found for ${id}`);
	}
	await fakeContacts.set(id, { ...contact, ...updates });
	return contact;
}

export async function deleteContact(id: string) {
	fakeContacts.destroy(id);
}

[
	{
		avatar:
			"/contact-photos/ShrutiKapoor.jpg",
		first: "Shruti",
		last: "Kapoor",
		twitter: "@shrutikapoor08",
	},
	{
		avatar:
			"/contact-photos/GlennReyes.jpg",
		first: "Glenn",
		last: "Reyes",
		twitter: "@glnnrys",
	},
	{
		avatar:
			"/contact-photos/RyanFlorence.jpg",
		first: "Ryan",
		last: "Florence",
	},
	{
		avatar:
			"/contact-photos/OscarNewman.jpg",
		first: "Oscar",
		last: "Newman",
		twitter: "@__oscarnewman",
	},
	{
		avatar:
			"/contact-photos/MichaelJohnson.jpg",
		first: "Michael",
		last: "Johnson",
	},
	{
		avatar:
			"/contact-photos/ChristopherChedeau.jpg",
		first: "Christopher",
		last: "Chedeau",
		twitter: "@Vjeux",
	},
	{
		avatar:
			"/contact-photos/CameronMatheson.jpg",
		first: "Cameron",
		last: "Matheson",
		twitter: "@cmatheson",
	},
	{
		avatar:
			"/contact-photos/BrookLybrand.jpg",
		first: "Brook",
		last: "Lybrand",
		twitter: "@BrookLybrand",
	},
	{
		avatar:
			"/contact-photos/AlexAnderson.jpg",
		first: "Alex",
		last: "Anderson",
		twitter: "@ralex1993",
	},
	{
		avatar:
			"/contact-photos/KentDodds.jpg",
		first: "Kent C.",
		last: "Dodds",
		twitter: "@kentcdodds",
	},
	{
		avatar:
			"/contact-photos/NeviShah.jpg",
		first: "Nevi",
		last: "Shah",
		twitter: "@nevikashah",
	},
	{
		avatar:
			"/contact-photos/AndrewPetersen.jpg",
		first: "Andrew",
		last: "Petersen",
	},
	{
		avatar:
			"/contact-photos/ScottSmerchek.jpg",
		first: "Scott",
		last: "Smerchek",
		twitter: "@smerchek",
	},
	{
		avatar:
			"/contact-photos/GiovanniBenussi.jpg",
		first: "Giovanni",
		last: "Benussi",
		twitter: "@giovannibenussi",
	},
	{
		avatar:
			"/contact-photos/IgorMinar.jpg",
		first: "Igor",
		last: "Minar",
		twitter: "@IgorMinar",
	},
	{
		avatar:
			"/contact-photos/BrandonKish.jpg",
		first: "Brandon",
		last: "Kish",
	},
	{
		avatar:
			"/contact-photos/ArisaFukuzaki.jpg",
		first: "Arisa",
		last: "Fukuzaki",
		twitter: "@arisa_dev",
	},
	{
		avatar:
			"/contact-photos/AlexandraSpalato.jpg",
		first: "Alexandra",
		last: "Spalato",
		twitter: "@alexadark",
	},
	{
		avatar:
			"/contact-photos/CatJohnson.jpg",
		first: "Cat",
		last: "Johnson",
	},
	{
		avatar:
			"/contact-photos/AshleyNarcisse.jpg",
		first: "Ashley",
		last: "Narcisse",
		twitter: "@_darkfadr",
	},
	{
		avatar:
			"/contact-photos/EdmundHung.jpg",
		first: "Edmund",
		last: "Hung",
		twitter: "@_edmundhung",
	},
	{
		avatar:
			"/contact-photos/CliffordFajardo.jpg",
		first: "Clifford",
		last: "Fajardo",
		twitter: "@cliffordfajard0",
	},
	{
		avatar:
			"/contact-photos/ErickTamayo.jpg",
		first: "Erick",
		last: "Tamayo",
		twitter: "@ericktamayo",
	},
	{
		avatar:
			"/contact-photos/PaulBratslavsky.jpg",
		first: "Paul",
		last: "Bratslavsky",
		twitter: "@codingthirty",
	},
	{
		avatar:
			"/contact-photos/PedroCattori.jpg",
		first: "Pedro",
		last: "Cattori",
		twitter: "@pcattori",
	},
	{
		avatar:
			"/contact-photos/AndreLandgraf.jpg",
		first: "Andre",
		last: "Landgraf",
		twitter: "@AndreLandgraf94",
	},
	{
		avatar:
			"/contact-photos/MonicaPowell.jpg",
		first: "Monica",
		last: "Powell",
		twitter: "@indigitalcolor",
	},
	{
		avatar:
			"/contact-photos/BrianLee.jpg",
		first: "Brian",
		last: "Lee",
		twitter: "@brian_dlee",
	},
	{
		avatar:
			"/contact-photos/SeanMcQuaid.jpg",
		first: "Sean",
		last: "McQuaid",
		twitter: "@SeanMcQuaidCode",
	},
	{
		avatar:
			"/contact-photos/ShaneWilliams.jpg",
		first: "Shane",
		last: "Williams",
		twitter: "@swilliams326",
	},
	{
		avatar:
			"/contact-photos/EagleWalker.jpg",
		first: "Eagle",
		last: "Walker",
		twitter: "@EagleWalker326",
	},
	{
		avatar:
			"/contact-photos/JonJensen.jpg",
		first: "Jon",
		last: "Jensen",
		twitter: "@jenseng",
	},
	{
		avatar:
			"/contact-photos/EmmaCarter.jpg",
		first: "Emma",
		last: "Carter",
		twitter: "@EmmaCarter007",
	},
	{
		avatar:
			"/contact-photos/AminaEze.jpg",
		first: "Amina",
		last: "Eze",
		twitter: "@AminaEze",
	},
	{
		avatar:
			"/contact-photos/AishaGupta.jpg",
		first: "Aisha",
		last: "Gupta",
		twitter: "@AishaG",
	},
].forEach((contact) => {
	fakeContacts.create({
		...contact,
		id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
	});
});
