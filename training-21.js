function createElementExample(type, properties, children) {
  const props = {
    children: children.map((child) => {
      if (typeof child === "object") {
        return child;
      } else {
        return createTextElementExample(child);
      }
    }), //children.map 끝
  };

  if (properties) {
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        props[key] = properties[key];
      }
    }
  }

  return {
    type: type,
    props: props,
  };
}

function createTextElementExample(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(virtualDOM, container) {
  let domElement;
  if (virtualDOM.type === "TEXT_ELEMENT") {
    domElement = document.createTextNode("");
  } else {
    domElement = document.createElement(virtualDOM.type);
  }

  for (const key in virtualDOM.props) {
    if (key !== "children") {
      domElement[key] = virtualDOM.props[key];
    }
  }
  virtualDOM.props.children.forEach((child) => render(child, domElement));
  container.appendChild(domElement);
}

const App = createElementExample("div", { id: "app" }, [
  createElementExample("h1", null, ["virtual DOM!"]),
  createElementExample("p", null, ["이것이 client-side rendering이다!"]),
]);

render(App, document.getElementById("root"));
