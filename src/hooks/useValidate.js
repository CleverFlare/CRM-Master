const validate = async (operands) => {
  const output = {};
  if (!Array.isArray(operands))
    return console.error("invalid operands in useValidate hook");
  operands.forEach((operand) => {
    if (operand?.isRequired && !operand.value)
      return (output[operand.name] = "هذا الحقل إلزامي");
    if (!operand?.validation) return;
    operand.validation.forEach((test) => {
      if (!test.regex.test(operand.value))
        return (output[operand.name] = test.value);
    });
  });
  return Object.keys(output).length === 0
    ? {
        ok: true,
        errors: null,
      }
    : {
        ok: false,
        errors: output,
      };
};

export default function useValidate() {
  return validate;
}

// template
// the "validation" field is optional
// the "isRequired" field is optional
// [
//   {
//     name: "email",
//     value: "",
//     isRequired: true,
//     validation: [
//       {
//         regex: /bla bla bla/i,
//         value: "something",
//       },
//       {
//         regex: /bla bla bla 2/i,
//         value: "something 2",
//       },
//     ],
//   },
// ];
