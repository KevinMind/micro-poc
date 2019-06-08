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
        content: '<div>this is a micro-frontend apple</div>'
      },
      {
        id: 'banana',
        target: TEMPLATE_TARGETS.product,
        content: '<div>this is a micro-frontend banana',
      }
    ]
  }
}
