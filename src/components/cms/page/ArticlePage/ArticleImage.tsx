import { CmsImage } from '@/components/shared/cms_image'
import Image from 'next/image'
import { type ComponentProps, type FunctionComponent } from 'react'
import { type LinkDataFragment, type ReferenceDataFragment } from '@/gql/graphql'

type ArticleImageImageProps = Readonly<{
    sourcedata?: string,
    src?: LinkDataFragment | ReferenceDataFragment | null,
    fallbackSrc?: string
} & Omit<ComponentProps<typeof Image>, 'src'>>

export const ArticleImage : FunctionComponent<ArticleImageImageProps> = ({ sourcedata, src, fallbackSrc, alt, ...props }) => {

    console.log("==============================================================================================================")
    console.log("sourcedata")
    console.log(sourcedata)
    console.log("==============================================================================================================")

    console.log("==============================================================================================================")
    console.log("src")
    console.log(src)
    console.log("==============================================================================================================")

    if (sourcedata != null)
    {
        //return <Image src="{ url }" alt="Picture of the author" />
        //return <img src="{ urlLink }" aria-hidden priority fill className="object-cover" style={{position : 'absolute', height : '100%', width : '100%', left : 0, top : 0, right : 0, bottom : 0, color : 'transparent'}} />
        return <Image src={ sourcedata } alt={ alt } {...props} />
    }
    else
    {
        return <CmsImage src={ src } alt="hero-image" aria-hidden priority fill className="object-cover" />
    }
}

function getLinkData(input?: LinkDataFragment | ReferenceDataFragment | null) : LinkDataFragment | undefined
{
    if (!input)
        return undefined
    if ((input as ReferenceDataFragment).url)
        return (input as ReferenceDataFragment).url ?? undefined
    return input as LinkDataFragment ?? undefined
}

function linkDataToUrl(item: LinkDataFragment | null | undefined) : URL | undefined
{
    try {
        return new URL(item?.default ?? '/', item?.base ?? undefined)
    } catch {
        return undefined
    }
}

export default ArticleImage