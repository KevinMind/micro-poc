const TEMPLATE_TARGETS = {
  checkout: 'checkout',
  product: 'product'
};

export const ROUTES = {
  homePage: '/'
};


export default {
  [ROUTES.homePage]: {
    templateId: 'index',
    clients: [
      {
        id: 'apple',
        target: TEMPLATE_TARGETS.checkout,
        baseUrl: 'http://localhost:8081',
        ssr: true
      },
      {
        id: 'orange',
        target: TEMPLATE_TARGETS.product,
        baseUrl: 'http://localhost:6061',
        ssr: false
      }
    ]
  }
}
