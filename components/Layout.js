import PreviewBar from './PreviewBar'
import GlobalHeader from './GlobalHeader'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Layout(props) {
	const { page, sitemapNode } = props


	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>
	}

	//BUG: when dynamic imports used in this case, the HTML does not output SSR
	//const AgilityPageTemplate = dynamic(() => import ('../pageTemplates/' + props.pageTemplateName));
	const AgilityPageTemplate = require('../pageTemplates/' + props.pageTemplateName + '.js').default;

	return (
		<div>
			<Head>
				<title>{sitemapNode.title} - Agility CMS Sample Blog</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={page.seo.metaDescription} />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

			</Head>
			<div className="App">
				<PreviewBar {...props} />
				<GlobalHeader {...props} />

				<AgilityPageTemplate {...props} />

				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

					</div>
				</main>


			</div>



		</div>
	)
}

