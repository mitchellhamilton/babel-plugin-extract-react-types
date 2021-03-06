const { transformSync } = require("@babel/core");
const jestInCase = require("jest-in-case");

let flowCases = [
  {
    name: "class",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };

    export class SomeComponent extends React.Component<Props> {
      render() {
        return null;
      }
    }
    `
  },
  {
    name: "arrow function",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };
    
    export const SomeComponent = (props: Props) => {
      return null;
    };  
    `
  },
  {
    name: "function declaration",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };
    
    export function SomeComponent(props: Props) {
      return null;
    }
    `
  },
  {
    name: "default class",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };

    export default class SomeComponent extends React.Component<Props> {
      render() {
        return null;
      }
    }
    `
  },
  {
    name: "default function declaration",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };

    export default class SomeComponent extends React.Component<Props> {
      render() {
        return null;
      }
    }
    `
  },
  {
    name: "class declaration export default identifier",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };

    class SomeComponent extends React.Component<Props> {
      render() {
        return null;
      }
    }

    export default SomeComponent
    `
  },
  {
    name: "arrow function export default identifier",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };
    
    const SomeComponent = (props: Props) => {
      return null;
    };  

    export default SomeComponent
    `
  },
  {
    name: "export default function declaration",
    code: `
    // @flow

    type Props = {
      /** this does something */
      wow: boolean
    };
    
    export default function SomeComponent (props: Props) {
      return null;
    };  
    `
  },
  {
    name: "React.memo",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = React.memo((props: Props) => {
        return null
      })
      `
  },
  {
    name: "memo",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = memo((props: Props) => {
        return null
      })
      `
  },
  {
    name: "forwardRef",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = forwardRef((props: Props) => {
        return null
      })
      `
  },
  {
    name: "forwardRef function expression",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = forwardRef(function (props: Props) {
        return null
      })
      `
  },
  {
    name: "forwardRef memo function expression",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = memo(forwardRef(function (props: Props) {
        return null
      }))
      `
  },
  {
    name: "forwardRef memo arrow function",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      export const SomeComponent = memo(forwardRef((props: Props) => {
        return null
      }))
      `
  },
  {
    name: "arrow function then export",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      const SomeComponent = (props: Props) => {
        return null
      }

      export { SomeComponent }
      `
  },
  {
    name: "class declaration then export",
    code: `
      // @flow
  
      type Props = {
        /** this does something */
        wow: boolean
      };
      
      class SomeComponent extends React.Component<Props> {
        render() {
          return null;
        }
      }

      export { SomeComponent }
      `
  }
];

jestInCase(
  "flow",
  ({ code }) => {
    let transformedCode = transformSync(code, {
      plugins: [require.resolve("./index")],
      presets: [
        require.resolve("@babel/preset-flow"),
        require.resolve("@babel/preset-react")
      ]
    }).code;
    expect(transformedCode).toMatchSnapshot();
  },
  flowCases
);
