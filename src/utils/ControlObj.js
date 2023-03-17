// Copyright (C) king.com Ltd 2023

export const controlObj = (controlledObj, get, jump) => {
  const rightPressed = get().right;
  const leftPressed = get().left;
  const jumpPressed = get().jump;
  const frontPressed = get().forward;
  const shiftPressed = get().shift;
  const backPressed = get().back;

  if (frontPressed) {
    controlledObj.applyImpulse({ x: -0.1, y: 0, z: 0 });
  }
  if (backPressed) {
    controlledObj.applyImpulse({ x: 0.1, y: 0, z: 0 });
  }
  if (rightPressed) {
    controlledObj.applyImpulse({ x: 0, y: 0, z: -0.1 });
  }
  if (leftPressed) {
    controlledObj.applyImpulse({ x: 0, y: 0, z: 0.1 });
  }
  if (jumpPressed) {
    jump();
  }
  if (shiftPressed) {
    controlledObj.applyImpulse({ x: 0, y: -0.5, z: 0 });
  }
};
