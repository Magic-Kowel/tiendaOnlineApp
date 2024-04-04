
function productDescriptionSeo(seo){
    document.title = seo.title
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', seo.description);
    }
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
        twitterTitleMeta.setAttribute('content',seo.title);
    }
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionMeta) {
        twitterDescriptionMeta.setAttribute('content', seo.description);
    }
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
        ogImageMeta.setAttribute('content', seo.img);
    }
}
export default productDescriptionSeo;