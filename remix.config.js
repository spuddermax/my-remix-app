/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	serverBuildTarget: "netlify", // tells Remix to use Netlify as the build target
	ignoredRouteFiles: ["**/.*"], // ignore hidden files like .gitignore
	// any other configuration settings as needed
};
