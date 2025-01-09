import type * as Schema from "./graphql";
import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const LinkDataFragmentDoc = gql`
    fragment LinkData on ContentUrl {
  base
  hierarchical
  default
}
    `;
export const IContentInfoFragmentDoc = gql`
    fragment IContentInfo on IContentMetadata {
  key
  locale
  types
  displayName
  version
  url {
    ...LinkData
  }
}
    `;
export const IContentDataFragmentDoc = gql`
    fragment IContentData on _IContent {
  _metadata {
    ...IContentInfo
  }
  _type: __typename
}
    `;
export const BlockDataFragmentDoc = gql`
    fragment BlockData on _IComponent {
  ...IContentData
}
    `;
export const IElementDataFragmentDoc = gql`
    fragment IElementData on _IComponent {
  _metadata {
    ...IContentInfo
  }
  _type: __typename
}
    `;
export const ElementDataFragmentDoc = gql`
    fragment ElementData on _IComponent {
  ...IElementData
}
    `;
export const ReferenceDataFragmentDoc = gql`
    fragment ReferenceData on ContentReference {
  key
  url {
    ...LinkData
  }
}
    `;
export const ButtonBlockPropertyDataFragmentDoc = gql`
    fragment ButtonBlockPropertyData on ButtonBlockProperty {
  text
  link {
    ...LinkData
  }
  className
  buttonType
  variant
}
    `;
export const CardBlockDataFragmentDoc = gql`
    fragment CardBlockData on CardBlock {
  heading: CardHeading
  subheading: CardSubheading
  description: CardDescription {
    json
  }
  icon: CardIcon {
    ...ReferenceData
  }
  image: CardImage {
    ...ReferenceData
  }
  link: CardButton {
    ...ButtonBlockPropertyData
  }
  color: CardColor
  layout: CardImageLayout
}
    `;
export const OfficeLocationDataFragmentDoc = gql`
    fragment OfficeLocationData on OfficeLocation {
  title: OfficeTitle
  street1: OfficeAddressStreet1
  street2: OfficeAddressStreet2
  postalcode: OfficeAddressPostalCode
  city: OfficeAddressCity
  country: OfficeAddressCountry
  phone: OfficePhone
  email: OfficeEmail
}
    `;
export const ButtonBlockDataFragmentDoc = gql`
    fragment ButtonBlockData on ButtonBlock {
  text
  link {
    ...LinkData
  }
  className
  buttonType
  variant
}
    `;
export const LinkItemDataFragmentDoc = gql`
    fragment LinkItemData on Link {
  title
  text
  target
  url {
    ...LinkData
  }
}
    `;
export const NavigationMenuBlockDataFragmentDoc = gql`
    fragment NavigationMenuBlockData on NavigationMenuBlock {
  title: MenuNavigationHeading
  items: NavigationLinks {
    ...LinkItemData
  }
}
    `;
export const MegaMenuGroupBlockDataFragmentDoc = gql`
    fragment MegaMenuGroupBlockData on MegaMenuGroupBlock {
  menuName: MenuMenuHeading
  menuLink: MegaMenuUrl {
    ...LinkData
  }
  menuData: MegaMenuContentArea {
    __typename
    ...IContentData
    ...NavigationMenuBlockData
    ...CardBlockData
  }
}
    `;
export const ArticleListElementDataFragmentDoc = gql`
    fragment ArticleListElementData on ArticleListElement {
  articleListCount
}
    `;
export const CTAElementDataFragmentDoc = gql`
    fragment CTAElementData on CTAElement {
  text: Text
  link: Link {
    ...LinkData
  }
}
    `;
export const HeadingElementDataFragmentDoc = gql`
    fragment HeadingElementData on HeadingElement {
  headingText
}
    `;
export const ImageElementDataFragmentDoc = gql`
    fragment ImageElementData on ImageElement {
  altText
  imageLink {
    ...ReferenceData
  }
}
    `;
export const ParagraphElementDataFragmentDoc = gql`
    fragment ParagraphElementData on ParagraphElement {
  paragraph: text {
    json
  }
}
    `;
export const TestimonialElementDataFragmentDoc = gql`
    fragment TestimonialElementData on TestimonialElement {
  referenceTitle
  referenceText {
    json
  }
  customerName
  customerLocation
  customerImage {
    ...ReferenceData
  }
}
    `;
export const CompositionDataFragmentDoc = gql`
    fragment CompositionData on ICompositionNode {
  name: displayName
  layoutType: nodeType
  type
  key
  template: displayTemplateKey
  settings: displaySettings {
    key
    value
  }
  ... on ICompositionStructureNode {
    nodes @recursive(depth: 10) {
      name: displayName
    }
  }
  ... on ICompositionComponentNode {
    component {
      ...BlockData
      ...ElementData
      ...CardBlockData
      ...OfficeLocationData
      ...ButtonBlockData
      ...MegaMenuGroupBlockData
      ...NavigationMenuBlockData
      ...ArticleListElementData
      ...CTAElementData
      ...HeadingElementData
      ...ImageElementData
      ...ParagraphElementData
      ...TestimonialElementData
    }
  }
}
    `;
export const ExperienceDataFragmentDoc = gql`
    fragment ExperienceData on _IExperience {
  composition {
    ...CompositionData
  }
}
    `;
export const BlankExperienceDataFragmentDoc = gql`
    fragment BlankExperienceData on BlankExperience {
  ...ExperienceData
}
    `;
export const ArticleGroupPageDataFragmentDoc = gql`
    fragment ArticleGroupPageData on ArticleGroupPage {
  articleGroupTitle
  articleGroupIntro {
    json
  }
  MainContent {
    ...BlockData
    ...CardBlockData
    ...OfficeLocationData
    ...ButtonBlockData
    ...MegaMenuGroupBlockData
    ...NavigationMenuBlockData
  }
}
    `;
export const ArticlePageDataFragmentDoc = gql`
    fragment ArticlePageData on ArticlePage {
  metadata: _metadata {
    published
  }
  articleHeroImage {
    ...ReferenceData
  }
  articleAuthors
  articleTitle
  articleBody {
    json
  }
}
    `;
export const MenuContentFragmentDoc = gql`
    fragment MenuContent on NavigationMenuBlockProperty {
  heading: MenuNavigationHeading
  links: NavigationLinks {
    ...LinkItemData
  }
}
    `;
export const PageDataFragmentDoc = gql`
    fragment PageData on _IContent {
  ...IContentData
}
    `;
export const IContentListItemFragmentDoc = gql`
    fragment IContentListItem on _IContent {
  ...IContentData
}
    `;
export const getArticleListElementItemsDocument = gql`
    query getArticleListElementItems($count: Int, $locale: [Locales]) {
  ArticlePage(
    orderBy: {_metadata: {published: DESC}}
    limit: $count
    locale: $locale
    where: {_metadata: {status: {eq: "Published"}}}
  ) {
    items {
      ...IContentData
      articleTitle
      articleMeta: _metadata {
        key
        published
        lastModified
      }
      articleAuthors
      articleSummary {
        json
      }
      articleHeroImage {
        ...ReferenceData
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const getBlankExperienceMetaDataDocument = gql`
    query getBlankExperienceMetaData($key: String!, $version: String) {
  BlankExperience(where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}) {
    items {
      _metadata {
        displayName
      }
      SeoSettings {
        metaTitle
      }
    }
  }
}
    `;
export const getArticleGroupPageItemsDocument = gql`
    query getArticleGroupPageItems($key: String!, $locale: [Locales], $pageSize: Int, $skip: Int) {
  group: ArticleGroupPage(where: {_metadata: {key: {eq: $key}}}, locale: $locale) {
    data: items {
      children: _link(type: ITEMS) {
        listing: ArticlePage(
          limit: $pageSize
          locale: $locale
          skip: $skip
          where: {_metadata: {status: {eq: "Published"}}}
        ) {
          total
          items {
            ...IContentData
            _metadata {
              published
            }
            articleHeroImage {
              ...ReferenceData
            }
            articleTitle
            articleSummary {
              json
            }
          }
        }
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const getArticlePageMetaDataDocument = gql`
    query getArticlePageMetaData($key: String!, $version: String) {
  BlankExperience(where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}) {
    items {
      _metadata {
        displayName
      }
      SeoSettings {
        metaTitle
      }
    }
  }
}
    `;
export const getFooterDocument = gql`
    query getFooter {
  footer: WebsiteFooter(where: {_metadata: {status: {eq: "Published"}}}) {
    total
    items {
      address: FooterMainOfficeLocation {
        ...OfficeLocationData
      }
      firstMenu: FooterFirstLinkList {
        ...MenuContent
      }
      secondMenu: FooterSecondLinkList {
        ...MenuContent
      }
      thirdMenu: FooterThirdLinkList {
        ...MenuContent
      }
      logo: FooterLogo {
        ...ReferenceData
      }
      logoAlt: FooterLogoAltText
      legal: FooterLegalLinks {
        ...LinkItemData
      }
    }
  }
}
    ${OfficeLocationDataFragmentDoc}
${MenuContentFragmentDoc}
${LinkItemDataFragmentDoc}
${LinkDataFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const getHeaderDocument = gql`
    query getHeader {
  menuItems: HeaderBlock(where: {_metadata: {status: {eq: "Published"}}}) {
    items {
      logo: site_logo {
        ...ReferenceData
      }
      darkLogo: site_logo_dark {
        ...ReferenceData
      }
      headerNavigation: site_main_navigation {
        ...IContentData
        ...MegaMenuGroupBlockData
      }
      utilityNavigation: site_utility_navigation {
        ...IContentData
        ...ButtonBlockData
      }
    }
  }
}
    ${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}
${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${NavigationMenuBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${CardBlockDataFragmentDoc}
${ButtonBlockPropertyDataFragmentDoc}
${ButtonBlockDataFragmentDoc}`;
export const getDictionaryDocument = gql`
    query getDictionary($dictionary: String!, $locale: [Locales]) {
  getDictionary: Dictionary(
    where: {DictionaryKey: {eq: $dictionary}}
    locale: $locale
  ) {
    total
    items {
      key: DictionaryKey
      contents: DictionaryItems {
        key: DictionaryItemKey
        value: DictionaryItemValue
      }
    }
  }
}
    `;
export const getContentByIdDocument = gql`
    query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {
  content: _Content(
    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}
    locale: $locale
  ) {
    total
    items {
      ...BlockData
      ...PageData
      ...CardBlockData
      ...OfficeLocationData
      ...ButtonBlockData
      ...MegaMenuGroupBlockData
      ...NavigationMenuBlockData
      ...BlankExperienceData
      ...ArticleGroupPageData
      ...ArticlePageData
    }
  }
}
    ${BlockDataFragmentDoc}
${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${PageDataFragmentDoc}
${CardBlockDataFragmentDoc}
${ReferenceDataFragmentDoc}
${ButtonBlockPropertyDataFragmentDoc}
${OfficeLocationDataFragmentDoc}
${ButtonBlockDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${NavigationMenuBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${BlankExperienceDataFragmentDoc}
${ExperienceDataFragmentDoc}
${CompositionDataFragmentDoc}
${ElementDataFragmentDoc}
${IElementDataFragmentDoc}
${ArticleListElementDataFragmentDoc}
${CTAElementDataFragmentDoc}
${HeadingElementDataFragmentDoc}
${ImageElementDataFragmentDoc}
${ParagraphElementDataFragmentDoc}
${TestimonialElementDataFragmentDoc}
${ArticleGroupPageDataFragmentDoc}
${ArticlePageDataFragmentDoc}`;
export const getContentByPathDocument = gql`
    query getContentByPath($path: [String!]!, $locale: [Locales!], $siteId: String) {
  content: _Content(
    where: {_metadata: {url: {default: {in: $path}, base: {eq: $siteId}}}}
    locale: $locale
  ) {
    total
    items {
      ...IContentData
      ...PageData
      ...BlankExperienceData
      ...ArticleGroupPageData
      ...ArticlePageData
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${PageDataFragmentDoc}
${BlankExperienceDataFragmentDoc}
${ExperienceDataFragmentDoc}
${CompositionDataFragmentDoc}
${BlockDataFragmentDoc}
${ElementDataFragmentDoc}
${IElementDataFragmentDoc}
${CardBlockDataFragmentDoc}
${ReferenceDataFragmentDoc}
${ButtonBlockPropertyDataFragmentDoc}
${OfficeLocationDataFragmentDoc}
${ButtonBlockDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${NavigationMenuBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${ArticleListElementDataFragmentDoc}
${CTAElementDataFragmentDoc}
${HeadingElementDataFragmentDoc}
${ImageElementDataFragmentDoc}
${ParagraphElementDataFragmentDoc}
${TestimonialElementDataFragmentDoc}
${ArticleGroupPageDataFragmentDoc}
${ArticlePageDataFragmentDoc}`;
export const getContentTypeDocument = gql`
    query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) {
  content: _Content(
    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}
    locale: $locale
  ) {
    total
    items {
      _metadata {
        types
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getArticleListElementItems(variables?: Schema.getArticleListElementItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getArticleListElementItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getArticleListElementItemsQuery>(getArticleListElementItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticleListElementItems', 'query', variables);
    },
    getBlankExperienceMetaData(variables: Schema.getBlankExperienceMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getBlankExperienceMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getBlankExperienceMetaDataQuery>(getBlankExperienceMetaDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlankExperienceMetaData', 'query', variables);
    },
    getArticleGroupPageItems(variables: Schema.getArticleGroupPageItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getArticleGroupPageItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getArticleGroupPageItemsQuery>(getArticleGroupPageItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticleGroupPageItems', 'query', variables);
    },
    getArticlePageMetaData(variables: Schema.getArticlePageMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getArticlePageMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getArticlePageMetaDataQuery>(getArticlePageMetaDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticlePageMetaData', 'query', variables);
    },
    getFooter(variables?: Schema.getFooterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getFooterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getFooterQuery>(getFooterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFooter', 'query', variables);
    },
    getHeader(variables?: Schema.getHeaderQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getHeaderQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getHeaderQuery>(getHeaderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHeader', 'query', variables);
    },
    getDictionary(variables: Schema.getDictionaryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getDictionaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getDictionaryQuery>(getDictionaryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDictionary', 'query', variables);
    },
    getContentById(variables: Schema.getContentByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByIdQuery>(getContentByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentById', 'query', variables);
    },
    getContentByPath(variables: Schema.getContentByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentByPathQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByPathQuery>(getContentByPathDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentByPath', 'query', variables);
    },
    getContentType(variables: Schema.getContentTypeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Schema.getContentTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentTypeQuery>(getContentTypeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentType', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;