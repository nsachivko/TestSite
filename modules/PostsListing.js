import React, { Component } from 'react';
import Link from 'next/link';
import { cleanHTML } from "../agility/utils"
import truncate from 'truncate-html'

const PostsListing = (props) => {

	const renderPostExcerpt = (html) => {
		const excerpt = truncate(html, { stripTags: true, length: 160 });
		return { __html: excerpt };
	}


	const renderPosts = () => {

		if (props.customData.posts != null) {

			return props.customData.posts.map(item => {

				return (
					<li key={`${item.contentID}-${props.contentID}`} className="my-12 md:my-0 ">
						<Link href="[...slug]" as={props.customData.dynamicUrls[item.contentID]}><a>
							<div className="flex">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-22 w-22 rounded shadow bg-white">
										{item.fields.image &&
											<img src={item.fields.image.url + '?w=50&h=50'} alt={item.fields.image.label} className="h-20 w-20 rounded shadow-sm hover:shadow" />
										}

										{!item.fields.image &&
											<svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
											</svg>
										}

									</div>
								</div>
								<div className="ml-4">
									<h4 className="text-lg leading-6 font-medium text-gray-900 hover:underline">
										{item.fields.title}
									</h4>
									<p className="mt-2 text-base leading-6 text-gray-500" dangerouslySetInnerHTML={renderPostExcerpt(item.fields.details)}></p>
								</div>
							</div>
						</a></Link>
					</li >
				)

			})
		}
	}

	return (
		<div className="py-12 bg-white">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">{props.fields.title}</p>
					<h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
						Amet consect adipisicing elit</h3>
					<p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
						Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
					</p>
				</div>

				<div className="mt-10">
					<ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
						{renderPosts()}

					</ul>
				</div>
			</div>
		</div>
	)

}

const resolvePostUrls = function (sitemap, posts) {
	let dynamicUrls = {};
	posts.forEach(post => {

		Object.keys(sitemap).forEach(path => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		})

	})
	return dynamicUrls;
}

PostsListing.getCustomInitialProps = async function (props) {
	const api = props.agility;
	try {

		//get sitemap first, need it to find the dynamic urls
		let sitemap = await api.getSitemap({
			channelName: props.channelName,
			languageCode: props.languageCode
		});

		//then get our posts
		let contentListResult = await api.getContentList({
			referenceName: 'posts',
			languageCode: props.languageCode
		});

		const dynamicUrls = resolvePostUrls(sitemap, contentListResult)

		//TODO: should reduce this response to only include fields that are used in direct output
		return {
			posts: contentListResult,
			dynamicUrls: dynamicUrls
		};

	} catch (error) {
		if (console) console.error(error);
	}
}

export default PostsListing;
