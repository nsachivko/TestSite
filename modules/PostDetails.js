import React from 'react';
import { renderHTML } from "../agility/utils"

const PostDetails = ({ dynamicPageItem, item }) => {

	let post = dynamicPageItem;

	return (
		<section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">

			<div className="text-center relative">
				<h1 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
					{post.fields.title}
				</h1>
				<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto ">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
				</p>

				{post.fields.image &&

					<img className="mx-auto my-10" src={post.fields.image.url + '?w=860'} alt={post.fields.image.label} />

				}

				<div className="mx-20 mt-10 text-left" dangerouslySetInnerHTML={renderHTML(post.fields.details)}></div>

			</div>
		</section >
	)

}


export default PostDetails;
