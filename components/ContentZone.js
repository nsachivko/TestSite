import React, { Component } from 'react';
import dynamic from 'next/dynamic'


export default function ContentZone({ name, page, dynamicPageItem }) {
	function RenderModules() {

		let modules = page.zones[name];

		const modulesToRender = modules.map(m => {

			//Bug: when dynamic imports are used within the module, it doest not get outputted server-side
			//let AgilityModule = dynamic(() => import ('../modules/' + m.moduleName));

			let AgilityModule = require('../modules/' + m.moduleName + '.js').default;

			return <AgilityModule key={m.item.contentID} page={page} dynamicPageItem={dynamicPageItem} {...m.item} />
		})

		return modulesToRender;
	}


	return (
		<div>
			<RenderModules />
		</div>
	)
}
