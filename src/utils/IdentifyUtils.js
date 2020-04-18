let IDENTIFY_ID = 0;

export const getComponentId = name => {
  return `ptable_${name}_${IDENTIFY_ID++}`;
};
