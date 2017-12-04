/** @format */
/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import controller from './controller';
import { siteSelection } from 'my-sites/controller';

export default function() {
	page(
		'/jetpack/connect/:type(personal|premium|pro)/:interval(yearly|monthly)?',
		controller.connect
	);

	page(
		'/jetpack/connect/:type(install)/:locale?',
		controller.redirectWithoutLocaleifLoggedIn,
		controller.connect
	);

	page( '/jetpack/connect', controller.connect );

	page(
		'/jetpack/connect/authorize/:localeOrInterval?',
		controller.redirectWithoutLocaleifLoggedIn,
		controller.parseQueryOrFail,
		controller.authorizeForm
	);

	page(
		'/jetpack/connect/authorize/:interval/:locale',
		controller.redirectWithoutLocaleifLoggedIn,
		controller.parseQueryOrFail,
		controller.authorizeForm
	);

	page( '/jetpack/connect/store/:interval(yearly|monthly)?', controller.plansLanding );

	page( '/jetpack/connect/:from(akismet|vaultpress)/:interval(yearly|monthly)?', ( { params } ) =>
		page.redirect( `/jetpack/connect/store${ params.interval ? '/' + params.interval : '' }` )
	);

	page(
		'/jetpack/connect/:locale?',
		controller.redirectWithoutLocaleifLoggedIn,
		controller.connect
	);

	page( '/jetpack/connect/plans/:site', siteSelection, controller.plansSelection );
	page( '/jetpack/connect/plans/:interval/:site', siteSelection, controller.plansSelection );

	page( '/jetpack/sso/:siteId?/:ssoNonce?', controller.sso );
	page( '/jetpack/sso/*', controller.sso );
	page( '/jetpack/new', controller.newSite );
	page( '/jetpack/new/*', '/jetpack/connect' );
}
