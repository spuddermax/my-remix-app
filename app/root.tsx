import { json, redirect } from "@remix-run/node";

import {
	Form,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigation,
	useSubmit,
  } from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";

export const action = async () => {
	const contact = await createEmptyContact();
	return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({
	request,
	}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return json({ contacts, q });
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStylesHref },
];

export default function App() {
	const { contacts, q } = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const submit = useSubmit();
	const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

	useEffect(() => {
		const searchField = document.getElementById("q");
		if (searchField instanceof HTMLInputElement) {
			searchField.value = q || "";
		}
	}, [q]);

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
						<Form
							id="search-form"
							onChange={(event) =>
								submit(event.currentTarget)
							  }
							role="search"
							>
							<input
								id="q"
								aria-label="Search contacts"
								className={searching ? "loading" : ""}
								placeholder="Search"
								type="search"
								name="q"
								defaultValue={q || ""}
							/>
							<div
								id="search-spinner"
								aria-hidden
								hidden={!searching}
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
											<NavLink
												to={`contacts/${contact.id}`}
												className={({ isActive }) =>
													isActive ? "active" : ""
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
											</NavLink>
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
				<div 
					id="detail"
					className={
						navigation.state === "loading" && !searching ? "loading" : ""
					}
				>
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
