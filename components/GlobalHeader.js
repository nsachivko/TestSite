import React, { Component, useState } from 'react';
import Link from 'next/link';

import Transition from "./util/transition.js"

const GlobalHeader = (props) => {
	const { globalHeaderProps, sitemapNode, page } = props;
	const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false)

	const globalHeaderItem = globalHeaderProps.contentItem;

	const renderLinks = (kind) => {

		if (!globalHeaderProps.sitemap) return null;


		let links = globalHeaderProps.sitemap.map(node => {

			let path = node.path;
			let href = "/[...slug]"
			if (path === "/") href = "/"

			if (kind === "mobile") {

				//MOBILE MENU ITEMS

				return (
					<Link key={node.pageID + '-m'} href={href} as={path}>
						<a onClick={() => setIsMobileMenuExpanded(false)} className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
							<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
							<div className="text-base leading-6 font-medium text-gray-900 ">
								{node.menuText}
							</div>
						</a>
					</Link>
				)
			} else {

				//DESKTOP MENU ITEMS

				let className = "text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"

				return (
					<Link key={node.pageID} href={href} as={path}>
						<a className={className}>{node.menuText}</a>
					</Link>
				)
			}

		})
		return links;

	}

	return (
		<div className="relative bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
					<div className="lg:w-0 lg:flex-1">
						{/* TODO: put your own logo here! */}
						<Link href="/">
							<a>
								<img className="h-8 w-auto sm:h-10" src="/logo-triangle-only.svg" alt="Logo" />
							</a>
						</Link>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<button onClick={() => setIsMobileMenuExpanded(true)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
					<nav className="hidden md:flex space-x-10">
						{renderLinks("desktop")}



					</nav>
					<div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
						<a href="#" className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
							Sign in
		</a>
						<span className="inline-flex rounded-md shadow-sm">
							<a href="#" className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
								Sign up
		  </a>
						</span>
					</div>
				</div>
			</div>

			{/* <!--
	Mobile menu, show/hide based on mobile menu state.

	Entering: "duration-200 ease-out"
	  From: "opacity-0 scale-95"
	  To: "opacity-100 scale-100"
	Leaving: "duration-100 ease-in"
	  From: "opacity-100 scale-100"
	  To: "opacity-0 scale-95"
  --> */}
			<Transition
				show={isMobileMenuExpanded}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
					<div className="rounded-lg shadow-lg">
						<div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
							<div className="pt-5 pb-6 px-5 space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<Link href="/">
											<a onClick={() => setIsMobileMenuExpanded(false)}>
												<img className="h-8 w-auto" src="/logo-triangle-only.svg" alt="Workflow" />
											</a>
										</Link>
									</div>
									<div className="-mr-2">
										<button onClick={() => setIsMobileMenuExpanded(false)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
											<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								<div>
									<nav className="grid row-gap-8">
										{renderLinks("mobile")}

									</nav>
								</div>
							</div>
							<div className="py-6 px-5 space-y-6">
								<div className="space-y-6">
									<span className="w-full flex rounded-md shadow-sm">
										<a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
											Sign up
										</a>
									</span>
									<p className="text-center text-base leading-6 font-medium text-gray-500">
										Existing customer?&nbsp;
										<a href="#" className="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
											Sign in
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	)

}

GlobalHeader.getCustomInitialProps = async function (props) {

	const api = props.agility;
	const languageCode = props.languageCode;
	const channelName = props.channelName;
	let contentItem = null;
	let topLevelSitemap = [];

	try {
		//get the global header
		let contentItemList = await api.getContentList({
			referenceName: "globalheader",
			languageCode: languageCode
		});

		if (contentItemList && contentItemList.length) {
			contentItem = contentItemList[0];

		}
	} catch (error) {
		if (console) console.error("Could not load global header item.", error);
	}


	try {
		//get the nested sitemap
		let sitemap = await api.getSitemapNested({
			channelName: channelName,
			languageCode: languageCode,
		});

		//get rid of the children, we only care about the top-level
		sitemap = sitemap.forEach(s => {
			if (s.path == '/home') {
				s.path = '/'
			}
			s.children = [];
			topLevelSitemap.push(s);
		})


	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error);
	}

	return {
		contentItem,
		sitemap: topLevelSitemap
	}
}


export default GlobalHeader