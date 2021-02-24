import components from '../components';

export default function (app) {
  Object.keys(components).forEach((name) => {
    app.component(name, components[name]);
  });
}
