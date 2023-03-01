import parse from "./parse";
import generate from "./generate";

export default function compileToFunction(template) {
  const ast = parse(template);
  const code = generate(ast);
  const render = new Function(`with(this){return ${code}}`);
  return render;
}
