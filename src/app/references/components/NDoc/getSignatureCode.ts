import { cleanPythonParameterType, cleanPythonType } from "./tempUtils";
import { FunctionNDocType } from "./types";

export function pythonSignatureCode(doc: FunctionNDocType) {
	const params = doc.parameters;
	const paramsCode =
		params && params.length > 0
			? "\n" +
			  params
					.map((param) => {
						const type = param.type
							? cleanPythonParameterType(param.type, param.name)
							: undefined;

						return `\t${param.name}${type ? `: ${type}` : ""}`;
					})
					.join(",\n") +
			  "\n"
			: "";

	const returnType = doc.returns.type
		? ` -> ${cleanPythonType(doc.returns.type)}`
		: "";
	return `def ${doc.name}(${paramsCode})${returnType}`;
}

export function goSignatureCode(doc: FunctionNDocType) {
	const paramsCode = doc.parameters
		? "\n" +
		  doc.parameters
				.map(
					(param) =>
						`\t${param.name}${
							param.type ? `: ${cleanPythonType(param.type)}` : ""
						}`,
				)
				.join(",\n") +
		  "\n"
		: "";

	const returnType = doc.returns.type ? ` (${doc.returns.type}, error)` : "";
	return `func ${doc.name}(${paramsCode})${returnType}`;
}
