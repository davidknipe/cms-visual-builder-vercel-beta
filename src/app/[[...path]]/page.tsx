import { CmsPage, getServerClient } from '@remkoj/optimizely-cms-nextjs'
import createFactory from '@/components'
import { getContentByPath } from '@/gql'

const getContentByPathWrapped : typeof getContentByPath = async (client, variables) => {
    const data = await getContentByPath(client, variables)
    console.log("GetContentByPathResult", JSON.stringify(data))
    return data
}

const { CmsPage:OptimizelyPage, generateMetadata, generateStaticParams } = CmsPage.createPage(createFactory(), {
    getContentByPath: getContentByPathWrapped,
    client: () => {
        const client = getServerClient()
        client.updateFlags({
            queryCache: false // We're depending on @recursive & cursors, which don't work with the queryCache
        })
        return client
    }
})

export const dynamic = "auto"; // Make sure we cache pages
export const dynamicParams = true; // Allow new pages to be resolved without rebuilding the site
export const revalidate = false; // Keep the cache untill manually revalidated using the Webhook
export const fetchCache = "default-cache"; // Cache fetch results by default
export { generateStaticParams/*, generateMetadata*/ };
export default OptimizelyPage;