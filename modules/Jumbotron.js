import React, { Component } from 'react';



export default (props) => {

	return (
		<section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-12">
				<div className="lg:relative lg:col-span-7">
					<svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
						<polygon points="50,0 100,0 50,100 0,100"></polygon>
					</svg>
					<div className="text-center lg:text-left lg:relative lg:z-2">
						<h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
							{props.fields.title}
							<br className="xl:hidden" />
							<span className="text-indigo-600">
								{props.fields.subTitle}
							</span>
						</h2>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
					</p>
						<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<div className="rounded-md shadow">
								<a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
									Magna aliqua
							</a>
							</div>
							<div className="mt-3 sm:mt-0 sm:ml-3">
								<a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
									Irure qui
							</a>
							</div>
						</div>
					</div>

				</div>
				<div className="pt-4 md:col-span-5 lg:pt-0">
					<img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" />

				</div>
			</div>
		</section>

	)


}

