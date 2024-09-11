import { json } from "@remix-run/node";
import { useLocation } from "@remix-run/react";

import {
	Form,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import { getContacts } from "./data";
import { createEmptyContact, getContacts } from "./data";

export const action = async () => {
	const contact = await createEmptyContact();
	return json({ contact });
};

export const loader = async () => {
	const contacts = await getContacts();
	return json({ contacts });
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStylesHref },
];

export default function App() {
	const { contacts } = useLoaderData<typeof loader>();
	const location = useLocation();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<div id="sidebar">
					<h1>
						<a
							href="/"
							style={{
								color: "inherit",
								textDecoration: "none",
							}}>
							Remix Contacts
						</a>
					</h1>
					<div>
						<Form id="search-form" role="search">
							<input
								id="q"
								aria-label="Search contacts"
								placeholder="Search"
								type="search"
								name="q"
							/>
							<div
								id="search-spinner"
								aria-hidden
								hidden={true}
							/>
						</Form>
						<Form method="post">
							<button type="submit">New</button>
						</Form>
					</div>
					<nav>
						{contacts.length ? (
							<ul>
								{contacts
									.sort((a, b) =>
										(a.last || "").localeCompare(
											b.last || ""
										)
									)
									.map((contact) => (
										<li key={contact.id}>
											<Link
												to={`contacts/${contact.id}`}
												className={
													location.pathname ===
													`/contacts/${contact.id}`
														? "active"
														: ""
												}>
												{contact.first ||
												contact.last ? (
													<>
														{contact.last}
														{", "}
														{contact.first}
													</>
												) : (
													<i>No Name</i>
												)}{" "}
												{contact.favorite ? (
													<span>★</span>
												) : null}
											</Link>
										</li>
									))}
							</ul>
						) : (
							<p>
								<i>No contacts</i>
							</p>
						)}
					</nav>
				</div>
				<div id="detail">
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
