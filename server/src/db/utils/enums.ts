export const statusColumnEnum = ['ACTIVE', 'DELETED'] as const;

export const roleColumnEnum = ['ADMIN', 'USER'] as const;

function generateEnums<T extends string>(_enum: readonly T[]): { [K in T]: K } {
  return _enum.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = currentValue;
    return accumulator;
  }, Object.create(null));
}

export default {
  status: generateEnums(statusColumnEnum),
  role: generateEnums(roleColumnEnum),
};
